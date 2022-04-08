import React from "react";
import { useGlobalContext } from "../../context/global";
import Axios from "axios";

function cart() {
  const {
    cart,
    handleQuantityIncrement,
    handleQuantityDecrement,
    cartTotal,
    loadCartFromStorage,
  } = useGlobalContext();

  const handleConfirmOrder = async () => {
    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/order`,
        { cart: loadCartFromStorage() },
        { withCredentials: true }
      );

      console.log(data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <menu>
      <h1>My bag</h1>
      <ul>
        {cart.map((cartItem, index) => (
          <li key={index}>
            <p>{cartItem.foodName}</p>
            <span>
              <button
                data-food-id={cartItem.id}
                onClick={(e) =>
                  handleQuantityDecrement(parseInt(e.target.dataset.foodId))
                }
              >
                -
              </button>
              <p>{cartItem.quantity}</p>
              <button
                data-food-id={cartItem.id}
                onClick={(e) =>
                  handleQuantityIncrement(parseInt(e.target.dataset.foodId))
                }
              >
                +
              </button>
            </span>
            <p>{cartItem.amount}</p>
          </li>
        ))}
      </ul>
      <p>
        Total <span>{cartTotal()}</span>
      </p>
      <button className="border border-primary" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </menu>
  );
}

export default cart;
