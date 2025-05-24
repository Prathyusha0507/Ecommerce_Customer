import "../OrderHistory/OrderHistory.css";
import OrderItem from "./OrderItem.js";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import Modal from "../Custom/Modal";
import { returnOrderAsync } from "../../redux/orders/orderThunks";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Order({ order, deliveryAddress, fullName }) {
  const user = useSelector((state) => state.user.user);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  let address = "No address assigned yet";
  if (deliveryAddress) {
    address = deliveryAddress;
  } else if (
    user?.address !== "" ||
    user?.address !== undefined ||
    user?.address !== null
  ) {
    address = user?.address;
  }
  const returnOrder = () => {
    setShowModal(true);
  };
  const onCancel = () => {
    setShowModal(false);
  };
  const closeModal = () => {
    setShowModal(false);
    dispatch(returnOrderAsync(order._id));
    toast.success("Order Return Successfull !", {
      position: "bottom-right",
      theme: "colored",
      autoClose: 2000,
    });
  };
  return (
    <>
      <div className="orderhistory-card">
        <div className="order-info-container">
          <h4 className="order-date">Date Order Placed: {order.createdAt}</h4>
          <button onClick={returnOrder} className="return-order-button">
            Return Order
          </button>
          <h4 className="ship-to-info">Ship To: {fullName}</h4>
          <dialog className="user-info-popup">Address: {address}</dialog>
        </div>
        <div className="ordered-item-container">
          {order.items.map((currItem) => {
            return (
              <>
                <OrderItem
                  key={order._id.concat(`:${currItem._id}`)}
                  item={currItem}
                />
                <hr className="orderhistory-card-hr" />
              </>
            );
          })}
        </div>
        {showModal && (
          <Modal
            heading="Notification"
            content={"Are you sure you want to return this order?"}
            primaryLabel="Yes"
            secondaryLabel="Cancel"
            showSecondary={true}
            closeModal={closeModal}
            secondaryOperation={onCancel}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Order;
