import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        
        {/* Left Section: Logo & Description */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato Logo" />
          <p>
            We bring the restaurant experience to your home – gourmet meals, fresh flavors, 
            and trusted quality in every bite.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://www.linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram_icon} alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Center Section: Company Links */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#delivery">Delivery</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section: Contact Info */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li><a href="tel:+447787290628">+44 7787 290 628</a></li>
            <li><a href="mailto:contact@tomato.com">contact@tomato.com</a></li>
          </ul>
        </div>
      </div>

      <hr/>

      {/* Copyright */}
      <p className="footer-copyright">
        Copyright 2025 @Tomato.com - All rights reserved.
      </p>
    </div>
  )
}

export default Footer
