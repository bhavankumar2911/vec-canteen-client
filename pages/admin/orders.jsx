import React, { useState, useEffect } from "react";
import Axios from "axios";
import useOrderFormatter from "../../hooks/common/useOrderFormatter";

function orders() {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const handleOrderSearch = async (e) => {
    // if the user id is empty show all pending orders
    if (e.target.value == "") {
      fetchOrders();
      return;
    }

    // fetching orders of user with searched id
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/order/${e.target.value}`,
        { withCredentials: true }
      );

      setOrders([...data.orders]);
      setOrderDetails([...data.orderDetails]);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const formattedOrders = useOrderFormatter(orders, orderDetails);

  const fetchOrders = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/order`,
        { withCredentials: true }
      );

      setOrders([...data.orders]);
      setOrderDetails([...data.orderDetails]);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(fetchOrders, []);

  const handleOrderClose = async (e) => {
    const orderId = e.target.dataset.orderId;

    try {
      const { data } = await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/order/${orderId}`,
        {},
        { withCredentials: true }
      );

      console.log(data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <section>
        <div>
          <div>
            <input
              type="number"
              name="userId"
              placeholder="Enter user ID"
              onChange={handleOrderSearch}
            />
          </div>
        </div>

        <h2>Pending Orders</h2>
        {formattedOrders.map((order, index) => {
          return order.isClosed == true ? (
            ""
          ) : (
            <li key={index}>
              <p>
                <small>Order Id: {order.id}</small>
              </p>
              <p>Ordered by: {order.orderedBy}</p>
              <p>{order.items}</p>
              <button data-order-id={order.id} onClick={handleOrderClose}>
                Close
              </button>
            </li>
          );
        })}

        <h2>Closed Orders</h2>
        {formattedOrders.map((order, index) => {
          return order.isClosed == true ? (
            <li key={index}>
              <p>
                <small>Order Id: {order.id}</small>
              </p>
              <p>Ordered by: {order.orderedBy}</p>
              <p>{order.items}</p>
            </li>
          ) : (
            ""
          );
        })}
      </section>
    </div>
  );
}

export default orders;
