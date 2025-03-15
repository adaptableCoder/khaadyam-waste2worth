"use client"
import React, { useEffect, useState, useRef } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Navbar.css'
import Image from 'next/image'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const buttonRef = useRef(null)
  const currentPath = usePathname()

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const bannerHeight = document.querySelector('.banner')?.offsetHeight || 0
        setScrolled(window.scrollY > bannerHeight)
      }

      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleButtonClick = () => {
    buttonRef.current.querySelector('span').classList.toggle('is-closed')
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <nav className={`h-[8%] w-[95%] md:w-[98%] min-h-[3rem] fixed top-5 md:mr-3 flex flex-row transition-colors duration-500 ${scrolled ? 'bg-black' : 'bg-white/5'} backdrop-blur-md text-white rounded-full ring-2 ring-[#03e154] glow z-50`}>
        <div className="h-[100%] w-[100%] md:w-[50%] py-2 px-5 flex flex-row justify-center items-center">
          <div className="left w-[10%] h-[100%] text-transparent block md:hidden"></div>
          <div className="logo w-[100%] md:w-[80%] h-[100%] flex justify-center items-center">
            <Image src="/logo.png" alt="logo" className="h-[150%] w-auto"/>
            <div className="flex flex-col justify-center items-center">
              <p className="!md:text-5xl !text-2xl kalam">खाद्यम्</p>
              <p className="!md:text-xl !text-sm tracking-[0.25rem] md:tracking-[0.55rem] text-me-one">&nbsp;waste 2 worth</p>
            </div>
          </div>
          <div className="hamburger w-[10%] h-[100%] md:hidden block">
            <button ref={buttonRef} onClick={handleButtonClick} className="button flex justify-center items-center">
              <span className="burger-5 flex justify-center items-center">
                <svg viewBox="0 0 32 32">
                  <path className="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                  <path className="line" d="M7 16 27 16"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="h-[100%] w-[50%] p-5 hidden md:block">
          <ul className="flex flex-row justify-end items-center text-md lg:text-lg h-[100%] gap-8 lg:gap-12 px-5">
              <li className="cursor-pointer hover:text-[#adff2f] lg:hover:text-xl hover:font-semibold transition-colors,text duration-500">
                <Link href="/">                
                    Home
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#adff2f] lg:hover:text-xl hover:font-semibold transition-colors,text duration-500">
                {isClient && (
                  currentPath === '/search' ? (
                    null
                  ) : (
                    <ScrollLink to="about" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
                      About
                    </ScrollLink>
                  )
                )}
              </li>
              <li className="cursor-pointer hover:text-[#adff2f] lg:hover:text-xl hover:font-semibold transition-colors,text duration-500">
                {isClient && (
                  currentPath === '/search' ? (
                    null
                  ) : (
                    <ScrollLink to="demo" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
                      How to use
                    </ScrollLink>
                  )
                )}
              </li>
              <li className="cursor-pointer hover:text-[#adff2f] lg:hover:text-xl hover:font-semibold transition-colors,text duration-500">
                {isClient && (
                  currentPath === '/search' ? (
                    null
                  ) : (
                    <ScrollLink to="features" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
                      Features
                    </ScrollLink>
                  )
                )}
              </li>
              <li className="cursor-pointer hover:text-[#adff2f] lg:hover:text-xl hover:font-semibold transition-colors,text duration-500">
                {isClient && (
                  currentPath === '/search' ? (
                    null
                  ) : (
                    <ScrollLink to="best_practices" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
                      More
                    </ScrollLink>
                  )
                )}
              </li>
          </ul>
        </div>
      </nav>

      <div className={`fixed top-0 left-0 h-full w-[75%] bg-black text-white transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-75 flex flex-col justify-center`}>
        <ul className="flex flex-col justify-center items-start text-lg h-[80%] gap-12 p-5">
          <li className="cursor-pointer hover:text-[#adff2f] hover:text-xl hover:font-semibold transition-colors,text duration-500">
            <Link href="/" onClick={handleButtonClick}>                
                Home
            </Link>
          </li>
          <li className="cursor-pointer hover:text-[#adff2f] hover:text-xl hover:font-semibold transition-colors,text duration-500">
            {isClient && (
              currentPath === '/search' ? (
                null
              ) : (
                <ScrollLink to="about" smooth={true} duration={500} offset={-window.innerHeight / 2 +200} onClick={handleButtonClick}>
                  About
                </ScrollLink>
              )
            )}
          </li>
          <li className="cursor-pointer hover:text-[#adff2f] hover:text-xl hover:font-semibold transition-colors,text duration-500">
            {isClient && (
              currentPath === '/search' ? (
                null
              ) : (
                <ScrollLink to="demo" smooth={true} duration={500} offset={-window.innerHeight / 2 +200} onClick={handleButtonClick}>
                  How to use
                </ScrollLink>
              )
            )}
          </li>
          <li className="cursor-pointer hover:text-[#adff2f] hover:text-xl hover:font-semibold transition-colors,text duration-500">
            {isClient && (
              currentPath === '/search' ? (
                null
              ) : (
                <ScrollLink to="features" smooth={true} duration={500} offset={-window.innerHeight / 2 +200} onClick={handleButtonClick}>
                  Features
                </ScrollLink>
              )
            )}
          </li>
          <li className="cursor-pointer hover:text-[#adff2f] hover:text-xl hover:font-semibold transition-colors,text duration-500">
            {isClient && (
              currentPath === '/search' ? (
                null
              ) : (
                <ScrollLink to="best_practices" smooth={true} duration={500} offset={-window.innerHeight / 2 +200} onClick={handleButtonClick}>
                  More
                </ScrollLink>
              )
            )}
          </li>
        </ul>

        <div className="text-lg text-white h-[20%] w-[98%] flex flex-col justify-center items-center">
          <p>Created with</p>
          <p className="flex justify-center items-center"><lord-icon
              src="https://cdn.lordicon.com/altuciqs.json"
              trigger="hover"
              style={{"width":"2rem","height":"2rem"}}>
          </lord-icon>by &nbsp;</p>
          <span className="text-[#adff2f] font-semibold">adaptableCoder</span>
        </div>
      </div>
    </>
  )
}

export default Navbar
