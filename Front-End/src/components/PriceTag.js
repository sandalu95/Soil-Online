import React from "react";

const DiscountDisplay = ({ product }) => {
  return (
    <>
      <span>
        Price: ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
      </span>
      {product.onSale && (
        <span
          style={{
            textDecoration: "line-through",
            color: "gray",
            marginLeft: "10px",
          }}
        >
          ${product.price}
        </span>
      )}
    </>
  );
};

export default DiscountDisplay;
