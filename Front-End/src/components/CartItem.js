import React from "react";
import "../pages/Cart/cart.css";
import DiscountDisplay from "./PriceTag";
import { useCart } from "../hooks/useCart";

const CartItem = ({ product }) => {
  const item = product.product;
  const quantity = product.quantity;
  const { removeFromCart, updateCartItemAmount } = useCart();

  const enoughStorage = item.stock - quantity > 0;
  const currentPrice = ((item.price * (100 - item.discount)) / 100).toFixed(2);

  return (
    <div className="container mb-4">
      <div className="cartItem">
        <img
          className="cartItem img"
          src={item.imageUrl}
          alt={item.name}
        />
        <div className="cartItem-info">
          <p>
            {" "}
            <b>{item.name}</b>
          </p>
          <p>
            <DiscountDisplay product={item} />
          </p>
          <div>
            Quantity:
            <button
              onClick={() =>
                quantity > 1
                  ? updateCartItemAmount(item.id, quantity - 1)
                  : removeFromCart(item.id)
              }
            >
              {quantity > 1 ? "-" : "remove"}
            </button>
            <input
              role="input"
              aria-label="quantity"
              value={quantity}
              onChange={(e) => {
                updateCartItemAmount(Number(e.target.value), item.id);
              }}
            ></input>
            <button
              disabled={!enoughStorage}
              onClick={() => {
                updateCartItemAmount(item.id, quantity + 1);
              }}
            >
              +
            </button>
            {!enoughStorage && (
              <p className="text-danger">{"Reached order limit"}</p>
            )}
            <div>
              <p>Total: ${(currentPrice * quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
