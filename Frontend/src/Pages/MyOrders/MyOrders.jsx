import React from 'react'
import './MyOrders.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })

    setData(response.data.data)
    console.log(response.data.data)
  }


  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])
  return (
    <div className="my-orders">
      <h2>Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>
              {order.items && order.items.map((item, i) => (
                <span key={i}>
                  {item.name} x {item.quantity}
                  {i !== order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>

            <p>${order.amount}.00</p>
            <p>Items : {order.items.length}</p>
            <p><span>&#x25cf;<span>{order.status}</span></span></p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>

  )
}

export default MyOrders
