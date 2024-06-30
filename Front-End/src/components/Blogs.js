import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import blogs from '../data/blogs'
import { Link } from 'react-router-dom'

// Single article in the Home page blog section
const BlogTile = ({ blog }) => {
  return (
    <Link to={`/blog/article/${blog.id}`} style={{textDecoration:"none"}}>
      <Card className='blog-tile'>
        <Row>
          <Col xs={6} md={4}>
            <Card.Img
              src={require(`../assets/b${blog.id}.jpg`)}
              alt='Card image'
              height='100%'
            />
          </Col>
          <Col xs={12} md={8} style={{ padding: '25px' }}>
            <h3 style={{ marginBottom: '20px' }}>{blog.title}</h3>
            <Card.Text>{blog.description}</Card.Text>
            <small style={{ color: 'gray' }}>Published on: {blog.date}</small>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

// Blog section in the home page
const Blogs = () => {
  return (
    <div className='home-section'>
      <h1>Featured Blogs</h1>
      {blogs.map((blog, key) => (
        <BlogTile blog={blog} key={key} />
      ))}
    </div>
  )
}

export default Blogs
