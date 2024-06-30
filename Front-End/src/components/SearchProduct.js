import React from "react";
import { Card } from "react-bootstrap";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import { getLoggedInUser } from "../data/repository";

// Displays each product when user searched in the search bar
const SearchProduct = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const item = cartItems.find((item) => item.productId === product.id);
  const cartItemAmount = item?.quantity;
  let reachOrderLimit = false;

  let outOfStock = false;

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
    <Card style={{ height: "100px", padding: "0px" }}>
      <Card.Body className="d-flex p-1" style={{ height: "100%" }}>
        <img
          style={{ maxWidth: "100px" }}
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="d-flex flex-column ml-4 justify-content-between">
          <div>
            <b className="mb-0">{product.name}</b>
            <div>
              <span style={{ fontSize: "13px" }} className="m-0">
                Price: $
                {((product.price * (100 - product.discount)) / 100).toFixed(2)}
              </span>
              {product.onSale && (
                <span
                  className="mb-0 ml-2"
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    fontSize: "13px",
                  }}
                >
                  ${product.price}
                </span>
              )}
            </div>
          </div>
          <button
            className={`btn-success mb-1 ${outOfStock ? "disabled" : ""}`}
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
            style={{
              border: "1px solid green",
              borderRadius: "5px",
              boxShadow: "none",
              maxWidth: "fit-content",
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

export default SearchProduct;
