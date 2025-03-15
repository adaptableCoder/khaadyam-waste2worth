import React from 'react'
import './Button_colorful.css'

const Button_colorful = ({text, disabled, tooltip}) => {
  return (
    <div className="tooltip-container">
      <div className="btn-1">
        <span className={`backdrop-blur-sm bg-black text-white transition-colors duration-500 text-lg md:text-xl ${disabled ? 'disabled cursor-not-allowed' : ''}`}>
            {text}
        </span>
      </div>
      {disabled && tooltip && <span className="tooltip-text">{tooltip}</span>}
    </div>
  )
}

export default Button_colorful
