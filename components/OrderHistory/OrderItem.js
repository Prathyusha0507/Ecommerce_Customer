import "../OrderHistory/OrderHistory.css";

function OrderItem({ item }) {
  return (
    <div className="order-item-container">
      <div className="order-image-container">
        <img
          className="order-item-image"
          src={item.productDetails.images[0]}
          alt="Broken link"
        />
      </div>
      <div className="order-name-quantity-container">
        <h3>{item.productDetails.name}</h3>
        <h3>Quantity: {item.quantity}</h3>
      </div>
      <div className="order-price-container">
        <h1 className="order-price-value">
          ${(item.productDetails.price * item.quantity).toFixed(2)}
        </h1>
      </div>
    </div>
  );
}
export default OrderItem;
