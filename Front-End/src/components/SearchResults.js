import React, { useEffect, useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import { getProducts } from '../data/products'
import { Form, Row } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search'
import SearchProduct from './SearchProduct'
import '../pages/Home/home.css'

// Shown when the user clicks on the search bar in the header
const SearchResult = props => {
  const [products, setProducts] = useState()
  const [query, setQuery] = useState(props.query)

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getProducts();

      setProducts(allProducts);
    }
    loadProducts();
  }, [])

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable
      style={{ maxHeight: '75vh', minHeight: '75vh' }}
      onHide={() => {
        props?.onHide()
        setQuery(null)
      }}
    >
      <Modal.Header>
        <SearchIcon />
        <Form.Control
          type='text'
          placeholder='What are you looking for?'
          onChange={e => {
            e.target.value === '' ? setQuery(null) : setQuery(e.target.value)
          }}
          style={{ border: 'none', boxShadow: 'none' }}
          autoFocus
        />
      </Modal.Header>
      <Modal.Body>
        {query ? (
          <Row xs={1} md={1} className='g-3'>
            {products
              ?.filter(p => p?.name.toLowerCase().includes(query.toLowerCase()))
              ?.map(prod => (
                <SearchProduct product={prod} />
              ))}
          </Row>
        ) : (
          <div
            className='d-flex flex-column text-center justify-content-center'
            style={{ height: '90%' }}
          >
            <p style={{ color: 'lightgray' }}>
              Start typing to search products...
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default SearchResult
