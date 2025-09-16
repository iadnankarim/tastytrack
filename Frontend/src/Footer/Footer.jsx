import React from 'react'
import './Footer.css'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
      <div className="footer-content">

        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut voluptate deleniti velit excepturi ab quis cumque sed reiciendis nam necessitatibus.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>


        <div className="footer-content-center">
          <h2>Get in Touch</h2>
          <ul>
            <li>+9212345677</li>
            <li>abc@gmail.com</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

      </div>
      <hr />
      <p className="footer-copyright">CopyRight 2025 tomat0.com - All right reserved</p>
    </div>
  )
}

export default Footer
