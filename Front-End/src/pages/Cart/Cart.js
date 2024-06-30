import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CartItem from "../../components/CartItem";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useEffect, useState } from "react";

const Cart = ({ user }) => {
  const { cartItems, totalPrice, loading, error } = useCart();
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Determine if the shopping cart exceeds storage limit
    const isOverStorageLimit = cartItems?.some(
      ({ product, quantity }) => product && quantity > product.stock
    );

    if (!user?.email) {
      setIsDisabled(true);
      setMessage("Please log in to check out.");
    } else if (isOverStorageLimit) {
      setIsDisabled(true);
      setMessage("Some items in your cart exceed available stock.");
    } else {
      setIsDisabled(false);
      setMessage("");
    }
  }, [user, cartItems]);

  return (
    <>
      <Container>
        <h1>Your Cart</h1>
        {loading ? (
          <div>Loading your cart...</div>
        ) : error ? (
          <div>Error loading your cart. Try refreshing the page.</div>
        ) : cartItems?.length > 0 ? (
          <Row className="mb-5">
            <Col sm={7}>
              <Card>
                <Card.Header>Trolley</Card.Header>
                <Card.Body>
                  {cartItems?.map((item) => (
                    <div key={item.productId}>
                      <CartItem product={item} />
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4}>
              <Card>
                <Card.Header>Summary</Card.Header>
                <Card.Body>
                  <div>
                    <p>Subtotal: ${totalPrice}</p>
                    <Link to="/shop" className="btn btn-custom">
                      Continue shopping
                    </Link>
                    <Link
                      to="/checkout"
                      className={`btn btn-checkout ${
                        isDisabled ? "disabled" : ""
                      }`}
                      disabled={isDisabled}
                    >
                      Checkout
                    </Link>
                    {isDisabled && (
                      <div className="mt-2 text-danger">{message}</div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="col-xs-1 text-center">
            <h5 className="mt-5 mb-4"> Your Shopping Cart is Empty</h5>
            <Link className="btn btn-success" to="/shop">
              Continue Shopping
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
