import React from "react";
import "./CartItem.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";

const CartItem = ({ onContinueShopping, onRemoveFromCart }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  
  const calculateTotalAmount = (section) => {
    let total_amount = 0;
    cart.forEach((item) => {
      total_amount += item.cost * item.quantity;
    });
    return total_amount;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(updateQuantity(updatedItem));
    } else {
      dispatch(removeItem(item.name));
      onRemoveFromCart(item.name);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    onRemoveFromCart(item.name);
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${item.cost * item.quantity}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;


