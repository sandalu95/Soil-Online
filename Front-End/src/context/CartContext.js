import React, { useEffect } from "react";
import { useState, createContext } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const email = props.user?.email;
  const {
    getCartItems,
    addToCartAPI,
    deleteCartAPI,
    findOrCreateCart,
    removeFromCartAPI,
    updateItemAmount,
    getStoredCartId,
    storeCartId,
    removeCartId,
  } = props.cartRepository;

  const { findProduct } = props.productRepository;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const initializeCart = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const cartId = getStoredCartId();
      if (!cartId || cartId === "undefined") {
        const cartData = await findOrCreateCart(email);
        storeCartId(cartData?.id);
      }
      const cartData = await getCartItems(email, parseInt(getStoredCartId()));
      setCartItems(cartData?.shoppingCartItems ?? []);
      const price = getTotalCartPrice(cartData?.shoppingCartItems);
      setTotalPrice(price);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // get the total Price of the cart
  const getTotalCartPrice = (cartItems) => {
    return cartItems
      ?.reduce((total, item) => {
        const currentPrice = (
          (item.product.price * (100 - item.product.discount)) /
          100
        ).toFixed(2);
        return total + item.quantity * currentPrice;
      }, 0)
      .toFixed(2);
  };

  useEffect(() => {
    async function initCart() {
      await initializeCart(email);
    }
    initCart();
  }, []);

  const resetCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  const addToCart = async (productId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      if (quantity > 1) {
        await updateCartItemAmount(productId, quantity);
      } else {
        // Check if the cart is initialized
        const cartId = getStoredCartId();
        if (!cartId || cartId === "undefined") {
          await initializeCart(email);
        }
        const updatedItem = await addToCartAPI(
          getStoredCartId(),
          productId,
          quantity
        );

        updatedItem["product"] = await findProduct(productId);
        setCartItems((prevCartItems) => {
          const existingItemIndex = prevCartItems.findIndex(
            (item) => item?.productId === updatedItem?.productId
          );
          let updatedItems = [...prevCartItems];
          if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex] = updatedItem;
          } else {
            updatedItems.push(updatedItem);
          }
          const updatedTotalPrice = getTotalCartPrice(updatedItems);
          setTotalPrice(updatedTotalPrice);
          return updatedItems;
        });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const cartId = getStoredCartId();
      if (!cartId || cartId === "undefined") {
        await initializeCart(email);
      }
      await removeFromCartAPI(getStoredCartId(), productId);

      setCartItems((prevCartItems) => {
        const updatedItems = prevCartItems.filter(
          (item) => item.productId !== productId
        );
        const updatedTotalPrice = getTotalCartPrice(updatedItems);
        setTotalPrice(updatedTotalPrice);
        return updatedItems;
      });
    } catch (err) {
      setError(`Error removing item from cart: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteCart = async () => {
    try {
      const cartId = getStoredCartId();
      await deleteCartAPI(cartId);
      removeCartId();
      setCartItems([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCartItemAmount = async (productId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      // Check if the cart is initialized
      const cartId = getStoredCartId();
      if (!cartId || cartId === "undefined") {
        await initializeCart(email);
      }
      const updatedItem = await updateItemAmount(
        getStoredCartId(),
        productId,
        quantity
      );

      setCartItems((prevCartItems) => {
        const updatedItems = prevCartItems.map((item) =>
          item?.productId === updatedItem?.productId
            ? { ...item, quantity: updatedItem?.quantity }
            : item
        );
        const updatedTotalPrice = getTotalCartPrice(updatedItems);
        setTotalPrice(updatedTotalPrice);
        return updatedItems;
      });
    } catch (err) {
      setError(`Error updating cart item amount: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getTotalItemCount = () => {
    return cartItems?.reduce((acc, item) => acc + item?.quantity, 0) || 0;
  };

  const contextValue = {
    cartItems,
    loading,
    error,
    totalPrice,
    addToCart,
    initializeCart,
    removeFromCart,
    deleteCart,
    updateCartItemAmount,
    getTotalCartPrice,
    getTotalItemCount,
    resetCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
