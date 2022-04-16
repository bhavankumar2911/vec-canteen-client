import React, { createContext, useContext, useState, useEffect } from "react";

const context = createContext(null);

function GlobalProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (!cart) return localStorage.setItem("cart", JSON.stringify([]));

    setCart([...JSON.parse(cart)]);
  }, []);

  const saveCartToStorage = (cart) =>
    localStorage.setItem("cart", JSON.stringify(cart));

  const loadCartFromStorage = () => JSON.parse(localStorage.getItem("cart"));

  const addToCart = (cartItem) => {
    const newCart = [
      ...cart.filter((item) => item.id !== cartItem.id),
      { ...cartItem, quantity: 1, amount: 1 * cartItem.price },
    ];
    setCart([...newCart]);

    saveCartToStorage(newCart);
  };

  const deleteFromCart = (id) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== id);
    setCart(newCart);

    saveCartToStorage(newCart);
  };

  const resetCart = () => {
    setCart([]);
    saveCartToStorage([]);
  };

  const handleQuantityIncrement = (id) => {
    const newCart = [
      ...cart.map((cartItem) => {
        if (cartItem.id == id) {
          let quantity = cartItem.quantity;

          return {
            ...cartItem,
            quantity: ++quantity,
            amount: quantity * cartItem.price,
          };
        } else return { ...cartItem };
      }),
    ];

    setCart([...newCart]);

    saveCartToStorage(newCart);
  };

  const handleQuantityDecrement = (id) => {
    const itemToBeDecremented = cart.filter((cartItem) => cartItem.id == id)[0];

    if (itemToBeDecremented.quantity == 1) return deleteFromCart(id);

    const newCart = [
      ...cart.map((cartItem) => {
        if (cartItem.id == id) {
          let quantity = cartItem.quantity;

          return {
            ...cartItem,
            quantity: --quantity,
            amount: quantity * cartItem.price,
          };
        } else return { ...cartItem };
      }),
    ];

    setCart([...newCart]);

    saveCartToStorage(newCart);
  };

  const cartCount = () => cart.length;

  const cartTotal = () => {
    let total = 0;

    cart.forEach((cartItem) => (total += cartItem.amount));

    return total;
  };

  return (
    <context.Provider
      value={{
        cart,
        addToCart,
        deleteFromCart,
        handleQuantityIncrement,
        handleQuantityDecrement,
        cartTotal,
        cartCount,
        loadCartFromStorage,
        resetCart,
      }}
    >
      {children}
    </context.Provider>
  );
}

export const useGlobalContext = () => useContext(context);

export default GlobalProvider;
