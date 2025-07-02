"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full fixed top-0 left-0 bg-black/30 backdrop-blur-xl border-b border-white/10 flex items-center justify-between py-4 px-4 sm:px-8 z-50">
      <div className="text-xl sm:text-2xl font-light tracking-wide text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer" onClick={() => router.push("/")}>Usuals.ai</div>
      <button 
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full px-6 py-2 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" 
        onClick={() => router.push("/signup")}
      >
        Sign Up
      </button>
    </nav>
  );
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  );
}

function HomePage() {
  const router = useRouter();
  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a2332 0%, #0f1419 50%, #0a0d11 100%)' }}
    >
      <AnimatedBackground />
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 min-h-screen relative z-10 ">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight tracking-tight">
              One prompt.<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">One video.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-normal mb-12 max-w-3xl mx-auto leading-relaxed">
              Create polished reels, ads, or shorts in minutes with AI-powered video generation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => router.push('/signup')}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full px-8 py-4 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-lg flex items-center gap-2"
            >
              Start free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              className="text-white/80 hover:text-white font-medium px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 text-lg"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </main>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
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
