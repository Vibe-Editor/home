"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, ArrowRight, Lightbulb, Users, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { helioConfig } from "@/lib/helio-config"

function Navbar() {
  const router = useRouter()
  return (
    <nav className="w-full fixed top-0 left-0 bg-[#21252e]/30 backdrop-blur-xl border-b border-[#495266] flex items-center justify-between py-4 px-4 sm:px-8 z-50">
      <div className="text-xl sm:text-2xl font-normal tracking-wide text-[#fcc60e] cursor-pointer" onClick={() => router.push("/")}>Usuals.ai</div>
      <button className="bg-[#0097fc] text-white font-medium rounded-full px-6 py-2 hover:bg-[#0080d6] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" onClick={() => router.push("/signup")}>Sign Up</button>
    </nav>
  )
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#fcc60e]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0097fc]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#495266]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
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
    role: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [animating, setAnimating] = useState(false)

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
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.useCase || !formData.teamSize || !formData.role) return
    setIsSubmitting(true)
    // Save form data to localStorage (status is false for now)
    const formToStore = { ...formData, status: false }
    localStorage.setItem("registrationFormData", JSON.stringify(formToStore))
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setIsSubmitting(false)
        alert("Failed to start payment. Please try again.")
      }
    } catch {
      setIsSubmitting(false)
      alert("Failed to start payment. Please try again.")
    }
  }

  const handleCrypto = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.useCase || !formData.teamSize || !formData.role) return
    setIsSubmitting(true)
    const formToStore = { ...formData, status: false }
    localStorage.setItem("registrationFormData", JSON.stringify(formToStore))
    window.location.href = helioConfig.paymentUrl
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden bg-[#13151a]">
        <div className={cn("absolute inset-0", "[background-size:20px_20px]", "[background-image:radial-gradient(#404040_1px,transparent_1px)]")} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#13151a] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <AnimatedBackground />
        <div className="w-full min-h-2 flex flex-col xl:flex-row items-center justify-center pt-20 pb-8 px-2 sm:px-4 relative z-10 gap-6 xl:gap-9 max-w-7xl mx-auto mt-6">
          <div className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-3xl p-4 sm:p-6 lg:p-12 flex flex-col justify-center w-full xl:w-2/3 shadow-2xl mb-6 xl:mb-0">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-4xl font-bold text-white mb-6 leading-tight">
                Write it. Drop it. Watch it. <br />
                <span className="text-[#fcc60e]">Full Videos</span> in <span className="text-[#0097fc]">Minutes</span>{" "}
              </h1>
              <p className="text-[#636f8a] text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
                Turn any brief or your own clips into a polished reel, ad, or short film. Usuals.ai learns your style, scripts the story, builds the shots, and edits the cut so 10x your creativity
              </p>
            </div>
            <div className="relative flex">
              <div className="absolute inset-0 rounded-3xl bg-[#0097fc]/10 opacity-60 pointer-events-none blur-xl" />
              <div className="p-4 sm:p-6 lg:p-8 w-full max-w-2xl relative">
                <div className="aspect-video bg-[#21252e] rounded-2xl flex items-center justify-center border border-[#495266] relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-[#fcc60e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-white/80 text-3xl sm:text-4xl lg:text-6xl group-hover:scale-110 transition-transform duration-500 relative z-10">▶</div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#fcc60e] rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-[#0097fc] rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <div className="w-2 h-2 bg-[#636f8a] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full xl:w-1/3 xl:mt-[-16vh]">
            <div className="p-4 sm:p-6 shadow-2xl bg-transparent">
              <div className="w-full">
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-2">
                    {step === 1 ? "Get Started" : "Tell us about yourself"}
                  </h2>
                  <p className="text-[#636f8a]">
                    {step === 1
                      ? "Pre-order to start making videos"
                      : "Help us personalize your experience"}
                  </p>
                  <div className="flex justify-center mt-6 mb-2">
                    <div className="flex gap-2">
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 1 ? "bg-[#fcc60e]" : "bg-[#495266]"}`} />
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 2 ? "bg-[#fcc60e]" : "bg-[#495266]"}`} />
                    </div>
                  </div>
                  <p className="text-xs text-[#636f8a]">Step {step} of 2</p>
                </div>
                {step === 1 && (
                  <div className={`transition-all duration-400 ${!animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}>
                    <IconInput
                      type="text"
                      placeholder="Full Name"
                      icon={<User size={18} />}
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                    <IconInput
                      type="email"
                      placeholder="Email Address"
                      icon={<Mail size={18} />}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="w-full bg-[#fcc60e] text-[#13151a] font-medium rounded-2xl px-6 py-4 mt-4 hover:bg-[#e6b30d] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={!formData.fullName || !formData.email || isSubmitting}
                      onClick={handleContinue}
                    >
                      Continue <ArrowRight size={18} className="inline ml-2" />
                    </button>
                  </div>
                )}
                {step === 2 && (
                  <div className={`transition-all duration-400 ${!animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}>
                    <IconSelect
                      icon={<Lightbulb size={18} />}
                      value={formData.useCase}
                      onChange={(e) => handleInputChange("useCase", e.target.value)}
                      required
                    >
                      <option value="">What&apos;s your primary use case?</option>
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="School">School</option>
                      <option value="Agency">Agency</option>
                      <option value="Other">Other</option>
                    </IconSelect>
                    <IconSelect
                      icon={<Users size={18} />}
                      value={formData.teamSize}
                      onChange={(e) => handleInputChange("teamSize", e.target.value)}
                      required
                    >
                      <option value="">What&apos;s your team size?</option>
                      <option value="Just me">Just me</option>
                      <option value="2-9">2-9 people</option>
                      <option value="10-49">10-49 people</option>
                      <option value="50-199">50-199 people</option>
                      <option value="200-499">200-499 people</option>
                      <option value="500-999">500-999 people</option>
                      <option value="1000+">1000+ people</option>
                    </IconSelect>
                    <IconSelect
                      icon={<CreditCard size={18} />}
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      required
                    >
                      <option value="">What&apos;s your role?</option>
                      <option value="Marketer">Marketer</option>
                      <option value="Business Owner">Business Owner</option>
                      <option value="Creative Director">Creative Director</option>
                      <option value="Digital Marketing Agency">Digital Marketing Agency</option>
                      <option value="Content Creator">Content Creator</option>
                      <option value="Developer">Developer</option>
                      <option value="Student">Student</option>
                      <option value="Other">Other</option>
                    </IconSelect>
                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        className="flex-1 bg-[#fcc60e] text-[#13151a] font-medium rounded-2xl px-6 py-2 hover:bg-[#e6b30d] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={isSubmitting || !formData.fullName || !formData.email || !formData.useCase || !formData.teamSize || !formData.role}
                        onClick={handleStripe}
                      >
                        {isSubmitting ? "Redirecting to Payment..." : <>Pay with Stripe</>}
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-[#0097fc] text-white font-medium rounded-2xl px-6 py-4 hover:bg-[#0080d6] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={isSubmitting || !formData.fullName || !formData.email || !formData.useCase || !formData.teamSize || !formData.role}
                        onClick={handleCrypto}
                      >
                        {isSubmitting ? "Redirecting to Payment..." : "Pay with Crypto"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
