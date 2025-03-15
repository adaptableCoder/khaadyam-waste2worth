"use client"
import React, { useState, useRef } from 'react'
import '../globals.css'
import Button_colorful from '@/components/Button_colorful'
import Output from '@/components/Output'

const page = () => {
  const [form, setForm] = useState({location: '', quantity: '', foodItem: ''})
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const responseRef = useRef(null)

  const isButtonDisabled = !form.location || !form.foodItem;

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    responseRef.current.scrollIntoView({ behavior: 'smooth' })
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('https://khaadyam-waste2worth-backend.vercel.app/api/data', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()

      setForm({location: '', quantity: '', foodItem: ''})
      setResponseMessage(result.message)

    } 
    catch (error) {
      console.error('Fetch error:', error)
      setResponseMessage('An error occurred while submitting the form.')
    }
    setIsLoading(false)
  }
  return (
    <>
    <div className="banner min-h-[40rem] w-[100%] md:h-[90vh] h-[180vh] bg-cover bg-center bg-[url('./banner.jpg')]">
    <div className="overlay h-[100%] w-[100%] bg-black/40 flex flex-col justify-center items-center">
      <div className="BlankSpace h-[5%] md:h-[10%] w-[100%] m-0"></div>

      <div className="h-[90%] w-[100%] flex md:flex-row flex-col justify-center items-center gap-5">
        <div className="w-[95%] md:w-[45%] h-[50%] md:h-[90%] bg-black/10 backdrop-blur-sm p-5 rounded-3xl">
          <form method="POST" onSubmit={handleSubmit} className="h-[100%] w-[100%] flex flex-col justify-center items-center gap-5">
            <div className="h-[20%] w-[95%] md:w-[80%] flex flex-col justify-center items-start lg:gap-3">
              <label htmlFor="location" className="text-lg lg:text-xl text-white flex flex-row justify-center items-center lg:gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/ftyeihqb.json"
                  trigger="hover"
                  state="hover-jump-spin"
                  colors="primary:#000000,secondary:#e83a30,tertiary:#109121"
                  style={{"width":"4rem","height":"4rem"}}>
                </lord-icon>
                <p>Your Location:</p>
              </label>
              <input type="text" id="location" name="location" value={form.location} onChange={handleChange} className="text-black bg-white rounded-full h-[40%] w-[100%] pl-5 px-2 focus:outline-green-600 glowLight" placeholder="eg:- Sector-62 Noida | Hauz Khas"/>
            </div>
            <div className="h-[20%] w-[95%] md:w-[80%] flex flex-col justify-center items-start lg:gap-3">
              <label htmlFor="foodItem" className="text-lg lg:text-xl text-white flex flex-row justify-center items-center lg:gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/uxejajwf.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#ffc738,tertiary:#e83a30,quaternary:#109121"
                  style={{"width":"4rem","height":"4rem"}}>
                </lord-icon>
                <p>Food Item:</p>
              </label>
              <input type="text" id="foodItem" name="foodItem" value={form.foodItem} onChange={handleChange} className="text-black bg-white rounded-full h-[40%] w-[100%] pl-5 px-2 focus:outline-green-600 glowLight" placeholder="eg:- cooked rice | salad | fresh fruits"/>
            </div>
            <div className="h-[20%] w-[95%] md:w-[80%] flex flex-col justify-center items-start lg:gap-3">
              <label htmlFor="quantity" className="text-lg lg:text-xl text-white flex flex-row justify-center items-center lg:gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/ukvbhloo.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#fad1e6"
                  style={{"width":"4rem","height":"4rem"}}>
                </lord-icon>
                <p>Quantity: <span className="text-[#adff2f]"> Optional</span></p>
              </label>
              <input type="text" id="quantity" name="quantity" value={form.quantity} onChange={handleChange} className="text-black bg-white rounded-full h-[40%] w-[100%] pl-5 px-2 focus:outline-green-600 glowLight" placeholder="eg:- 1kg | half plate | 10 servings"/>
            </div>
            <div className="h-[10%] w-[100%] mt-2 flex flex-row justify-center items-center">
              <button type="submit" disabled={isButtonDisabled}>
                <Button_colorful text="Find" disabled={isButtonDisabled} tooltip="Please fill Location & Food Item"/>
              </button>
            </div>
          </form>
        </div>

        <div ref={responseRef} className="w-[95%] md:w-[45%] h-[50%] md:h-[90%] bg-black/10 backdrop-blur-sm p-5 rounded-3xl flex justify-center items-center">
          {isLoading ? (
            <div className="text-white text-xl w-[90%] flex flex-col items-center">
              <lord-icon
                src="https://cdn.lordicon.com/hsqdwmgl.json"
                trigger="loop"
                state="loop-position-cross-rotation"
                colors="primary:#ffffff"
                style={{"width":"8rem","height":"8rem"}}>
              </lord-icon>
              <p>Please Wait...</p>
            </div>
          ) : (
            responseMessage && 
            <div className="text-white text-xl w-[95%] h-[95%] p-2 flex justify-center overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              <Output rawMarkdown={responseMessage}/>
            </div>
          )}
        </div>
      </div>

    </div>
    </div>
    </>
  );
}

export default page
