import React, { useEffect, useState } from "react";
import { Col, Row, Container, ButtonGroup, Button } from "react-bootstrap";
import ProductTile from "./ProductTile";
import { getProducts } from "../data/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getProducts();
      setProducts(allProducts);
    }
    loadProducts();
  }, []);

  const filteredProducts =
    filter === "special"
      ? products.filter((product) => product.onSale)
      : products;

  return (
    <Container className="home-section">
      <h1>Products</h1>
      <div className="d-flex flex-column align-items-center my-2">
        <ButtonGroup className="mb-5 mt-4">
          <Button
            variant={filter === "all" ? "success" : "secondary"}
            onClick={() => setFilter("all")}
          >
            All Products
          </Button>
          <Button
            variant={filter === "special" ? "success" : "secondary"}
            onClick={() => setFilter("special")}
          >
            Special Products
          </Button>
        </ButtonGroup>
      </div>
      <Row xs={1} md={4} className="g-4 h-100">
        {filteredProducts.map((product, key) => (
          <Col key={key}>
            <ProductTile product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
