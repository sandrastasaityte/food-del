import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://www.facebook.com/",
      icon: assets.facebook_icon,
      label: "Visit our Facebook",
      alt: "Facebook",
    },
    {
      href: "https://www.linkedin.com/",
      icon: assets.linkedin_icon,
      label: "Visit our LinkedIn",
      alt: "LinkedIn",
    },
    {
      href: "https://instagram.com/",
      icon: assets.instagram_icon,
      label: "Visit our Twitter",
      alt: "Twitter",
    },
  ];

  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato logo" loading="lazy" />
          <p>
            We bring the restaurant experience to your home – gourmet meals,
            fresh flavours, and trusted quality in every bite.
          </p>
          <div className="footer-social-icons">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <img src={item.icon} alt={item.alt} loading="lazy" />
              </a>
            ))}
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2 id="footer-heading">Company</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/app">Mobile App</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li><a href="tel:+447787290628">+44 7787 290 628</a></li>
            <li><a href="mailto:contact@tomato.com">contact@tomato.com</a></li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        © {year} Tomato. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
