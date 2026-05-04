import React from "react";
import { motion } from "motion/react";
import {
  Droplet,
  Heart,
  Activity,
  ArrowRight,
  CalendarHeart,
} from "lucide-react";

const Herosection = () => {
  return (
    <div className="relative overflow-hidden bg-white min-h-[80vh] flex items-center">
      {/* Background decorative pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden focus-mode text-red-50 text-opacity-50 pointer-events-none">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-red-50 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="bg-pattern"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#bg-pattern)"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-24 w-full relative z-10">
        {/* Text Content */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mt-8 flex gap-2 items-center text-red-600 font-semibold tracking-wider uppercase text-sm">
              <Activity className="h-5 w-5" />
              <span>Save Lives Today</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl text-balance">
              Be the reason{" "}
              <span className="text-red-600">someone's heart</span> keeps
              beating.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-lg">
              A single drop of your blood can be the ocean of life for someone
              else. Join thousands of everyday heroes who donate blood and give
              the ultimate gift of life.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#donate"
                className="rounded-full bg-red-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 hover:shadow-red-500/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all flex items-center gap-2"
              >
                Donate Now
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/search-blood"
                className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-2 hover:text-red-600 transition-colors group"
              >
                <CalendarHeart className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors" />
                Find a drive near you
              </a>
            </div>
          </motion.div>
        </div>

        {/* Hero Graphic */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 lg:flex-1 justify-center lg:justify-end items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative pulsing circles */}
            <div className="relative w-72 h-72 sm:w-[30rem] sm:h-[30rem] bg-red-50 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-red-100 opacity-40"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="absolute inset-4 sm:inset-8 rounded-full bg-slate-50 opacity-60 shadow-inner"
              />

              {/* Main Icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 flex flex-col items-center justify-center"
              >
                <Droplet className="w-32 h-32 sm:w-48 sm:h-48 text-red-600 fill-red-500 drop-shadow-xl" />
              </motion.div>

              {/* Floating secondary elements */}
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-1/4 right-8 sm:right-16 bg-white p-3 rounded-full shadow-lg"
              >
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 fill-red-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-1/4 left-8 sm:left-12 bg-white p-4 rounded-xl shadow-lg border border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-xs sm:text-sm font-bold text-slate-700">
                    O+ Needed
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
