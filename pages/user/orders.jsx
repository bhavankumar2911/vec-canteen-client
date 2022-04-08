import React, { useState, useEffect } from "react";
import Axios from "axios";
import QRCode from "qrcode.react";

function orders() {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/order`,
        { withCredentials: true }
      );

      console.log(data);
      setOrders([...data.orders]);
      setOrderDetails([...data.orderDetails]);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(fetchOrders, []);

  const displayOrders = () => {
    let formattedOrders = [];

    // formatting the orders data for displaying
    orders.forEach((order) => {
      let itemsForEachOrder = [];

      orderDetails.forEach((orderDetail) => {
        if (order.id == orderDetail.orderId)
          itemsForEachOrder.push(orderDetail);
      });

      formattedOrders.push({ id: order.id, items: [...itemsForEachOrder] });
    });

    // injecting the data into HTML template
    formattedOrders = formattedOrders.map((orderItem, index) => {
      let foodItemsWithQuantity = "";

      orderItem.items.forEach(
        (item) =>
          (foodItemsWithQuantity += `, ${item.quantity} ${item.foodName}`)
      );

      return (
        <li key={index}>
          <h3>Order Id: {orderItem.id}</h3>
          <QRCode value={orderItem.id} size={50} />
          <p>{foodItemsWithQuantity.substring(2)}</p>
          <p>Status: {orderItem.isClosed ? "Closed" : "Not closed"}</p>
        </li>
      );
    });

    return [...formattedOrders];
  };

  return (
    <div>
      <h1>My Orders</h1>
      <ul>{displayOrders()}</ul>
    </div>
  );
}

export default orders;
