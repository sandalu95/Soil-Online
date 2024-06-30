import React, { useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Card, Col, Row } from "react-bootstrap";
import { getLoggedInUser, getUserAddresses } from "../data/repository";

// The page shown when a payment is successful
const OrderSuccess = ({ currentOrder }) => {
  const user = getLoggedInUser();

  const [billingAddressData, setBillingAddressData] = useState({});

  // Provide a fallback value if billingAddressData is null or undefined
  const entries = billingAddressData ? Object.entries(billingAddressData) : [];

  // Filter out the id and userEmail in address data
  const filteredEntries = entries.filter(
    ([key]) => key !== "id" && key !== "userEmail" && key !== "addressType"
  );
  // get billing address
  useEffect(() => {
    const fetchAddressData = async () => {
      // Get user addresses from database
      const userAddresses = await getUserAddresses(user.email);
      // If user has address in database, show them in address page
      if (userAddresses.length > 0) {
        userAddresses.forEach((address) => {
          if (address.addressType === "billing") {
            setBillingAddressData(address);
          }
        });
      }
    };

    fetchAddressData().catch(console.error);
  }, [user?.email]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center pt-5 pb-3 my-4"
      style={{
        backgroundColor: "#f4f4f4",
        borderColor: "none",
        borderRadius: "8px",
      }}
    >
      <CheckCircleRoundedIcon style={{ color: "green" }} />
      <h2 className="mt-3">Payment Successful</h2>
      <h5>Your Order has been received</h5>

      <Card
        style={{
          width: "40%",
          padding: "20px",
          margin: "20px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4>Order Details</h4>
        <Row className="mt-3">
          <Col>
            <p>Order Number</p>
          </Col>
          <Col className="text-end">
            <p>{currentOrder?.id}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Date</p>
          </Col>
          <Col className="text-end">
            <p>{new Date(currentOrder?.date).toISOString().split("T")[0]}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Payment Method</p>
          </Col>
          <Col className="text-end">
            <p>Credit Card</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Total</p>
          </Col>
          <Col className="text-end">
            <p>${currentOrder?.total}</p>
          </Col>
        </Row>
      </Card>

      <div
        style={{
          width: "40%",
          padding: "20px",
          margin: "20px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4>Customer Details</h4>
        <Row className="mt-3 d-flex justify-content-between">
          <Col md={6}>
            <h5>Contact</h5>
            <div>
              <p className="m-0">Email: {user?.email}</p>
              <p className="m-0">Phone: {user?.phone}</p>
            </div>
          </Col>
          <Col md={5}>
            <h5>Billing Address</h5>
            <div>
              {filteredEntries.map(([key, value]) => (
                <p key={key} className="m-0">
                  {value}
                </p>
              ))}
              {entries.length === 0 && (
                <p className="m-0">Billing address not available</p>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderSuccess;
