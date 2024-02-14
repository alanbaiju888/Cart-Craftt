import React, { useContext } from "react";
import dataContext from "./Context";
import NavHead from "./NavHead";
import { Footer } from "./Footer";

function Cart() {
  const { addToCart, setAddToCart } = useContext(dataContext);

  // Function to remove commas from a string and convert it to a number
  const removeCommas = (price) => parseFloat(price.replace(/,/g, ""));

  //hand;e the quantity

  function handleQuantity(e, id) {
    const updatedQty = parseFloat(e.target.value);

    const newQty = addToCart.map((item) => {
      return item.id === id ? { ...item, qty: updatedQty } : item;
    });

    setAddToCart(newQty);
  }

  // Calculate the total amount
  const totalAmount = addToCart.reduce(
    (total, item) => total + item.qty * removeCommas(item.price),
    0
    //the zero is the starting value, thats is at the begging the total === 0 and it gets increased
  );

  function removeItem(index) {
    const removeConfirm = window.confirm(
      "Are you sure you want to remove this item ?"
    );

    if (removeConfirm) {
      const removedItem = addToCart.filter((item) => {
        return item.id !== index;
      });

      setAddToCart(removedItem);
    }
  }

  //calculate total items

  const totalItems = addToCart.reduce((total, item) => total + item.qty, 0);

  return (
    <>
    <div className="cartContainer">
      <NavHead />

      <p className="cartCount"> {addToCart.length}</p>

      {addToCart && addToCart.length > 0 ? (
        <div className="cards">
          {addToCart.map((item, index) => (
            <div key={item.id} className="Productcard">
              <div className="cardImg">
                <img src={item.img} alt={item.name} />
              </div>

              <p className="cartName my-4">{item.name}</p>

              <div className="details">
                <div className="price">
                  <p>₹ {item.price}</p>
                </div>

                <div className="Quantity">
                  <label htmlFor="quantity">Qty</label>
                  <select
                    name="quantity"
                    id="quantity"
                    onChange={(e) => {
                      handleQuantity(e, item.id);
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>

                <p className="text-success">
                  Amount : {(removeCommas(item.price)) * item.qty }
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-danger close-btn-icon"
              >
                <span className="bi bi-x-circle-fill "></span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-block text-center mt-3">
          <h1>Your Cart is empty.</h1>
          <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="cart is empty" width={700} />
        </div>
      )}

      <div className="bottom text-center mb-4">
        <p className="fs-4">
          Total Amount ({totalItems}) : ₹ {totalAmount.toFixed(2)}
        </p>
      
      </div>
    </div>
     <Footer/>
     </>
  );
}

export default Cart;
