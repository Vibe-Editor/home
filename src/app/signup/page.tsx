"use client"

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Lightbulb, Users, CreditCard, ArrowRight, CheckCircle } from "lucide-react"

function Navbar() {
  const router = useRouter()

  return (
    <nav className="w-full fixed top-0 left-0 bg-[#21252e]/30 backdrop-blur-xl border-b border-[#495266] flex items-center justify-between py-4 px-4 sm:px-8 z-50">
      <div
        className="text-xl sm:text-2xl font-normal tracking-wide text-[#fcc60e] cursor-pointer"
        onClick={() => router.push("/")}
      >
        Usuals.ai
      </div>
      <button
        className="bg-[#0097fc] text-white font-medium rounded-full px-6 py-2 hover:bg-[#0080d6] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        onClick={() => router.push("/signup")}
      >
        Sign Up
      </button>
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
  icon: ReactNode
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
  icon: ReactNode
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  className?: string
  children: ReactNode
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

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    useCase: "",
    teamSize: "",
    role: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [step, setStep] = useState(1)
  const [animating, setAnimating] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email) return

    setAnimating(true)
    setTimeout(() => {
      setStep(2)
      setAnimating(false)
    }, 400)
  }

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!formData.useCase || !formData.teamSize || !formData.role) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const googleFormUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLScmtb68T0PE9ux3jc7uT6spr_sKuRXzrneT5qniPIuHjwuA-A/formResponse"
      const formDataToSend = new FormData()
      formDataToSend.append("entry.1885883987", formData.fullName)
      formDataToSend.append("entry.1234487408", formData.email)
      formDataToSend.append("entry.755360426", formData.useCase)
      formDataToSend.append("entry.803028115", formData.teamSize)
      formDataToSend.append("entry.1737138215", formData.role)

      await fetch(googleFormUrl, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors",
      })

      setSubmitStatus("success")
      setTimeout(() => {
        setFormData({ fullName: "", email: "", useCase: "", teamSize: "", role: "" })
        setStep(1)
        setIsSubmitting(false)
        setSubmitStatus(null)
        router.push("/")
      }, 3000)
    } catch {
      setSubmitStatus("error")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden" style={{ background: "#13151a" }}>
        <AnimatedBackground />
        <div className="w-full min-h-2 flex flex-col xl:flex-row items-center justify-center pt-20 pb-8 px-2 sm:px-4 relative z-10 gap-6 xl:gap-9 max-w-7xl mx-auto mt-6">
          {/* Left Card */}
          <div className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-3xl p-4 sm:p-6 lg:p-12 flex flex-col justify-center w-full xl:w-2/3 shadow-2xl mb-6 xl:mb-0">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-4xl font-bold text-white mb-6 leading-tight">
                Write it. Drop it. Watch it. <br />
                <span className="text-[#fcc60e]">Full Videos</span> in <span className="text-[#0097fc]">
                  Minutes
                </span>{" "}
              </h1>
              <p className="text-[#636f8a] text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
                Turn any brief or your own clips into a polished reel, ad, or short film. Usuals.ai learns your style,
                scripts the story, builds the shots, and edits the cut so 10x your creativity
              </p>
            </div>

            <div className="relative flex">
              <div className="absolute inset-0 rounded-3xl bg-[#0097fc]/10 opacity-60 pointer-events-none blur-xl" />
              <div className="p-4 sm:p-6 lg:p-8 w-full max-w-2xl relative">
                <div className="aspect-video bg-[#21252e] rounded-2xl flex items-center justify-center border border-[#495266] relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-[#fcc60e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-white/80 text-3xl sm:text-4xl lg:text-6xl group-hover:scale-110 transition-transform duration-500 relative z-10">
                    ▶
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#fcc60e] rounded-full animate-pulse" />
                    <div
                      className="w-2 h-2 bg-[#0097fc] rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div className="w-2 h-2 bg-[#636f8a] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex flex-col justify-center w-full xl:w-1/3 xl:mt-[-16vh]">
            <div className="p-4 sm:p-6 shadow-2xl bg-transparent">
              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#0097fc]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-[#0097fc]" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Welcome to Usuals.ai!</h2>
                  <p className="text-[#636f8a] mb-6">
                    Your registration was successful. We&apos;re redirecting you to get started...
                  </p>
                  <div className="w-full bg-[#21252e] rounded-full h-2">
                    <div className="bg-[#fcc60e] h-2 rounded-full animate-pulse" style={{ width: "100%" }}></div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-2">
                      {step === 1 ? "Get Started" : "Tell us about yourself"}
                    </h2>
                    <p className="text-[#636f8a]">
                      {step === 1
                        ? "Create your account to start making videos"
                        : "Help us personalize your experience"}
                    </p>

                    {/* Progress indicator */}
                    <div className="flex justify-center mt-6 mb-2">
                      <div className="flex gap-2">
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 1 ? "bg-[#fcc60e]" : "bg-[#495266]"}`}
                        />
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 2 ? "bg-[#fcc60e]" : "bg-[#495266]"}`}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-[#636f8a]">Step {step} of 2</p>
                  </div>

                  {step === 1 && (
                    <div
                      className={`transition-all duration-400 ${!animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
                    >
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
                        onClick={handleRegister}
                      >
                        Register
                        <ArrowRight size={18} className="inline ml-2" />
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div
                      className={`transition-all duration-400 ${!animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
                    >
                      <IconSelect
                        icon={<Lightbulb size={18} />}
                        value={formData.useCase}
                        onChange={(e) => handleInputChange("useCase", e.target.value)}
                        required
                      >
                        <option value="" className="bg-[#21252e] text-white">
                          What&apos;s your primary use case?
                        </option>
                        <option value="Work" className="bg-[#21252e] text-white">
                          Work
                        </option>
                        <option value="Personal" className="bg-[#21252e] text-white">
                          Personal
                        </option>
                        <option value="School" className="bg-[#21252e] text-white">
                          School
                        </option>
                        <option value="Agency" className="bg-[#21252e] text-white">
                          Agency
                        </option>
                        <option value="Other" className="bg-[#21252e] text-white">
                          Other
                        </option>
                      </IconSelect>

                      <IconSelect
                        icon={<Users size={18} />}
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange("teamSize", e.target.value)}
                        required
                      >
                        <option value="" className="bg-[#21252e] text-white">
                          What&apos;s your team size?
                        </option>
                        <option value="Just me" className="bg-[#21252e] text-white">
                          Just me
                        </option>
                        <option value="2-9" className="bg-[#21252e] text-white">
                          2-9 people
                        </option>
                        <option value="10-49" className="bg-[#21252e] text-white">
                          10-49 people
                        </option>
                        <option value="50-199" className="bg-[#21252e] text-white">
                          50-199 people
                        </option>
                        <option value="200-499" className="bg-[#21252e] text-white">
                          200-499 people
                        </option>
                        <option value="500-999" className="bg-[#21252e] text-white">
                          500-999 people
                        </option>
                        <option value="1000+" className="bg-[#21252e] text-white">
                          1000+ people
                        </option>
                      </IconSelect>

                      <IconSelect
                        icon={<CreditCard size={18} />}
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        required
                      >
                        <option value="" className="bg-[#21252e] text-white">
                          What&apos;s your role?
                        </option>
                        <option value="Marketer" className="bg-[#21252e] text-white">
                          Marketer
                        </option>
                        <option value="Business Owner" className="bg-[#21252e] text-white">
                          Business Owner
                        </option>
                        <option value="Creative Director" className="bg-[#21252e] text-white">
                          Creative Director
                        </option>
                        <option value="Digital Marketing Agency" className="bg-[#21252e] text-white">
                          Digital Marketing Agency
                        </option>
                        <option value="Content Creator" className="bg-[#21252e] text-white">
                          Content Creator
                        </option>
                        <option value="Developer" className="bg-[#21252e] text-white">
                          Developer
                        </option>
                        <option value="Student" className="bg-[#21252e] text-white">
                          Student
                        </option>
                        <option value="Other" className="bg-[#21252e] text-white">
                          Other
                        </option>
                      </IconSelect>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="flex-[2] bg-[#0097fc] text-white font-medium rounded-2xl px-6 py-4 hover:bg-[#0080d6] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                          disabled={!formData.useCase || !formData.teamSize || !formData.role || isSubmitting}
                          onClick={handleSubmit}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Creating Account...
                            </>
                          ) : (
                            <>
                              Complete Registration
                              <CheckCircle size={18} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
