

import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([])
  // const url = "http://localhost:4000"

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error("Error fetching data")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeFood = async (foodId) => {
  try {
    await axios.post(`${url}/api/food/remove`, { id: foodId });
    toast.success("Food deleted!");
    await fetchList();
  } catch (error) {
    toast.error("Delete failed");
  }
};


  return (
    <div className='list add flex-col'>
      <p className="list-title">All Food List</p>

      <div className="list-table">
        {/* Table Header */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Table Rows */}
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button className="delete-btn" onClick={()=>removeFood(item._id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
