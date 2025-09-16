import React from 'react'
import Navbar from './Components/Navbar.jsx/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Footer/Footer'
import { useState } from 'react'
import LoginPopUp from './LoginPopUp/LoginPopUp'
import Verify from './Pages/verify/verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          {/* <Route path='/myorder' element={<MyOrders/>}/> */}
          <Route path='/myorder' element={<MyOrders />} />


        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  )
}

export default App
