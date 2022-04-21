import React, { useState, useEffect } from "react";
import Axios from "axios";
import useOrderFormatter from "../../hooks/common/useOrderFormatter";
import Wrapper from "../../components/common/Wrapper";
import Button from "../../components/common/Button";
import QRCodeScanner from "../../components/admin/QRCodeScanner";

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
      console.log(error);
      alert(error.response.data.message);
    }
  };
  useEffect(fetchOrders, []);

  const handleOrderClose = async (e) => {
    const orderId = e.target.dataset.orderId;

    try {
      await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/order/${orderId}`,
        {},
        { withCredentials: true }
      );

      setOrders(orders.filter((order) => order.id !== orderId));
      setOrderDetails(
        orderDetails.filter((detail) => detail.orderId !== orderId)
      );
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-center font-bold pt-10">Close order</h1>
      <div>
        <QRCodeScanner />
      </div>
      {/* <Wrapper>
        <section>
          <div className="my-5">
            <div>
              <input
                type="number"
                name="userId"
                placeholder="Search user by ID"
                onChange={handleOrderSearch}
                className="border outline-primary rounded-lg w-full p-2"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold my-3">Pending Orders</h2>
          <ul className="list-style-none">
            {formattedOrders.map((order, index) => {
              return order.isClosed == true ? (
                ""
              ) : (
                <li
                  key={index}
                  className="bg-white mb-4 rounded-lg p-3 drop-shadow-md"
                >
                  <p className="font-semibold">{order.items}</p>
                  <p>
                    <small>Order Id: {order.id}</small>
                  </p>
                  <p>
                    <small>Ordered by: {order.orderedBy}</small>
                  </p>
                  <span
                    data-order-id={order.id}
                    onClick={handleOrderClose}
                    className="block my-2 cursor-pointer"
                  >
                    <Button
                      type="button"
                      text="Close Order"
                      classes="pointer-events-none"
                    />
                  </span>
                </li>
              );
            })}
          </ul>

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
      </Wrapper> */}
    </div>
  );
}

export default orders;
