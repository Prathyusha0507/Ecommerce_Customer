import "../OrderHistory/OrderHistory.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAsync } from "../../redux/orders/orderThunks";
import { auth } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import Order from "./Order";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../utils/RoutePaths.js";

function OrderHistory() {
  const list = useSelector((state) => state.orders.list);
  const dispatch = useDispatch();
  const userID = auth.currentUser?.uid;
  useEffect(() => {
    dispatch(getOrdersAsync(userID));
  }, []);

  return (
    <div className="orderhistory-container">
      <div className="orderhistory-header-search-content">
        <h1 className="orderhistory-header">Order History</h1>
      </div>
      <hr className="orderhistory-hr" />
      {list.length !== 0 ? (
        list.map((order) => {
          return (
            <Order
              key={order._id}
              order={order}
              deliveryAddress={order.deliveryAddress}
              fullName={order.fullName}
            />
          );
        })
      ) : (
        <div>
          <h3>No orders made yet</h3>
          <Link to={RoutePaths.Home}>
            <button className="wishlist-button" id="browse">
              Browse Products
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
