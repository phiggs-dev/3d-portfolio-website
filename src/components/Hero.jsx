import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';
import { rotate } from '../assets';
import { isWebGLSupported } from '../utils/webgl';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width:500px)');

    // Set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-y-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[75px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10 pointer-events-none`}> {/*Changed to top-[75px] from top-[120px]*/}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-accent" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-10 w-full min-w-0">
          <div className="flex-1 min-w-0 pointer-events-auto">
          <p className="text-accent text-[12px] sm:text-[14px] font-medium tracking-wider">
            SOFTWARE ENGINEER • ORANGE COUNTY, CA
          </p>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-accent">Scott</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I build interactive systems, AI integrations, <br className="sm:block hidden" />web applications, and video games.
          </p>
          </div>
          <div className="xl:w-[360px] shrink-0 pointer-events-auto" aria-label="Skills and profile links">
            <p className="text-secondary text-[16px] sm:text-[18px] leading-7">
              C++ · C# · Python · TypeScript · React
            </p>
            <p className="text-secondary text-[16px] sm:text-[18px] leading-7 mt-1">
              Unreal Engine · Unity · Wwise
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="#projects"
                className="bg-accent hover:bg-accent/90 text-white font-bold text-[14px] sm:text-[16px] px-5 py-3 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Explore my work
              </a>
              <a
                href="/resume"
                className="bg-tertiary border border-accent hover:bg-[#241841] text-white font-bold text-[14px] sm:text-[16px] px-5 py-3 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                View resume
              </a>
            </div>
            <div className="flex flex-wrap gap-5 mt-6 text-white text-[16px] sm:text-[18px]">
              <a href="https://www.linkedin.com/in/scott-lopez-622bb832/" className="underline underline-offset-4 hover:text-accent">LinkedIn</a>
              <a href="https://github.com/phiggs-dev" className="underline underline-offset-4 hover:text-accent">GitHub</a>
              <a href="mailto:scottnlopez60@gmail.com" className="underline underline-offset-4 hover:text-accent">Email</a>
            </div>
          </div>
        </div>
      </div>

      <ComputersCanvas />

      {/* Scroll Button */}
      <div className={"absolute xs:bottom-10 bottom-24 w-full flex flex-col justify-center items-center"}>
        {/* <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a> */}

        {/* 360-degree Icon or WebGL warning */}
        {webGLSupported ? (
          <img
            src={rotate}
            alt="Rotate"
            attributionsrc="https://www.flaticon.com/free-icons/360-degrees"
            width="60"
            height="60"
          />
        ) : (
          <p className="text-secondary text-sm italic">
            Enable hardware acceleration for the best experience.
          </p>
        )}

        {/* Down Arrow Icon */}
        <a href="#about">
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className={"flex flex-col items-center text-secondary text-3xl cursor-pointer"}
          >
            <FaArrowDown />
            <p className={`${styles.sectionSubText}`}>Click to scroll</p>
          </motion.div>
        </a>
      </div>
    </section>
  )
}

export default Hero
