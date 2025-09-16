import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'
// import { useEffect } from 'react'

const LoginPopUp = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currentState, setCurrentState] = useState('Login')
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value

    setData(data => ({ ...data, [name]: value }))
  }



  const onLogin = async (event) => {
    event.preventDefault()

    try {
      let newUrl = url
      if (currentState === "Login") {
        newUrl += "/api/user/login"
      } else {
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl, data)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Something went wrong. Please try again.")
    }
  }




  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
        </div>

        <div className="login-popup-input">
          {currentState === 'Login' ? <></> : <input
            name='name'
            value={data.name}
            onChange={onChangeHandler}
            type="text" placeholder='Your name ' required />}

          <input
            name='email'
            value={data.email}
            onChange={onChangeHandler}
            type="Email" placeholder='Your Email' required />
          <input
            name='password'
            value={data.password}
            onChange={onChangeHandler}
            type="password" placeholder='password' required />
        </div>

        <button type='submit'>{currentState === 'sign Up' ? 'create account' : 'Login'}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing , i agree to the terms of use & privacy policy</p>
        </div>

        {currentState === 'Login' ?
          <p>Create a new account  <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p> :
          <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>}


      </form>
    </div>
  )
}

export default LoginPopUp
