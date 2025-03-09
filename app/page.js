"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/compat/router'
import Loader from '../components/Loader'
import Button_arrows from '../components/Button_arrows'
import Button_colorful from '../components/Button_colorful'
import TypewriterEffect from '@/components/TypingAnimation'
import Link from 'next/link'

export default function Home() {
  const [Loading, setLoading] = useState(true)
  const [WordIndex, setWordIndex] = useState(0)
  const router = useRouter()
  
  const words = [
    { text: "Feed People In Need"},
    { text: "Find Food Donation Sites Near You"},
    { text: "Donating Made Simpler With AI"},
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [])

  useEffect(() => {
    if (!router) return

    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 12000) // Change word every 4 seconds
    return () => clearInterval(interval)
  }, [])

  return Loading ? <Loader/> : (
    <>
      <div className="banner w-[100%] h-[100vh] bg-cover bg-center bg-[url('./banner.jpg')]">
        <div className="overlay h-[100%] w-[100%] bg-black/40 flex flex-col justify-center items-center">
          <div className="h-[40%] w-[20%] bg-contain bg-no-repeat bg-[url('../public/veggie.gif')]"></div>
          <div className="h-[15%] w-[100%] flex justify-center items-end" key={WordIndex}>
            <TypewriterEffect 
              words={[words[WordIndex]]}
              className="text-white text-8xl glowGreen"
              cursorClassName="bg-white h-16" 
            />
          </div>
          <div className="h-[10%] w-[100%] text-white text-2xl flex justify-center items-center custom-pulse">No tech skills needed - discover nearby donation centers and donate in minutes.</div>

          <div className="h-[10%] w-[100%] flex flex-row justify-center items-center gap-5">
            <Button_colorful text="Know More"/>
            <Link href="/search"><Button_arrows text="Donate Now"/></Link>
          </div>
        </div>
      </div>

      <div className="w-[100%] h-[100vh]">
        Other content
      </div>
    </>
  )
}
