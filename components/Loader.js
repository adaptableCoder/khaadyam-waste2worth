import React, { useState, useEffect } from 'react'
import TypewriterEffect from './TypingAnimation'

const Loader = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = [
    { text: "Connecting you with kindness..."},
    { text: "Food shouldn't be wasted..."},
    { text: "Your generosity is about to shine..."},
    { text: "Your kindness is loading..."},
    { text: "Every act of giving matters..."},
    { text: "Transforming leftovers into lifelines..."},
    { text: "Every bite counts..."},
    { text: "Making hunger a thing of past..."},
    { text: "Spreading kindness, one meal at a time..."},
    { text: "Small acts, big impact..."},
    { text: "Loading your impact on lives..."},
    { text: "Meals saved, hearts filled..."},
    { text: "Bringing food where it's needed..."},
    { text: "Your generosity fuels change..."},
    { text: "Donating food, spreading love..."},
    { text: "AI is finding nearby help..."},
    { text: "A small act, big change..."},
    { text: "Kindness is always nourishing..."},
    { text: "No meal should go wasted..."},
    { text: "One meal can change everything..."}
  ];

  useEffect(() => {
    const storedIndexes = JSON.parse(localStorage.getItem('usedIndexes')) || [];
    let newIndex;

    if (storedIndexes.length === words.length) {
      localStorage.removeItem('usedIndexes');
      storedIndexes.length = 0; // Reset the stored indexes
    }

    do {
      newIndex = Math.floor(Math.random() * words.length);
    } while (storedIndexes.includes(newIndex));

    storedIndexes.push(newIndex);
    localStorage.setItem('usedIndexes', JSON.stringify(storedIndexes));
    setCurrentWordIndex(newIndex);

    const interval = setInterval(() => {
      if (storedIndexes.length === words.length) {
        localStorage.removeItem('usedIndexes');
        storedIndexes.length = 0; // Reset the stored indexes
      }

      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * words.length);
      } while (storedIndexes.includes(nextIndex));

      storedIndexes.push(nextIndex);
      localStorage.setItem('usedIndexes', JSON.stringify(storedIndexes));
      setCurrentWordIndex(nextIndex);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url('../app/banner.jpg')] bg-cover bg-no-repeat fixed top-0 left-0 z-100">
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-black/30 backdrop-blur-md">
        <div className="h-40 w-40 bg-center bg-no-repeat bg-contain bg-[url('../public/plate-loader.gif')]"></div>
        <div key={currentWordIndex}>
          <TypewriterEffect
            words={[words[currentWordIndex]]}
            className="text-white animate-neon text-2xl sm:text-md md:text-xl lg:text-3xl"
            cursorClassName="bg-white h-4 md:h-4 lg:h-8"
          />
        </div>
      </div>
    </div>
  )
}

export default Loader
