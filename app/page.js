"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/compat/router'
import Loader from '../components/Loader'
import Button_arrows from '../components/Button_arrows'
import Button_colorful from '../components/Button_colorful'
import TypewriterEffect from '@/components/TypingAnimation'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'
import Card from '../components/Card'
import Image from 'next/image'

export default function Home() {
  const [Loading, setLoading] = useState(true)
  const [WordIndex, setWordIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)
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

  return Loading ? <Loader/> : (
    <> 
      <div className="banner w-[100%] h-[100vh] bg-cover bg-center bg-[url('./banner.jpg')]" id="home">
        <div className="overlay h-[100%] w-[100%] bg-black/40 flex flex-col justify-center items-center">
          <Image src="/veggie.gif" alt="veggie" width={80} height={80} className="h-[20%] lg:h-[40%] w-auto max-w-[40%]"/>
          <div className="md:h-[10%] lg:h-[15%] w-[85%] flex justify-center items-end" key={WordIndex}>
            <TypewriterEffect 
              words={[words[WordIndex]]}
              className="text-white text-3xl sm:text-4xl lg:text-6xl xl:text-7xl glowGreen"
              cursorClassName="bg-white h-8 md:h-16" 
            />
          </div>
          <div className="h-[10%] w-[90%] text-white text-lg md:text-xl lg:text-2xl text-center custom-pulse">No tech skills needed - discover nearby donation centers and donate in minutes.</div>

          <div className="h-[10%] w-[100%] flex flex-row justify-center items-center gap-5">
          {isClient && (
            <ScrollLink to="about" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
              <Button_colorful text="Know More"/>
            </ScrollLink>)}
            <Link href="/search"><Button_arrows text="Donate Now"/></Link>
          </div>
        </div>
      </div>

      <div className="w-[100%] h-auto min-h-[60vh] flex justify-center items-center" id="about">
        <div className="md:w-[20%] h-[100%]"></div>
        <div className="md:w-[60%] w-[98%] h-[100%] p-5 flex flex-col justify-center items-center text-me-one">
          <div className="w-[100%] text-center text-[2.5rem] font-bold text-[#008000] glowGreen">About खाद्यम्</div>
          <div className="w-[100%] text-center text-lg tracking-[0.75rem] font-bold mb-5 text-[#008000]">waste2worth</div>
          <div className="text-lg md:text-3xl text-center font-bold my-2">Turning Surplus Food into a Lifeline</div>
          <div className="text-md md:text-2xl text-center mb-2">Every day, thousands of meals go to waste while millions struggle with hunger. <span className="font-bold text-[#008000] glowGreen">खाद्यम् - waste2worth</span> bridges this gap by enabling seamless food redistribution, ensuring no meal goes to waste.</div>
          <div className="text-lg md:text-3xl text-center font-bold my-2">Join the Movement!</div>
          <div className="text-md md:text-2xl text-center">Contribute to a world where food is valued, not wasted. Start donating today!</div>
          <div className="text-md md:text-2xl text-center font-semibold">📍 Find a nearby recipient | 📦 Donate surplus food | 💖 Make an impact</div>
          {isClient && (
          <ScrollLink to="demo" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
            <lord-icon
              src="https://cdn.lordicon.com/xcrjfuzb.json"
              trigger="hover"
              state="hover-arrow-down-2"
              colors="primary:#0a5c15"
              style={{"width":"5rem","height":"5rem"}}
              className="my-5">
            </lord-icon>
          </ScrollLink>)}
        </div>
        <div className="md:w-[20%] h-[100%]"></div>
      </div>

      <div className="w-[100%] h-auto min-h-[90vh] bg-[#008000] flex justify-center items-center text-me-one" id="demo">
        <div className="w-[98%] lg:w-[60%] h-[100%] p-5 flex flex-col justify-center items-center">
          <div className="w-[100%] text-center text-[2.5rem] font-bold text-white glowGreen mb-5">How to Use</div>
          <table className="w-[100%] text-white bg-black/30 rounded-3xl text-xl">
            <tbody>
              <tr>
                <td className="text-center p-5">
                  <lord-icon
                    src="https://cdn.lordicon.com/fxegvwqf.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#16c72e"
                    style={{"width":"6rem","height":"6rem"}}>
                  </lord-icon>
                </td>
                <td className="p-5 m-2">
                  <p className="text-2xl font-bold mb-2 glowGreen">Input Details 📝</p>
                  <p>Provide basic information about the food you wish to donate:</p>
                  <ul className="list-disc list-inside">
                    <li><b>Food Item:</b> Specify the type of food (e.g., fruits, vegetables, cooked meals).</li>
                    <li><b>Quantity (Optional):</b> Approximate the amount of food available.</li>
                    <li><b>Location:</b> Share your current location to help find nearby recipients efficiently.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="w-[10%] sm:w-[20%] text-center p-5">
                  <lord-icon
                    src="https://cdn.lordicon.com/fguukmsf.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#16c72e"
                    style={{"width":"6rem","height":"6rem"}}>
                  </lord-icon>
                </td>
                <td className="w-[90%] sm:w-[80%] p-5 m-2">
                  <p className="text-2xl font-bold mb-2 glowGreen">Get Recommendations 🔍</p>
                  <p>Based on the provided details, AI will:</p>
                  <ul className="list-disc list-inside">
                    <li><b>Classify the Food:</b> Identify whether it’s perishable or non-perishable.</li>
                    <li><b>Prioritize Urgency:</b> Highlight the need for quick action with perishable items.</li>
                    <li><b>Suggest Recipients:</b> List local organizations, NGOs, or shelters that can accept your donation.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="text-center p-5">
                  <lord-icon
                    src="https://cdn.lordicon.com/yxanxejp.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#16c72e"
                    style={{"width":"6rem","height":"6rem"}}>
                  </lord-icon>
                </td>
                <td className="p-5 m-2">
                  <p className="text-2xl font-bold mb-2 glowGreen">Take Action ✅</p>
                  <p>Choose an option from the recommendations and reach out to the organization. Follow provided instructions to ensure safe and hygienic delivery of your food donation.</p>
                </td>
              </tr>
            </tbody>
          </table>
          {isClient && (
          <ScrollLink to="features" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
            <lord-icon
              src="https://cdn.lordicon.com/xcrjfuzb.json"
              trigger="hover"
              state="hover-arrow-down-2"
              colors="primary:#fff"
              style={{"width":"5rem","height":"5rem"}}
              className="mt-5">
            </lord-icon>
          </ScrollLink>)}
        </div>
      </div>

      <div className="w-[100%] h-auto min-h-[80vh] flex justify-center items-center text-me-one" id="features">
        <div className="lg:w-[70%] w-[98%] h-[100%] p-5 flex flex-col justify-center items-center">
          <div className="w-[100%] text-center text-[2.5rem] mb-8 font-bold text-[#008000] glowGreen">What Makes खाद्यम् Special?</div>
          <div className="w-[100%] flex flex-col sm:flex-row justify-center items-center gap-12">
            <Card heading="Impact Metrics" content="See the tangible results of your donation, such as the   environmental impact (e.g., CO2 savings from reduced food waste)." icon_code="uwinmnkh"/>
            <Card heading="Best Practices" content="Receive practical tips for safe and hygienic food donation." icon_code="ddvangig"/>
            <Card heading="Community Engagement" content="Inspire others by sharing your efforts and collaborating with local networks." icon_code="npyvlwic"/>
          </div>
          {isClient && (
          <ScrollLink to="best_practices" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
            <lord-icon
              src="https://cdn.lordicon.com/xcrjfuzb.json"
              trigger="hover"
              state="hover-arrow-down-2"
              colors="primary:#0a5c15"
              style={{"width":"5rem","height":"5rem"}}
              className="my-5">
            </lord-icon>
          </ScrollLink>)}
        </div>
      </div>

      <div className="w-[100%] h-auto min-h-[80vh] bg-[#008000] flex justify-center items-center text-me-one" id="best_practices">
        <div className="lg:w-[40%] w-[98%] h-[100%] p-5 flex flex-col justify-center items-center">
          <div className="w-[100%] text-center text-[2.5rem] font-bold text-white glowGreen mb-8">Best Practices for Food Donation</div>
          <table className="w-[100%] rounded-3xl bg-black/30 text-white text-xl">
            <tbody>
              <tr>
                <td className="text-center p-5 sm:p-10">
                  <p className='font-bold text-2xl'>✅ Quality First:</p>
                  <p>Ensure the food is fresh, safe, and fit for consumption. Avoid donating spoiled or expired items.</p>
                </td>

                <td className="text-center p-5 sm:p-10">
                  <p className='font-bold text-2xl'>📦 Proper Packaging:</p>
                  <p>Use clean, sealed containers for cooked food and sturdy bags for dry or raw items.</p>
                </td>
              </tr>
              <tr>
                <td className="text-center p-5 sm:p-10">
                  <p className='font-bold text-2xl'>🕒 Timely Delivery:</p>
                  <p>Deliver perishable items promptly to maintain freshness and avoid waste.</p>
                </td>
                <td className="text-center p-5 sm:p-10">
                  <p className='font-bold text-2xl'>🧼 Hygiene Matters:</p>
                  <p>Handle food with clean hands and ensure cleanliness throughout the process.</p>
                </td>
              </tr>
            </tbody>
          </table>
          {isClient && (
          <ScrollLink to="contribution" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
            <lord-icon
              src="https://cdn.lordicon.com/xcrjfuzb.json"
              trigger="hover"
              state="hover-arrow-down-2"
              colors="primary:#fff"
              style={{"width":"5rem","height":"5rem"}}
              className="mt-5">
            </lord-icon>
          </ScrollLink>)}
        </div>
      </div>

      <div className="w-[100%] h-auto min-h-[50vh] flex justify-center items-center text-me-one" id="contribution">
        <div className="lg:w-[60%] w-[98%] h-[100%] p-5 flex flex-col justify-center items-center">
          <div className="w-[100%] text-center text-[2.5rem] mb-8 font-bold text-[#008000] glowGreen">Why Your Contribution Matters</div>
          <div className="text-2xl my-3 text-center">Every donation you make creates a ripple effect:</div>
          <ul className="text-xl text-center">
            <li><b>🍽️ Meals Provided:</b> Transform surplus food into nourishing meals for those in need.</li>
            <li><b>🌍 Environmental Impact:</b> Reduce food waste and its associated greenhouse gas emissions.</li>
            <li><b>🤝 Community Building:</b> Strengthen local communities through acts of kindness and generosity.</li>
          </ul>
          {isClient && (
          <ScrollLink to="spread_word" smooth={true} duration={500} offset={-window.innerHeight / 2 +200}>
            <lord-icon
              src="https://cdn.lordicon.com/xcrjfuzb.json"
              trigger="hover"
              state="hover-arrow-down-2"
              colors="primary:#0a5c15"
              style={{"width":"5rem","height":"5rem"}}
              className="my-5">
            </lord-icon>
          </ScrollLink>)}
        </div>
      </div>

      <div className="w-[100%] h-auto min-h-[50vh] flex justify-center items-center bg-[#008000] text-me-one" id="spread_word">
        <div className="w-[98%] lg:w-[60%] h-[100%] p-5 flex flex-col justify-center items-center text-white">
          <div className="w-[100%] text-center text-[2.5rem] font-bold glowGreen mb-8">Spread the Word</div>
          <div className="text-center text-xl sm:text-2xl my-3">Your efforts inspire others! Share your donation journey on social media with hashtags like:</div>
          <div className="flex justify-center items-center">
            <lord-icon
              src="https://cdn.lordicon.com/epjwszin.json"
              trigger="hover"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
            <ul className="text-lg sm:text-3xl text-center glowGreen">
              <li>#StopFoodWastage</li>
              <li>#FoodForAll</li>
              <li>#KhaadyamWaste2Worth</li>
              <li>#EndHunger</li>
              <li>#KindnessInAction</li>
              <li>#ReduceSuffering</li>
            </ul>
            <lord-icon
              src="https://cdn.lordicon.com/asvcsxrm.json"
              trigger="hover"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
          </div>
        </div>
      </div>
    </>
  )
}
