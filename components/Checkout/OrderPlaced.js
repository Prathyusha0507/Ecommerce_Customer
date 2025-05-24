import React from "react";
import { BsBagCheckFill } from "react-icons/bs";
import "./OrderPlaced.css";
import { useSelector } from "react-redux";

function OrderPlaced() {
  const order = useSelector((state) => state.orders.order);
  const orderId = order?._id;

  return (
    <div>
      <div className="order-wrapper">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Your order number is {orderId} </p>
        <p className="email-msg">
          A copy of the order information has been sent to your email.
        </p>
      </div>
    </div>
  );
}

export default OrderPlaced;
