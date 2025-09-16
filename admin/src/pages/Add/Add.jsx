import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  // const url = "http://localhost:4000"
  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData((data) => ({ ...data, [name]: value }))
  }

  // Form submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      // FormData object create
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("price", data.price)
      formData.append("category", data.category)
      formData.append("image", image)

      const response = await axios.post(`${url}/api/food/add`, formData)

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"  // fix capital S
        })

        setImage(null)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message || "Something went wrong!")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Server error, please try again")
    }
  }

  return (
    <div className='ad'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="preview"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="type here"
            onChange={onChangeHandler}
            value={data.name}
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            onChange={onChangeHandler}
            value={data.description}
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cakes">Cakes</option>
              <option value="Pure veg">Pure veg</option>
              <option value="pasta">pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$"
              onChange={onChangeHandler}
              value={data.price}
            />
          </div>

          <button type="submit" className="add-btn">ADD</button>
        </div>
      </form>
    </div>
  )
}

export default Add
