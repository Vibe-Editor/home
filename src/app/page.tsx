"use client"

import type React from "react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { helioConfig } from "@/lib/helio-config"
import Image from "next/image"

function Navbar() {
  const router = useRouter()

  return (
    <nav className="w-full fixed top-0 left-0 flex items-center justify-between py-4 px-4 sm:px-8 z-50">
      <div
        className="text-xl sm:text-2xl font-normal tracking-wide text-[#fcc60e] cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src='./image.png' className="w-28 h-28 object-contain inline-block align-middle ml-72" />
      </div>
    </nav>
  )
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#fcc60e]/5 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0097fc]/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#495266]/3 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>
    </div>
  )
}

type IconInputProps = {
  icon: React.ReactNode
  type: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
}

function IconInput({ icon, ...props }: IconInputProps) {
  return (
    <div className="relative w-full mb-6">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#636f8a] text-lg opacity-80 z-10">{icon}</span>
      <input
        {...props}
        className={`pl-12 pr-4 py-4 w-full rounded-2xl border border-[#495266] bg-[#21252e]/50 backdrop-blur-sm text-white placeholder-[#636f8a] font-normal focus:outline-none focus:ring-2 focus:ring-[#0097fc]/50 focus:border-[#0097fc]/50 transition-all duration-300 ${props.className || ""}`}
      />
    </div>
  )
}

type IconSelectProps = {
  icon: React.ReactNode
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  className?: string
  children: React.ReactNode
}

function IconSelect({ icon, children, ...props }: IconSelectProps) {
  return (
    <div className="relative w-full mb-6">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#636f8a] text-lg opacity-80 z-10">{icon}</span>
      <select
        {...props}
        className={`pl-12 pr-10 py-4 w-full rounded-2xl border border-[#495266] bg-[#21252e]/50 backdrop-blur-sm text-white font-normal focus:outline-none focus:ring-2 focus:ring-[#0097fc]/50 focus:border-[#0097fc]/50 transition-all duration-300 appearance-none cursor-pointer ${props.className || ""}`}
      >
        {children}
      </select>
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#636f8a] pointer-events-none text-sm">▼</span>
    </div>
  )
}

