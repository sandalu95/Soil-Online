import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './profile.css';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();

  // Function to determine if a link is active based on its href
  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      <Container>
        <h1>My Account</h1>
        <hr />
        <Nav variant="underline">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/account/settings"
              className={isActiveLink('/account/settings') ? 'custom-nav-link active' : 'custom-nav-link'}
            >
              Account Settings
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/account/addresses"
              className={isActiveLink('/account/addresses') ? 'custom-nav-link active' : 'custom-nav-link'}
            >
              Addresses
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/account/orders"
              className={isActiveLink('/account/orders') ? 'custom-nav-link active' : 'custom-nav-link'}
            >
              Order History
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Outlet />
      </Container>
    </>
  );
};

export default Profile;
