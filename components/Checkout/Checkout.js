import React from "react";
import "./Checkout.css";
import DeliveryContainer from "./DeliveryContainer";
import PaymentContainer from "./PaymentContainer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { sendMailAsync } from "../../redux/user/userSlice.js";
import { createOrderAsync } from "../../redux/orders/orderThunks";

function Checkout() {
  const itemList = useSelector((state) => state.cart.itemsList);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const [orderData, setOrderData] = useState({
    items: itemList,
    deliveryOption: "",
    deliveryAddress: "",
    fullName: `${user?.firstname} ${user?.lastname}`,
    user: user?._id,
  });

  const calcTotalPrice = () => {
    let totalPrice = 0;
    for (const item of itemList) {
      let priceForQuantity = parseFloat(
        item.productDetails.price * item.quantity
      );
      totalPrice += priceForQuantity;
    }
    return totalPrice.toFixed(2);
  };
  let totalPrice = calcTotalPrice();

  const handleOrderSubmit = (orderData) => {
    dispatch(createOrderAsync(orderData));
    dispatch(sendMailAsync({ user: user, orderInfo: itemList }));
  };

  return (
    <div>
      <h2> Checkout </h2>
      <div className="container-lg">
        <div className="row">
          <DeliveryContainer
            handleOrderSubmit={handleOrderSubmit}
            orderData={orderData}
            setOrderData={setOrderData}
            user={user}
            itemList={itemList}
          />
          <PaymentContainer
            handleOrderSubmit={handleOrderSubmit}
            orderData={orderData}
            setOrderData={setOrderData}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
