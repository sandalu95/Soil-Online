import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  getUserAddresses,
  updateAddress,
  createAddress,
} from "../../../data/repository";
import { toast } from "react-toastify";

const BILLING = "billing";
const SHIPPING = "shipping";

export const AddressForm = ({
  countries,
  selectedCountry,
  addressData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={addressData?.country || selectedCountry}
          onChange={(e) => {
            handleChange(e);
          }}
          name="country"
        >
          {countries.map((country, key) => (
            <option value={country.value} key={key}>
              {country.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddressL1">
        <Form.Label>Address Line 1</Form.Label>
        <Form.Control
          type="text"
          value={addressData?.addLine1 || ""}
          name="addLine1"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddressL2">
        <Form.Label>Address Line 2</Form.Label>
        <Form.Control
          type="text"
          value={addressData?.addLine2 || ""}
          name="addLine2"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSuburb">
        <Form.Label>Suburb</Form.Label>
        <Form.Control
          type="text"
          value={addressData?.suburb || ""}
          name="suburb"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formState">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          value={addressData?.state || ""}
          name="state"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPostcode">
        <Form.Label>Postcode</Form.Label>
        <Form.Control
          type="text"
          value={addressData?.postcode || ""}
          name="postcode"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button className="btn-custom" type="submit">
        Save Address
      </Button>
    </Form>
  );
};

const Address = ({ user }) => {
  const [isBillingAddClicked, setIsBillingAddClicked] = useState(false);
  const [isShippingAddClicked, setIsShippingAddClicked] = useState(false);
  const [countries, setCountries] = useState([]);
  const [billingAddressData, setBillingAddressData] = useState(null);
  const [shippingAddressData, setShippingAddressData] = useState(null);
  const selectedCountry = "AU";

  useEffect(() => {
    const fetchAddressData = async () => {
      // Get user addresses from database
      const userAddresses = await getUserAddresses(user.email);

      // If user has address in database, show them in address page
      if (userAddresses.length > 0) {
        userAddresses.forEach((address) => {
          if (address.addressType === "billing") {
            setBillingAddressData(address);
          } else if (address.addressType === "shipping") {
            setShippingAddressData(address);
          }
        });
      }
    };

    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });

    fetchAddressData().catch(console.error);
  }, [user?.email]);

  const handleBillingAddressChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBillingAddressData((prevBillingAddressData) => ({
      ...prevBillingAddressData,
      [name]: value,
    }));
  };

  const handleShippingAddressChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setShippingAddressData((prevShippingAddressData) => ({
      ...prevShippingAddressData,
      [name]: value,
    }));
  };

  // Update/create address based on different situation
  const handleBillingAddressSubmit = (e) => {
    e.preventDefault();

    let result;
    // Create new address for user If the address not exist in database
    if (!billingAddressData.id) {
      result = createAddress(user.email, BILLING, billingAddressData);
    } else {
      // update existing address
      result = updateAddress(billingAddressData);
    }

    if (result?.error) {
      // Handle error
      toast.error(`Update billing address failed: ${result.error}`);
    } else {
      toast.success("Billing Address Saved Successfully");
    }
  };

  // Update/create address based on different situation
  const handleShippingAddressSubmit = (e) => {
    e.preventDefault();
    let result;
    // Create new address for user If the address not exist in database
    if (!shippingAddressData.id) {
      result = createAddress(user.email, SHIPPING, shippingAddressData);
    } else {
      // update existing address
      result = updateAddress(shippingAddressData);
    }

    if (result?.error) {
      // Handle error
      toast.error(`Update shipping address failed: ${result.error}`);
    } else {
      toast.success("Shipping Address Saved Successfully");
    }
  };

  return (
    <>
      <p className="mt-3">
        The following addresses will be used on the checkout page by default.
      </p>
      <Row>
        <Col>
          <Card className="my-3">
            <Card.Header>Billing address</Card.Header>
            {!billingAddressData && !isBillingAddClicked && (
              <Card.Body>
                <p>You have not set up this type of address yet.</p>
                <Button
                  className="btn-custom"
                  onClick={() => {
                    setBillingAddressData({ country: selectedCountry });
                    setIsBillingAddClicked(true);
                  }}
                >
                  Add
                </Button>
              </Card.Body>
            )}
            {(billingAddressData || isBillingAddClicked) && (
              <Card.Body className="p-4">
                <AddressForm
                  countries={countries}
                  selectedCountry={selectedCountry}
                  addressData={billingAddressData}
                  handleChange={handleBillingAddressChange}
                  handleSubmit={handleBillingAddressSubmit}
                />
              </Card.Body>
            )}
          </Card>
        </Col>
        <Col>
          <Card className="my-3">
            <Card.Header>Shipping address</Card.Header>
            {!shippingAddressData && !isShippingAddClicked && (
              <Card.Body>
                <p>You have not set up this type of address yet.</p>
                <Button
                  className="btn-custom"
                  onClick={() => {
                    setShippingAddressData({ country: selectedCountry });
                    setIsShippingAddClicked(true);
                  }}
                >
                  Add
                </Button>
              </Card.Body>
            )}
            {(shippingAddressData || isShippingAddClicked) && (
              <Card.Body className="p-4">
                <AddressForm
                  countries={countries}
                  selectedCountry={selectedCountry}
                  addressData={shippingAddressData}
                  handleChange={handleShippingAddressChange}
                  handleSubmit={handleShippingAddressSubmit}
                />
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Address;