export default function PreOrderPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    useCase: "",
    teamSize: "",
    role: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [animating, setAnimating] = useState(false)
  // Invitation code flow removed – directly show pre-order form
  const [showInvitationForm, setShowInvitationForm] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContinue = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email) return

    setAnimating(true)
    setTimeout(() => {
      setStep(2)
      setAnimating(false)
    }, 400)
  }

  const handleStripe = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    // Redirect to pricing page
    window.location.href = '/pricing';
  };

  const handleCrypto = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.useCase || !formData.teamSize || !formData.role) return

    setIsSubmitting(true)
    
    // Save form data to localStorage with status false
    const formToStore = { ...formData, status: false }
    localStorage.setItem("registrationFormData", JSON.stringify(formToStore))
    
    // Submit to Google Form immediately with status false
    const formDataToSend = new FormData();
    formDataToSend.append("entry.1885883987", formData.fullName);
    formDataToSend.append("entry.1234487408", formData.email);
    formDataToSend.append("entry.755360426", formData.useCase);
    formDataToSend.append("entry.803028115", formData.teamSize);
    formDataToSend.append("entry.1737138215", formData.role);
    formDataToSend.append("entry.879932707", "False"); // Status False initially
    
    // Submit to Google Form (no-cors mode)
    await fetch("https://docs.google.com/forms/d/17qO2Uci4vrbiDXp-ngLUyHE7OC_KpfVYvxDrtLJa01o/formResponse", {
      method: "POST",
      body: formDataToSend,
      mode: "no-cors",
    });
    
    window.location.href = helioConfig.paymentUrl
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden bg-[#13151a]">
        {/* Dotted Background */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#13151a] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <AnimatedBackground />

        {/* Main Content */}
        <div className="w-full min-h-screen flex items-center justify-center pt-20 pb-8 px-4 relative z-10 flex-row mx-0 mb-px">
          <div className="max-w-5xl w-full relative">
            {/* Mobile Background Cards - Individual for each card */}
            {/* <div className="lg:hidden"> */}
              {/* First card background */}
              {/* <div className="absolute top-10 left-3 right-3 h-[508px] bg-[#1F1F1E]/20 backdrop-blur-2xl border border-[#495266]/30 rounded-3xl transform scale-[1.02] -z-10"></div> */}
              {/* Second card background */}
              {/* <div className="absolute top-[605px] left-3 right-3 h-[508px] bg-[#1F1F1E]/20 backdrop-blur-2xl border border-[#495266]/30 rounded-3xl transform scale-[1.02] -z-10"></div> */}
            {/* </div> */}

            {/* Desktop Background Cards */}
            {/* Left background card */}
            {/* <div className="hidden w-[400px] lg:block absolute top-2 bottom-2  right-1/2 bg-[#1F1F1E]/20 backdrop-blur-2xl border border-[#495266]/30 rounded-3xl transform scale-105 -z-10 ml-[9px] mr-[15px] mt-[39px] mb-[29px]"></div> */}
            {/* Right background card */}
            {/* <div className="hidden lg:block absolute top-2 bottom-2 right-2 left-1/2 bg-[#1F1F1E]/20 backdrop-blur-2xl border border-[#495266]/30 rounded-3xl transform scale-105 -z-10 mr-[90px] ml-[15px] mt-[39px] mb-[29px]">
            
            </div> */}

            {/* Main Cards Container with responsive spacing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 p-4 justify-center items-start">
              {/* Left Card - Video with Overlay */}
              <div className="bg-gradient-to-br w-[404px] rounded-2xl overflow-hidden relative h-[500px] shadow-2xl mt-[26px] mb-[17px] mx-auto">
                <img 
                  src="/vid.gif" 
                  alt="Background animation"
                  className="w-full h-full object-cover"
                />
                {/* Golden Gate Bridge Style Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32  to-transparent"></div>
                <div className="absolute top-10 left-10 right-10 h-40 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-3xl"></div>

                {/* Overlay Content - Bottom Center */}
                <div className="absolute w-[300px] inset-0 flex items-end justify-center mr-[-4px] ml-[10px] md:ml-[50px] pb-8">
                  <div className="text-white text-center w-full">
                    {/* <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-3xl font-bold tracking-wide">Usuals.ai</span>
                    </div> */}
                    <h2 className="mr-3 text-xl font-thin mb-2 tracking-tight">An AI video editor that turns your prompt into finished videos.</h2>
                  </div>
                </div>
              </div>

              {/* Right Card - Invitation Form */}
              <div className="bg-gradient-to-b from-[#1F1F1E]/80 via-[#1F1F1E]/80 via-[#1F1F1E]/60 to-[#0a0a0a] backdrop-blur-xl border border-[#495266] rounded-2xl p-4 shadow-2xl h-[500px] flex flex-col px-4 py-4 mt-[26px] mb-[17px] w-[404px] mx-auto">
                {/* Pre-order form */}
                <div className="flex-1 flex flex-col">
                    {/* Step Progress Indicator */}
                    <div className="flex justify-center mb-6">
                      <div className="flex gap-2">
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            step >= 1 ? "bg-[#fcc60e]" : "bg-[#495266]"
                          }`}
                        />
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            step >= 2 ? "bg-[#fcc60e]" : "bg-[#495266]"
                          }`}
                        />
                      </div>
                    </div>
                    <p className="text-center text-xs text-[#636f8a] mb-6">Step {step} of 2</p>

                    {step === 1 && (
                      <div
                        className={`transition-all duration-400 ${
                          !animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                        }`}
                      >
                        <div className="mb-4">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#495266] bg-[#13151a]/50 text-white placeholder-[#636f8a] focus:outline-none focus:ring-2 focus:ring-[#fcc60e]/50 focus:border-[#fcc60e]/50 transition-all duration-300"
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#495266] bg-[#13151a]/50 text-white placeholder-[#636f8a] focus:outline-none focus:ring-2 focus:ring-[#fcc60e]/50 focus:border-[#fcc60e]/50 transition-all duration-300"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          className="w-full bg-[#fcc60e] text-[#13151a] font-medium rounded-xl px-6 py-3 hover:bg-[#e6b30d] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          disabled={!formData.fullName || !formData.email || isSubmitting}
                          onClick={handleContinue}
                        >
                          Continue
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div
                        className={`transition-all duration-400 ${
                          !animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                        }`}
                      >
                        <div className="mb-2">
                          <select
                            value={formData.useCase}
                            onChange={(e) => handleInputChange("useCase", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#495266] bg-[#13151a]/50 text-white focus:outline-none focus:ring-2 focus:ring-[#fcc60e]/50 focus:border-[#fcc60e]/50 transition-all duration-300 appearance-none cursor-pointer"
                            required
                          >
                            <option value="" disabled>
                              Select Use Case
                            </option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="School">School</option>
                            <option value="Agency">Agency</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="mb-2">
                          <select
                            value={formData.teamSize}
                            onChange={(e) => handleInputChange("teamSize", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#495266] bg-[#13151a]/50 text-white focus:outline-none focus:ring-2 focus:ring-[#fcc60e]/50 focus:border-[#fcc60e]/50 transition-all duration-300 appearance-none cursor-pointer"
                            required
                          >
                            <option value="" disabled>
                              Select Team Size
                            </option>
                            <option value="Just me">Just me</option>
                            <option value="2-9">2-9 people</option>
                            <option value="10-49">10-49 people</option>
                            <option value="50-199">50-199 people</option>
                            <option value="200-499">200-499 people</option>
                            <option value="500-999">500-999 people</option>
                            <option value="1000+">1000+ people</option>
                          </select>
                        </div>
                        <div className="mb-1">
                          <select
                            value={formData.role}
                            onChange={(e) => handleInputChange("role", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#495266] bg-[#13151a]/50 text-white focus:outline-none focus:ring-2 focus:ring-[#fcc60e]/50 focus:border-[#fcc60e]/50 transition-all duration-300 appearance-none cursor-pointer"
                            required
                          >
                            <option value="" disabled>
                              Select Your Role
                            </option>
                            <option value="Marketer">Marketer</option>
                            <option value="Business Owner">Business Owner</option>
                            <option value="Creative Director">Creative Director</option>
                            <option value="Digital Marketing Agency">Digital Marketing Agency</option>
                            <option value="Content Creator">Content Creator</option>
                            <option value="Developer">Developer</option>
                            <option value="Student">Student</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            className="flex-1 bg-[#0097fc] text-white mt-2 md:mb-2 font-medium rounded-xl px-6 py-3 hover:bg-[#0080d6] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            disabled={
                              isSubmitting ||
                              !formData.fullName ||
                              !formData.email ||
                              !formData.useCase ||
                              !formData.teamSize ||
                              !formData.role
                            }
                            onClick={handleStripe}
                          >
                            {isSubmitting ? "Redirecting..." : "Pay with Stripe"}
                          </button>
                          {/* <button
                            type="button"
                            className="flex-1 bg-[#fcc60e] text-black mt-2 md:mb-2 font-medium rounded-xl px-4 md:py-2  hover:bg-[#e6b30d] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            disabled={
                              isSubmitting ||
                              !formData.fullName ||
                              !formData.email ||
                              !formData.useCase ||
                              !formData.teamSize ||
                              !formData.role
                            }
                            onClick={handleCrypto}
                          >
                            {isSubmitting ? "Redirecting..." : (<span>Pay with <img src="/solana.png" alt="Solana" className="h-4 inline-block align-middle ml-1" /></span>)}
                          </button> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
    </>
  )
}
