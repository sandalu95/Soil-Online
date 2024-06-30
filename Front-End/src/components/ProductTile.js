import React from "react";
import { Card } from "react-bootstrap";
import { useCart } from "../hooks/useCart";
import DiscountDisplay from "./PriceTag";
import { toast } from "react-toastify";
import { getLoggedInUser } from "../data/repository";
import { useNavigate } from "react-router-dom";
import "../pages/Product/product.css";

const ProductTile = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const item = cartItems?.find(item => item.productId === product.id);
  const cartItemAmount = item?.quantity;
  let reachOrderLimit = false;
  let outOfStock = false;
  const navigate = useNavigate();

  const productOnClick = () => {
    const productName = product.name.toLowerCase().split(/\s+/).join("-");
    navigate(`/shop/products/${productName}`);
  };

  // if out of stock
  if (product.stock === 0) {
    outOfStock = true;
  } else {
    // if cart has items inside, check if reach order limit
    if (cartItemAmount) {
      reachOrderLimit = product.stock - cartItemAmount <= 0;
    } else {
      reachOrderLimit = false;
    }
  }

  return (
    <Card style={{ height: "100%" }}>
      <Card.Img
        variant="top"
        src={product.imageUrl}
        onClick={productOnClick}
        style={{ cursor: "pointer" }}
        alt={product.name}
      />
      <Card.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <a className="product-tile-title">
              <Card.Title onClick={productOnClick}>{product.name}</Card.Title>
            </a>
            <DiscountDisplay product={product} />
          </div>
          <button
            className={`btn-custom ${outOfStock ? "disabled" : ""}`}
            disabled={outOfStock}
            onClick={() => {
              if (!reachOrderLimit) {
                getLoggedInUser()?.email &&
                  toast.success("Item added successfully!");
                addToCart(product.id, cartItemAmount + 1 || 1);
              } else {
                toast.error("Reached order limit");
              }
            }}
          >
            {!outOfStock ? "Add to Cart" : "out of stock"}{" "}
            {cartItemAmount > 0 && <> ({cartItemAmount})</>}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductTile;
