import React, { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const statusHandler = async (event, orderId) => {
    // console.log(event , orderId)
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });

    if (response.data.success) {
      await fetchAllOrder();
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Parcel</th>
              <th>Items</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel"
                    className="parcel-icon"
                  />
                </td>
                <td>
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name}x{item.quantity}
                      {i !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td>
                  {order.address.firstName} {order.address.lastName}
                </td>
                <td>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country},{" "}
                  {order.address.zipcode}
                </td>
                <td>{order.address.phone}</td>
                <td>{order.items.length}</td>
                <td>${order.amount}</td>
                <td>
                  <select
                    defaultValue="Food Processing"
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
