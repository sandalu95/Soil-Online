import React, { useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProducts } from "../../../data/products";
import "./orders.css";
import { getOrders } from "../../../data/orders";

const Orders = ({ user }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const products = await getProducts();
      setAllProducts(products);
    }

    const fetchOrders = async () => {
      const orders = await getOrders(user?.email);
      if (orders) {
        setOrders(orders);
      }
    };

    loadProducts();
    fetchOrders().catch(console.error);
  }, []);

  return (
    <>
      <h5 className="mt-3">Your Past orders</h5>
      {orders?.reverse().length > 0 ? (
        <div
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}
        >
          {orders?.map((order) => (
            <Card className="m-3 p-3" style={{ width: "30%" }}>
              <p>
                <b>Ordered On:</b>{" "}
                {`${new Date(order?.date).toLocaleDateString(
                  "en-US"
                )} ${new Date(order?.date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}`}
              </p>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>View Items</Accordion.Header>
                  <Accordion.Body>
                    {order?.orderItems?.map((item, key) => {
                      let itemName = allProducts?.find(
                        (product) => product.id === Number(item.productId)
                      )?.name;
                      key += 1;
                      return (
                        <Row
                          style={{
                            borderBottom:
                              key === order?.orderItems?.length
                                ? "none"
                                : "1px solid lightgray",
                          }}
                        >
                          <Col md={9}>
                            <p className="mb-1">{itemName}</p>
                          </Col>
                          <Col md={3}>
                            <p className="mb-1">Qty: {item.quantity}</p>
                          </Col>
                        </Row>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <p style={{ marginTop: "20px" }}>Total: ${order?.total}</p>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <p style={{ marginTop: "20px" }}>
            You haven't placed any orders yet.
          </p>
          <Link to="/shop">
            <button className="btn-custom mb-5">Continue Shopping</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Orders;
