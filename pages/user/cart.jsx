import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/global";
import Axios from "axios";
import { useRouter } from "next/router";

function cart() {
  const router = useRouter();
  let orderId = "";

  const {
    cart,
    handleQuantityIncrement,
    handleQuantityDecrement,
    cartTotal,
    loadCartFromStorage,
  } = useGlobalContext();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  // Step 3 in payment
  const saveOrderDetails = async (response) => {
    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/order`,
        {
          cart: loadCartFromStorage(),
          razorpayOrderId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        },
        { withCredentials: true }
      );

      orderId = "";
      router.push("/user/orders");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Step 2 in payment
  const proceedPayment = (orderData) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RP_TEST_KEY_ID,
      currency: orderData.currency,
      amount: orderData.amount,
      name: "Vec Canteen",
      description: "You are paying to VEC canteen to place your order",
      image: `/admin/vec-logo.png`,
      order_id: orderData.orderId,
      handler: saveOrderDetails,
      // prefill: {
      //   name: "Anirudh Jwala",
      //   email: "anirudh@gmail.com",
      //   contact: "9999999999",
      // },
      theme: {
        color: "#ffffff",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Step 1 in payment
  const createRPOrder = async () => {
    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/payment/order`,
        { cart: loadCartFromStorage() },
        { withCredentials: true }
      );

      orderId = data.orderId;
      proceedPayment(data);
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
      <button className="border border-primary" onClick={createRPOrder}>
        Proceed to pay
      </button>
    </menu>
  );
}

export default cart;
