import React from "react"; // Added import statement
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

const TypewriterEffect = ({ words, className, cursorClassName }) => {
  // Split text into an array of characters, preserving spaces
  const wordsArray = words.map((word) => {
    const textArray = [];
    for (let char of word.text) {
      if (char === " ") {
        textArray.push("\u00A0"); // Use non-breaking space to preserve spaces
      } else {
        textArray.push(char);
      }
    }
    return {
      ...word,
      text: textArray,
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    let spaceCount = 0;
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => {
              if (char === "\u00A0") spaceCount++;
              const spanElement = (
                <motion.span
                  initial={{}}
                  key={`char-${idx}-${index}`} // Updated key to be unique
                  className={`opacity-0 hidden text-white ${word.className}`}>{char}
                </motion.span>
              );
              if (spaceCount >= 3) {
                spaceCount = 0;
                return (
                  <React.Fragment key={`fragment-${idx}-${index}`}>{/* Added unique key */}
                    {spanElement}
                    <br className="block md:hidden" />
                  </React.Fragment>
                );
              }
              return spanElement;
            })}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={`text-center text-white ${className}`}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, repeat: Infinity, repeatType: "reverse" }}
        className={`inline-block rounded-sm w-[4px] bg-white ${cursorClassName}`}
      ></motion.span>
    </div>
  );
};

export default TypewriterEffect;