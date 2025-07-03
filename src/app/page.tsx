"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "motion/react"

function Navbar() {
  const router = useRouter()

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full fixed top-0 left-0 bg-[#21252e]/30 backdrop-blur-xl border-b border-[#495266] flex items-center justify-between py-3 px-4 sm:px-8 z-50"
    >
      <div className="flex items-center gap-12">
        {/* Logo */}
        <motion.div
          onClick={() => router.push("/")}
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="text-xl sm:text-2xl font-normal tracking-wide text-[#fcc60e]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Usuals.ai
          </motion.div>
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-[#fcc60e]"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {/* Demo Button - Hidden on mobile */}
        <motion.button
          className="hidden md:flex items-center gap-2 text-[#636f8a] hover:text-white transition-all duration-300 text-sm font-medium group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Play size={16} className="group-hover:text-[#fcc60e] transition-colors duration-300" />
          </motion.div>
          Watch Demo
        </motion.button>

        {/* Sign Up Button */}
        <motion.button
          onClick={() => router.push("/signup")}
          className="relative group overflow-hidden bg-[#0097fc] text-white font-medium rounded-full px-6 py-2 shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 151, 252, 0.4), 0 10px 10px -5px rgba(0, 151, 252, 0.04)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Sign Up
            <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <ArrowRight size={16} />
            </motion.div>
          </span>
        </motion.button>
      </motion.div>
    </motion.nav>
  )
}

function AnimatedBackground() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -25])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dot Background Pattern */}
      <motion.div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
        animate={{
          backgroundPosition: ["0px 0px", "20px 20px"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Radial gradient mask for faded look */}
      <div className="absolute inset-0 bg-[#13151a] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Existing animated elements with parallax */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-[#fcc60e]/10 rounded-full blur-3xl"
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0097fc]/10 rounded-full blur-3xl"
        style={{ y: y2 }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#495266]/5 rounded-full blur-3xl"
        style={{ y: y3 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  )
}

function HomePage() {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#13151a" }}>
      <AnimatedBackground />

      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 min-h-screen relative z-10">
        <motion.div className="max-w-5xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="mb-8">
            <motion.h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white mb-6 leading-tight tracking-tight">
              <motion.div
                className="mb-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.5,
                    },
                  },
                }}
              >
                {"One prompt.".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 12,
                        },
                      },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="text-[#fcc60e]"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 1.1, // Start after "One prompt." finishes
                    },
                  },
                }}
              >
                {"One video.".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 12,
                        },
                      },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-[#636f8a] font-normal mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Create polished reels, ads, or shorts in minutes
              <br />
              with AI-powered video generation.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => router.push("/signup")}
              className="group bg-[#fcc60e] text-[#13151a] font-medium rounded-full px-8 py-4 shadow-lg text-lg flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(252, 198, 14, 0.4), 0 10px 10px -5px rgba(252, 198, 14, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Start free
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>
            <motion.button
              className="text-[#636f8a] hover:text-white font-normal px-8 py-4 rounded-full border border-[#495266] hover:border-[#0097fc] transition-all duration-300 text-lg"
              whileHover={{
                scale: 1.05,
                borderColor: "#0097fc",
                color: "#ffffff",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.a
          href="#"
          className="text-[#636f8a] hover:text-[#fcc60e] transition-colors duration-300 text-sm flex items-center gap-2 group"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Why Usuals.ai
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <ArrowRight size={16} />
          </motion.div>
        </motion.a>
      </motion.div>
    </div>
  )
}

export default function Page() {
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  )
}
