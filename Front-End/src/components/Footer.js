import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import GoogleIcon from '@mui/icons-material/Google'
import InstagramIcon from '@mui/icons-material/Instagram'
import DiamondIcon from '@mui/icons-material/Diamond'
import HomeIcon from '@mui/icons-material/Home'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

const Footer = () => {
  return (
    <div className='footer-div text-muted'>
      <Container className='d-flex justify-content-lg-between p-4 border-bottom'>
        <div>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='http://facebook.com' className='me-4 text-reset'>
            <FacebookIcon />
          </a>
          <a href='http://twitter.com' className='me-4 text-reset'>
            <TwitterIcon />
          </a>
          <a href='http://google.com' className='me-4 text-reset'>
            <GoogleIcon />
          </a>
          <a href='http://instagram.com' className='me-4 text-reset'>
            <InstagramIcon />
          </a>
        </div>
      </Container>

      <section className=''>
        <Container className='mt-5'>
          <Row className='mt-3'>
            <Col md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <DiamondIcon className='me-3' />
                SOIL (pvt) Ltd.
              </h6>
              <p>
                SOIL is Melbourne's premier organic food grocer, renowned for
                delivering premium, fresh organic produce to our community.
                We're your trusted source for healthy living.
              </p>
            </Col>

            <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful Links</h6>
              <p>
                <a href='/shop' className='text-reset'>
                  Shop
                </a>
              </p>
              <p>
                <a href='/shipping-delivery' className='text-reset'>
                  Shipping & Delivery
                </a>
              </p>
              <p>
                <a href='/diet-plans' className='text-reset'>
                  Diet Plans
                </a>
              </p>
              <p>
                <a href='/account/settings' className='text-reset'>
                  Account Settings
                </a>
              </p>
            </Col>

            <Col md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <HomeIcon className='me-2' />
                Melbourne, Victoria, Australia
              </p>
              <p>
                <EmailIcon className='me-3' />
                soil@gmail.com
              </p>
              <p>
                <PhoneIcon className='me-3' /> + 61 234 567 88
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className='text-center p-4'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        {'© 2024 Copyright : '}
        <span className='fw-bold mb-0'>SOIL (PVT) LTD</span>
      </div>
    </div>
  )
}

export default Footer
