import React from 'react'
import './Button_colorful.css'

const Button_colorful = ({text}) => {
  return (
    <div>
      <div className="btn-1">
        <span className="backdrop-blur-sm bg-black text-white transition-colors duration-500 text-lg md:text-xl">
            {text}
        </span>
      </div>
    </div>
  )
}

export default Button_colorful
