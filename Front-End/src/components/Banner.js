import React from 'react'
import '../pages/Home/home.css'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

// Banner shown in the home page
const Banner = () => {
  return (
    <div style={{ backgroundColor: '#f0f4d1' }}>
      <Container>
        <Row>
          <Col xs={7} style={{ margin: 'auto' }}>
            <div>
              <h5 className='banner-title'>Fresh 100% Organic Foods</h5>
              <h1 className='banner-heading'>
                Fresh and Healthy Organic Foods
              </h1>
              <h6 className='banner-sub-title'>
                {' '}
                We provide one of the largest ranges of fresh Organic produce
                and groceries in Melbourne.{' '}
              </h6>
              <Link to='/shop'>
                <button className='btn-custom'>Shop Now</button>
              </Link>
            </div>
          </Col>
          <Col>
            <img
              alt='home_banner'
              width='100%'
              src={require('../assets/bannerimg.jpg')}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Banner
