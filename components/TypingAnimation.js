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

  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              initial={{}}
              key={`char-${index}`}
              className={`opacity-0 hidden text-white ${word.className}`}>{/*animate-pulse*/ }
              {char}
            </motion.span>
          ))}
          &nbsp;
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className={`text-center text-white ${className}`}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={`inline-block rounded-sm w-[4px] bg-white ${cursorClassName}`}
      ></motion.span>
    </div>
  );
};

export default TypewriterEffect;