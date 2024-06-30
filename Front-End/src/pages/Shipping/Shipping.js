import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

const Shipping = () => {
  const [shippingContent, setShippingContent] = useState(null)
  useEffect(() => {
    // Fetch the content text file
    fetch(require(`../../assets/shipping.txt`))
      .then(response => response.text())
      .then(text => {
        // Parse the content based on tags
        const parsedContent = parseContent(text)
        setShippingContent(parsedContent)
      })
      .catch(error => {
        console.error('Error fetching content file:', error)
      })
  }, [])

  // Function to parse the content based on tags
  const parseContent = text => {
    const lines = text.split('\n')
    let parsedContent = []

    lines.forEach(line => {
      // Split the line into tag and content
      const [tag, content] = line.split(':')

      // Push tag and content as an object to parsedContent array
      parsedContent.push({ tag: tag.trim(), content: content.trim() })
    })

    return parsedContent
  }
  return (
    <Container>
      {shippingContent && (
        <>
          {shippingContent.map((item, index) => {
            // Render different elements based on the tag
            switch (item.tag) {
              case 'title':
                return <h1 key={index}>{item.content}</h1>
              case 'introduction':
                return <p key={index}>{item.content}</p>
              case 'heading':
                return <h4 key={index}>{item.content}</h4>
              case 'content':
                return <p key={index}>{item.content}</p>
              case 'conclusion':
                return <p key={index}>{item.content}</p>
              default:
                return null
            }
          })}
        </>
      )}
    </Container>
  )
}

export default Shipping
