import React, { useEffect, useState } from "react";
import { getProducts } from "../data/products";
import ProductTile from "./ProductTile";
import { Col, Row } from "react-bootstrap";

// The weekly specials section in the home page
const WeekSpecial = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getProducts();

      setProducts(allProducts);
    }
    loadProducts();
  }, []);

  return (
    <div className="home-section">
      <h1>This week's specials</h1>
      <Row xs={1} md={4} className="g-4">
        {products
          ?.filter((product) => product.onSale)
          .map((product, key) => (
            <Col key={key}>
              <ProductTile product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default WeekSpecial;
