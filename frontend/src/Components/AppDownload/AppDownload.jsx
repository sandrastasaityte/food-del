import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <section className="app-download" id="app-download">
      <p>
        Get a better experience <br />
        Download the Tomato App
      </p>

      <div className="app-download-platforms">
        <a
          href="https://play.google.com/store/apps/details?id=com.example.tomato"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Tomato App from Google Play"
        >
          <img
            src={assets.play_store}
            alt="Get it on Google Play"
            loading="lazy"
          />
        </a>

        <a
          href="https://apps.apple.com/app/idXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Tomato App from App Store"
        >
          <img
            src={assets.app_store}
            alt="Download on the App Store"
            loading="lazy"
          />
        </a>
      </div>
    </section>
  )
}

export default AppDownload
