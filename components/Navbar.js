"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.querySelector('.banner')?.offsetHeight || 0
      setScrolled(window.scrollY > bannerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`h-[8%] w-[98%] fixed top-5 mr-5 flex flex-row transition-colors duration-500 ${scrolled ? 'bg-black' : 'bg-white/5'} backdrop-blur-md text-white rounded-full ring-2 ring-[#03e154] shadow-glow`}>
      <div className="h-[100%] w-[50%]">
        Khaadyam
        Waste2Worth
      </div>

      <div className="h-[100%] w-[50%] p-5">
        <ul className="flex flex-row justify-end items-center text-lg h-[100%] gap-12 px-5">
            <li className="cursor-pointer hover:text-[#adff2f] hover:text-xl hover:font-semibold transition-colors,text duration-500">
              <Link href="/">                
                  Home
              </Link>
            </li>
            <li className="cursor-pointer hover:text-[#adff2f] hover:text-xl hover:font-semibold transition-colors,text duration-500">
              <Link href="/about">
                  About
              </Link>
            </li>
            <li className="cursor-pointer hover:text-[#adff2f] hover:text-xl hover:font-semibold transition-colors,text duration-500">
              <Link href="/demo">
                  How to use
              </Link>
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
