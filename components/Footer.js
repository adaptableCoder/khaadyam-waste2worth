import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-[100%] bg-black text-white flex flex-row justify-center items-center text-me-one p-5">
      <div className='w-[50%] flex flex-col justify-center items-center text-center'>
        <b className="glowGreen">खाद्यम् - waste2worth</b>
        <p>Innovated by <span className="text-[#adff2f]">adaptableCoder</span></p>
        <div className="icons flex justify-center items-center">
          <Link href="https://github.com/adaptableCoder">
            <lord-icon
              src="https://cdn.lordicon.com/ioihllwu.json"
              trigger="hover"
              colors="primary:#16c72e,secondary:#ffffff"
              style={{"width":"3rem","height":"3rem"}}>
            </lord-icon>
          </Link>

          <Link href="https://www.linkedin.com/in/atharv-mehrotra-32a327322">
            <lord-icon
              src="https://cdn.lordicon.com/kpoplnek.json"
              trigger="hover"
              colors="primary:#16c72e,secondary:#ffffff"
              style={{"width":"3rem","height":"3rem"}}>
            </lord-icon>
          </Link>
        </div>
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center text-center">
        <p>No &copy;</p>
        <p>No Terms of Use</p>
        <p>No Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
