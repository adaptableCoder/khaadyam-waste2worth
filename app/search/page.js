"use client"
import React from 'react'
import { useState } from 'react'

const page = () => {
  const [form, setForm] = useState({location: '', quantity: '', foodItem: ''})
  const [responseMessage, setResponseMessage] = useState('')
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/data', {
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
  }
  return (
    <>
    <div className="banner w-[100%] h-[90vh] bg-cover bg-center bg-[url('./banner.jpg')]">
    <div className="overlay h-[100%] w-[100%] bg-black/40 flex flex-col justify-center items-center">
      <div className="BlankSpace h-[10%] w-[100%]"></div>

      <div className="h-[90%] w-[100%] flex flex-row justify-center items-center gap-5">
        <div className="w-[45%] h-[90%] bg-white/20 backdrop-blur-md p-5 rounded-3xl">
          <form method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" name="location" value={form.location} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input type="text" id="quantity" name="quantity" value={form.quantity} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="foodItem">Food Item:</label>
              <input type="text" id="foodItem" name="foodItem" value={form.foodItem} onChange={handleChange}/>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>

        <div className="w-[45%] h-[90%] bg-white/20 backdrop-blur-md p-5 rounded-3xl overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {responseMessage && <div>{responseMessage}</div>}
        </div>
      </div>

    </div>
    </div>
    </>
  );
}

export default page
