import React from "react";
import { Container } from "react-bootstrap";
import Person2Icon from "@mui/icons-material/Person2";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <>
      <Container>
        <div id="basic-navbar-nav">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="me-auto my-3"
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Link to="/" className="custom-nav-link mr-3">
                Home
              </Link>
              <Link to="/shop" className="custom-nav-link mr-3">
                Shop
              </Link>
              <Link to="/diet-plans" className="custom-nav-link mr-3">
                Diet Plans
              </Link>
              <Link to="/blog" className="custom-nav-link mr-3">
                Blog
              </Link>
              <Link to="/about" className="custom-nav-link mr-3">
                About Us
              </Link>
              <Link to="/contact" className="custom-nav-link">
                Contact
              </Link>
            </div>
            {user && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Link to="/account/settings" className="custom-nav-link mr-3">
                  <Person2Icon style={{ margin: "auto" }} />
                  My Account
                </Link>
                <Link to="/" className="custom-nav-link" onClick={onLogout}>
                  <Person2Icon style={{ margin: "auto" }} />
                  Logout
                </Link>
              </div>
            )}
            {!user && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Link to="/login" className="custom-nav-link">
                  <Person2Icon style={{ margin: "auto" }} />
                  Login/Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
