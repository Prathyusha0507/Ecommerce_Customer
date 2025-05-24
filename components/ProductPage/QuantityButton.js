import "./ProductPage.css";

function QuantityButton({ quantity, setQuantity }) {
  const updateQuantity = (value) => {
    const valueAsInt = parseInt(value);
    if (quantity > 1 || valueAsInt >= 0) {
      setQuantity(quantity + valueAsInt);
    }
  };

  const handleQuantityTypingInput = (e) => {
    const valueAsInt = parseInt(e.target.value);
    isNaN(valueAsInt) ? setQuantity(1) : setQuantity(valueAsInt);
  };
  return (
    <div className="quantity-picker-wrapper">
      <h4>Quantity:</h4>
      <div className="quantity-picker">
        <button className="purchase-button" onClick={(e) => updateQuantity(-1)}>
          -
        </button>
        <input
          type="number"
          value={quantity}
          min="1"
          minLength={1}
          className="purchase-button"
          onChange={handleQuantityTypingInput}
        />
        <button className="purchase-button" onClick={(e) => updateQuantity(1)}>
          +
        </button>
      </div>
    </div>
  );
}

export default QuantityButton;
