import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import CartItem from "./CartItem";
import { CartContextProvider } from "../context/CartContext";
import { useCart } from "../hooks/useCart";

// Mimic behavior of necessary data and function for test
const createCartRepository = (initialQuantity = 2) => {
  const cartId = 1;
  let shoppingCartItems = [
    {
      shoppingCartId: cartId,
      productId: 1,
      quantity: initialQuantity,
      product: {
        id: 1,
        name: "Banana",
        price: 5.4,
        discount: 0,
        stock: 50,
      },
    },
  ];

  return {
    getStoredCartId: () => cartId,
    updateItemAmount: (shoppingCartId, productId, quantity) => {
      const index = shoppingCartItems.findIndex(
        (x) => x.productId === productId
      );
      if (index > -1) {
        shoppingCartItems[index] = { ...shoppingCartItems[index], quantity };
      }

      return {
        shoppingCartId,
        productId,
        quantity,
      };
    },

    getCartItems: (email, cartId) => {
      return { shoppingCartItems };
    },
    removeFromCartAPI: (cartId, productId) => {
      shoppingCartItems = shoppingCartItems.filter(
        (x) => x.productId !== productId
      );
    },
    storeCartId: () => {},
    addToCartAPI: () => {},
    deleteCartAPI: () => {},
  };
};

const CartItems = () => {
  const { cartItems } = useCart();
  return cartItems.map((item) => (
    <div key={item.productId}>
      <CartItem product={item} />
    </div>
  ));
};

// Verifies that the cart displays the correct information for an item
test("Display item name, price, quantity and total price", async () => {
  const cartRepository = createCartRepository();

  await act(() =>
    render(
      <CartContextProvider
        user={{ email: "test@thing.com" }}
        cartRepository={cartRepository}
        productRepository={{}}
      >
        <CartItems></CartItems>
      </CartContextProvider>
    )
  );

  expect(await screen.findByText("Banana")).toBeInTheDocument();
  expect(screen.getByText("Price: $5.40")).toBeInTheDocument();
  expect(screen.getByRole("input", { name: "quantity" })).toHaveValue("2");
  expect(screen.getByText("Total: $10.80")).toBeInTheDocument();
});

// Checks if clicking the "+" button increases the quantity
test("Increase quantity", async () => {
  const cartRepository = createCartRepository();
  await act(() =>
    render(
      <CartContextProvider
        user={{ email: "test@thing.com" }}
        cartRepository={cartRepository}
        productRepository={{}}
      >
        <CartItems></CartItems>
      </CartContextProvider>
    )
  );

  const button = await screen.findByText("+");
  // Simulates increasing the quantity of an item in the cart
  await act(() => fireEvent.click(button));

  expect(screen.getByText("Price: $5.40")).toBeInTheDocument();
  expect(screen.getByRole("input", { name: "quantity" })).toHaveValue("3");
  expect(screen.getByText("Total: $16.20")).toBeInTheDocument();
});

// Checks if clicking the "-" button decreases the quantity
test("Decrease quantity", async () => {
  const cartRepository = createCartRepository();
  await act(() =>
    render(
      <CartContextProvider
        user={{ email: "test@thing.com" }}
        cartRepository={cartRepository}
        productRepository={{}}
      >
        <CartItems></CartItems>
      </CartContextProvider>
    )
  );

  const button = await screen.findByText("-");
  // Simulates decrease an item in the cart
  await act(() => fireEvent.click(button));

  expect(screen.getByText("Price: $5.40")).toBeInTheDocument();
  expect(screen.getByRole("input", { name: "quantity" })).toHaveValue("1");
  expect(screen.getByText("Total: $5.40")).toBeInTheDocument();
});

// Verifies the removal of an item from the cart.
test("Remove item", async () => {
  const cartRepository = createCartRepository(1);
  await act(() =>
    render(
      <CartContextProvider
        user={{ email: "test@thing.com" }}
        cartRepository={cartRepository}
        productRepository={{}}
      >
        <CartItems></CartItems>
      </CartContextProvider>
    )
  );

  expect(await screen.findByText("Banana")).toBeInTheDocument();

  const button = await screen.findByText("remove");
  // Simulates remove an item in the cart
  await act(() => fireEvent.click(button));

  await waitFor(() => {
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });
});
