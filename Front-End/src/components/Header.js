import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/soil_logo1.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SearchResult from "./SearchResults";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./Navbar";
import { getLoggedInUser } from "../data/repository";
import { useCart } from "../hooks/useCart";

const Header = ({ onLogout }) => {
  const user = getLoggedInUser();
  const [showModal, setShowModal] = useState(false);
  const { getTotalItemCount, resetCart } = useCart();
  const cartItemCount = getTotalItemCount();

  const handleLogout = () => {
    onLogout();
    resetCart();
  };

  // don't show header and footer for signUp page
  const { pathname } = useLocation();
  if (pathname === "/signup") {
    return <></>;
  }

  return (
    <>
      <Container className="d-flex">
        <Link to="/" className="mr-3">
          <img src={logo} alt="Company Logo" />
        </Link>
        <div
          className="d-flex m-auto"
          style={{ width: "100%", height: "fit-content" }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              border: "1px solid lightgray",
              borderRadius: "10px",
              paddingInline: "5px",
              marginRight: "10px",
            }}
          >
            <SearchIcon className="m-auto" />
            <Form.Control
              type="text"
              placeholder="What are you looking for?"
              onClick={() => setShowModal(true)}
              style={{ boxShadow: "none", border: "none" }}
            />
          </div>

          <Link
            to="/shipping-delivery"
            className="custom-nav-link"
            style={{ width: "20%", margin: "auto 10px" }}
          >
            <LocalShippingIcon style={{ margin: "auto", marginRight: "5px" }} />
            Shipping & Delivery
          </Link>
          <Link to="/cart" className="custom-nav-link m-auto">
            <div style={{ position: "relative" }}>
              <ShoppingCartIcon style={{ margin: "auto" }} />
              {cartItemCount > 0 && (
                <div
                  style={{
                    height: 16,
                    width: 16,
                    backgroundColor: "#656565",
                    fontSize: 10,
                    color: "#fff",
                    position: "absolute",
                    top: -8,
                    right: -8,
                  }}
                  className="d-flex justify-content-center align-items-center rounded-circle"
                >
                  {cartItemCount}
                </div>
              )}
            </div>
          </Link>
        </div>
      </Container>
      <Navbar user={user} onLogout={handleLogout} />
      <SearchResult show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default Header;
