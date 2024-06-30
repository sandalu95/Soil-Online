import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { AddressForm } from "../Profile/Address/Address";
import {
  getUserAddresses,
  updateAddress,
  createAddress,
} from "../../data/repository";
import { updateProductQuantity } from "../../data/products";
import "./checkout.css";
import { toast } from "react-toastify";
import OrderSuccess from "../../components/OrderSuccess";
import { useCart } from "../../hooks/useCart";
import {
  validateCardNumber,
  validateExpiryDate,
  validateSecurityCode,
} from "../../utils/CreditCardValidation";
import { createOrder } from "../../data/orders";

const BILLING = "billing";
const SHIPPING = "shipping";

const Checkout = ({ user }) => {
  const { cartItems, totalPrice, deleteCart, loading } = useCart(); // use of custom hook to get cart details
  const [countries, setCountries] = useState([]);
  const [billingAddressData, setBillingAddressData] = useState({
    country: "AU",
  });
  const [shippingAddressData, setShippingAddressData] = useState({
    country: "AU",
  });
  const [paymentFormData, setPaymentFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    securityCode: "",
    expiryDate: "",
  });
  const selectedCountry = "AU"; // Default country is Australia
  const shippingCost = 9.95; // constant shipping cost for orders
  const [paymentErrors, setPaymentErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false); // To handle success payment section
  const [currentOrder, setCurrentOrder] = useState();

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

  // Handle the billing address change
  const handleBillingAddressChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBillingAddressData((prevBillingAddressData) => ({
      ...prevBillingAddressData,
      [name]: value,
    }));
  };

  // Handle the shipping address change
  const handleShippingAddressChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setShippingAddressData((prevShippingAddressData) => ({
      ...prevShippingAddressData,
      [name]: value,
    }));
  };

  // Handle the billing address form submission
  const handleBillingAddressSubmit = async (e) => {
    e.preventDefault();
    let result;
    // Create new address for user If the address not exist in database
    if (!billingAddressData?.id) {
      result = await createAddress(user.email, BILLING, billingAddressData);
      setBillingAddressData((prev) => ({ ...prev, id: result.id }));
    } else {
      // update existing address
      result = await updateAddress(billingAddressData);
    }

    if (result?.error) {
      // Handle error
      toast.error(`Update billing address failed: ${result.error}`);
    } else {
      toast.success("Billing Address Saved Successfully");
    }
  };

  // Handle the shipping address form submission
  const handleShippingAddressSubmit = async (e) => {
    e.preventDefault();
    let result;

    // Create new address for user If the address not exist in database
    if (!shippingAddressData.id) {
      result = await createAddress(user.email, SHIPPING, shippingAddressData);
      setShippingAddressData((prev) => ({ ...prev, id: result.id }));
    } else {
      // update existing address
      result = await updateAddress(shippingAddressData);
    }

    if (result?.error) {
      // Handle error
      toast.error(`Update shipping address failed: ${result.error}`);
    } else {
      toast.success("Shipping Address Saved Successfully");
    }
  };

  // Handle final payment submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Always require shipping address
    if (!shippingAddressData.id) {
      toast.error("Shipping Address Required!");
      return;
    }

    if (!billingAddressData.id) {
      toast.error("Billing Address Required!");
      return;
    }

    // Validate card number
    if (!validateCardNumber(paymentFormData.cardNumber)) {
      errors.cardNumber = "Invalid card number";
    }

    // Validate cvn
    if (!validateSecurityCode(paymentFormData.securityCode)) {
      errors.securityCode = "Invalid security code";
    }

    // Validate expiry date
    const expiryDateErrors = validateExpiryDate(paymentFormData.expiryDate);
    if (Object.keys(expiryDateErrors).length > 0) {
      errors.expiryDate = expiryDateErrors.expiryDate;
    }

    setPaymentErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Handle Billing Address
      if (!billingAddressData.id) {
        // Create billing address if it doesn't exist
        const result = await createAddress(user.email, BILLING, billingAddressData);
        if (result?.error) {
          toast.error(`Billing Address Required: ${result.error}`);
          return;
        } else {
          setBillingAddressData((prev) => ({ ...prev, id: result.id }));
        }
      }

      // Create order
      const orderItems = cartItems?.map((x) => ({
        productId: x.productId,
        quantity: x.quantity,
      }));
      const totalAmount = (parseFloat(totalPrice) + parseFloat(shippingCost)).toFixed(2);
      const order = await createOrder(user?.email, orderItems, totalAmount);
      setCurrentOrder(order);

      deleteCart();
      // update the product quantity in localStorage after user successfully place order
      updateProductQuantity(cartItems);

      toast.success(
        "Congratulations! Your order has been successfully placed."
      );

      setOrderSuccess(true);
    } else {
      toast.error("Order Processing Failed!");
    }
  };

  // Handle the value changes of the payment fields
  const handlePaymentDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const tempState = { ...paymentFormData };
    tempState[name] = value;
    setPaymentFormData(tempState);
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : orderSuccess ? (
        <OrderSuccess currentOrder={currentOrder} />
      ) : (
        <Row>
          <Col xs={12} md={5}>
            <Row>
              <Card className="my-3 p-0">
                <Card.Header>Shipping address</Card.Header>
                <Card.Body className="p-4">
                  <AddressForm
                    countries={countries}
                    selectedCountry={selectedCountry}
                    addressData={shippingAddressData}
                    handleChange={handleShippingAddressChange}
                    handleSubmit={handleShippingAddressSubmit}
                  />
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card className="my-3 p-0">
                <Card.Header>Billing address</Card.Header>
                <Card.Body className="p-4">
                  <AddressForm
                    countries={countries}
                    selectedCountry={selectedCountry}
                    addressData={billingAddressData}
                    handleChange={handleBillingAddressChange}
                    handleSubmit={handleBillingAddressSubmit}
                  />
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col xs={12} md={7}>
            <Card className="my-3 card-summary">
              <Card.Header>Order Summary</Card.Header>
              <Card.Body>
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="d-flex justify-content-between"
                  >
                    <p className="text-left mb-0">{item.product.name}</p>
                    <p className="text-right mb-0">
                      $
                      {(
                        (
                          (item.product.price * (100 - item.product.discount)) /
                          100
                        ).toFixed(2) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="text-left mb-0">Subtotal:</p>
                  <p className="text-right mb-0">${totalPrice}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-left mb-0">Shipping:</p>
                  <p className="text-right mb-0">${shippingCost.toFixed(2)}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="text-left mb-0">Total:</p>
                  <p className="text-right mb-0">
                    $
                    {parseFloat(totalPrice) +
                      parseFloat(shippingCost.toFixed(2))}
                  </p>
                </div>
              </Card.Body>
            </Card>

            <Card className="my-3 card-summary">
              <Card.Header>Payment</Card.Header>
              <Card.Body>
                <p className="mb-4">
                  All transactions are secure and encrypted.
                </p>
                <Form onSubmit={handlePaymentSubmit}>
                  <Form.Group className="my-3" controlId="formCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      name="cardNumber"
                      type="text"
                      placeholder="Enter card number"
                      value={paymentFormData?.cardNumber}
                      onChange={handlePaymentDetails}
                    />
                    {paymentErrors.cardNumber && (
                      <Form.Text className="text-danger">
                        {paymentErrors.cardNumber}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formExpiryDate">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={paymentFormData?.expiryDate}
                      onChange={handlePaymentDetails}
                    />
                    {paymentErrors.expiryDate && (
                      <Form.Text className="text-danger">
                        {paymentErrors.expiryDate}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSecurityCode">
                    <Form.Label>Security Code (CVN)</Form.Label>
                    <Form.Control
                      name="securityCode"
                      type="password"
                      placeholder="Enter CVN"
                      value={paymentFormData?.securityCode}
                      onChange={handlePaymentDetails}
                    />
                    {paymentErrors.securityCode && (
                      <Form.Text className="text-danger">
                        {paymentErrors.securityCode}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formNameOnCard">
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control
                      name="nameOnCard"
                      type="text"
                      placeholder="Enter name on card"
                      value={paymentFormData?.nameOnCard}
                      onChange={handlePaymentDetails}
                    />
                  </Form.Group>
                  <Button className="btn-custom" type="submit">
                    Submit Payment
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Checkout;
