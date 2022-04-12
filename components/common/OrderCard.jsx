import React from "react";

function OrderCard({ orders, orderDetails }) {
  let formattedOrders = [];

  // formatting the orders data for displaying
  orders.forEach((order) => {
    let itemsForEachOrder = [];

    orderDetails.forEach((orderDetail) => {
      if (order.id == orderDetail.orderId) itemsForEachOrder.push(orderDetail);
    });

    formattedOrders.push({ id: order.id, items: [...itemsForEachOrder] });
  });

  // injecting the data into HTML template
  formattedOrders = formattedOrders.map((orderItem, index) => {
    let foodItemsWithQuantity = "";

    orderItem.items.forEach(
      (item) => (foodItemsWithQuantity += `, ${item.quantity} ${item.foodName}`)
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
  return <div>OrderCard</div>;
}

export default OrderCard;
