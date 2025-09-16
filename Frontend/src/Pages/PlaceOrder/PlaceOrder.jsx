



import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    emailL: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(""); // track COD or Stripe
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Prepare order items
  const getOrderItems = () => {
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    return orderItems;
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    let orderData = {
      address: data,
      items: getOrderItems(),
      amount: getTotalCartAmount() + 2,
      paymentMethod,
    };

    if (paymentMethod === "COD") {
      // Direct order placement for Cash on Delivery
      try {
        let response = await axios.post(
          url + "/api/order/place",
          orderData,
          { headers: { token } }
        );
        if (response.data.success) {
          // alert("Order placed successfully with Cash on Delivery!");
          // toast.success(response.data.message)
          toast.success("Order placed successfully with Cash on Delivery!");
          navigate("/myorder"); // redirect to orders page
        } else {
          alert("Error placing COD order");
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong with COD order.");
      }
    } else if (paymentMethod === "Stripe") {
      // Stripe checkout
      try {
        // let response = await axios.post(url + "/api/order/place", orderData, {
        //   headers: { token },
        // });
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url); // redirect to Stripe
        } else {
          alert("Error with Stripe payment");
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong with Stripe payment.");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            required
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          name="emailL"
          required
          onChange={onChangeHandler}
          value={data.emailL}
          type="email"
          placeholder="Email"
        />

        <input
          name="street"
          required
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            name="city"
            required
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            required
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="payment-methods">
            <p>Select Payment Method:</p>
            <button
              type="button"
              className={paymentMethod === "COD" ? "active" : ""}
              onClick={() => setPaymentMethod("COD")}
            >
              Cash on Delivery
            </button>
            <button
              type="button"
              className={paymentMethod === "Stripe" ? "active" : ""}
              onClick={() => setPaymentMethod("Stripe")}
            >
              Pay with Stripe
            </button>
          </div>

          {/* Final Place Order Button */}
          <button type="submit" className="confirm-btn">
            {paymentMethod === "COD"
              ? "Place Order"
              : paymentMethod === "Stripe"
                ? "Proceed to Payment"
                : "Select Payment Method"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;




