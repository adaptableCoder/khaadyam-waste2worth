import React from 'react'
import './Card.css'

const Card = ({heading,content,icon_code}) => {
  return (
    <div className="card w-[95%] sm:w-1/3 h-[22rem] flex flex-col items-center p-5 text-center rounded-3xl hover:bg-[#008000] hover:text-white">
          <div className="my-2">
            <lord-icon
              src={`https://cdn.lordicon.com/${icon_code}.json`}
              trigger="hover"
              colors="primary:#000" // Default color
              style={{ "width": "7rem", "height": "7rem" }}
              className="hover:colors-primary-white">
            </lord-icon>
          </div>
          <p className="heading mb-2 font-bold text-lg sm:text-xl md:text-2xl text-[#008000] glowGreen">{heading}</p>
          <p className="text-sm sm:ext-md md:text-xl">{content}</p>
    </div>
  )
}

export default Card
