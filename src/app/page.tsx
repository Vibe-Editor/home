"use client";
import { useRouter } from "next/navigation";
import { ArrowRight, Play, Menu } from "lucide-react";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full fixed top-0 left-0 bg-[#21252e]/30 backdrop-blur-xl border-b border-[#465266] flex items-center justify-between py-3 px-4 sm:px-8 z-50">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <div 
          onClick={() => router.push("/")}
          className="relative group cursor-pointer"
        >
          <div className="text-xl sm:text-2xl font-normal tracking-wide text-white bg-gradient-to-r from-[#fcc60e] to-[#0097fc] bg-clip-text text-transparent transform transition-transform duration-300 group-hover:scale-105">
            Usuals.ai
          </div>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#fcc60e] to-[#0097fc] transition-all duration-300 group-hover:w-full"></div>
        </div>
        
        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[#636f8a] hover:text-white transition-all duration-300 text-sm font-medium relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fcc60e] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#pricing" className="text-[#636f8a] hover:text-white transition-all duration-300 text-sm font-medium relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0097fc] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="text-[#636f8a] hover:text-white transition-all duration-300 text-sm font-medium relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fcc60e] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Demo Button - Hidden on mobile */}
        <button 
          className="hidden md:flex items-center gap-2 text-[#636f8a] hover:text-white transition-all duration-300 text-sm font-medium group"
        >
          <Play size={16} className="group-hover:text-[#fcc60e] transition-colors duration-300" />
          Watch Demo
        </button>

        {/* Sign Up Button */}
        <button 
          onClick={() => router.push("/signup")}
          className="relative group overflow-hidden bg-gradient-to-r from-[#fcc60e] to-[#0097fc] text-[#13151a] font-medium rounded-full px-6 py-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10 flex items-center gap-2">
            Sign Up
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0097fc] to-[#fcc60e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#636f8a] hover:text-white transition-colors duration-300">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#fcc60e]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0097fc]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#465266]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  );
}

function HomePage() {
  const router = useRouter();
  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: '#13151a' }}
    >
      <AnimatedBackground />
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 min-h-screen relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white mb-6 leading-tight tracking-tight">
              One prompt.<br />
              <span className="bg-gradient-to-r from-[#fcc60e] via-[#0097fc] to-[#fcc60e] bg-clip-text text-transparent animate-pulse">One video.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#636f8a] font-normal mb-12 max-w-3xl mx-auto leading-relaxed">
              Create polished reels, ads, or shorts in minutes<br />
              with AI-powered video generation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => router.push('/signup')}
              className="group bg-gradient-to-r from-[#fcc60e] to-[#0097fc] text-[#13151a] font-medium rounded-full px-8 py-4 hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-lg flex items-center gap-2"
            >
              Start free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              className="text-[#636f8a] hover:text-white font-normal px-8 py-4 rounded-full border border-[#465266] hover:border-[#636f8a] transition-all duration-300 text-lg"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </main>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#" className="text-[#636f8a] hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
          Why Usuals.ai
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}
