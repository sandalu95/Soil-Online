import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Blogs from '../../data/blogs'

// To display each article
const Article = () => {
  const { id } = useParams()
  const [articleContent, setArticleContent] = useState(null)
  const blog = Blogs[id - 1]

  useEffect(() => {
    // Fetch the content text file
    fetch(require(`../../assets/article${id}.txt`))
      .then(response => response.text())
      .then(text => {
        // Parse the content based on tags
        const parsedContent = parseContent(text)
        setArticleContent(parsedContent)
      })
      .catch(error => {
        console.error('Error fetching content file:', error)
      })
  }, [id])

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
    <Container className='mb-5 px-5' style={{ width: '50%' }}>
      <img
        src={require(`../../assets/b${id}.jpg`)}
        alt='farmers'
        width='100%'
        height='500px'
        style={{ marginBottom: '20px' }}
      />
      <small style={{ color: 'gray' }}>Published on: {blog.date}</small>
      <br />
      <small style={{ color: 'gray' }}>
        Referenced from:{' '}
        <a href={blog.link} target='_blank' rel='noreferrer'>
          Go to the reference
        </a>
      </small>
      <br />
      {articleContent && (
        <>
          {articleContent.map((item, index) => {
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

export default Article
