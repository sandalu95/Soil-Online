import React from 'react'
import { Container } from 'react-bootstrap'
import Blogs from '../../components/Blogs'

// Main Blog Page
const Blog = () => {
  return (
    <Container>
      <h1>Welcome to SOIL's Organic Blog!</h1>
      <div className='blog-content'>
        <p>
          Whether you're diving into the world of organic foods for the first
          time or seeking fresh inspiration for your culinary adventures, SOIL's
          blog is your go-to source for natural ingredients, nutritious recipes,
          and tips for growing your own organic vegetables in your backyard. Our
          blog is packed with valuable information to support your journey
          towards healthier living, inside and out.
        </p>
        <p>
          Our blog offers expert nutritional advice to help you make informed
          choices about your diet and lifestyle. Whether you're looking to boost
          your health, enhance your well-being, or simply enjoy delicious,
          wholesome meals, we've got you covered.
        </p>
        <p>
          For those with a green thumb, we offer valuable insights and guidance
          on growing smaller vegetables in your backyard. Discover the joys of
          cultivating your own organic produce and enjoy the satisfaction of
          harvesting fresh, nutrient-rich veggies right from your garden.
        </p>
        <p>
          So, dive into our blog, explore the wealth of information at your
          fingertips, and embark on a journey towards healthier, more
          sustainable living with SOIL.
        </p>
      </div>
      <Blogs />
    </Container>
  )
}

export default Blog
