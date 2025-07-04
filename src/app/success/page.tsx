"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";

// Use the correct /formResponse endpoint for your form
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/17qO2Uci4vrbiDXp-ngLUyHE7OC_KpfVYvxDrtLJa01o/formResponse";

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dot Background Pattern */}
      <motion.div
        className="absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#404040_1px,transparent_1px)]"
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

      {/* Animated elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-[#fcc60e]/10 rounded-full blur-3xl"
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
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error" | "fail">(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session_id");
      setLoading(false);
      return;
    }
    fetch("/api/verify-session?session_id=" + encodeURIComponent(sessionId))
      .then(async (res) => {
        console.log("Session verification response status:", res.status);
        if (!res.ok) throw new Error("Session verification failed");
        const data = await res.json();
        console.log("Session verification data:", data);
        const stored = localStorage.getItem("registrationFormData");
        if (!stored) throw new Error("No registration data found");
        const form = JSON.parse(stored);
        console.log("Retrieved form data from localStorage:", form);
        if (data.verified) {
          // Payment verified, update status to true
          form.status = true;
          // Update localStorage with new status
          localStorage.setItem("registrationFormData", JSON.stringify(form));
          console.log("Payment verified - status updated to true for:", form.email);
          
          // Submit to Google Form with status true
          const formDataToSend = new FormData();
          formDataToSend.append("entry.1885883987", form.fullName);
          formDataToSend.append("entry.1234487408", form.email);
          formDataToSend.append("entry.755360426", form.useCase);
          formDataToSend.append("entry.803028115", form.teamSize);
          formDataToSend.append("entry.1737138215", form.role);
          formDataToSend.append("entry.879932707", "True"); // Status True
          
          console.log("Submitting to Google Form with status true:", {
            fullName: form.fullName,
            email: form.email,
            useCase: form.useCase,
            teamSize: form.teamSize,
            role: form.role,
            status: true
          });
          
          await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            body: formDataToSend,
            mode: "no-cors",
          });
          
          setSubmitStatus("success");
        } else {
          // Payment not verified, keep status as false
          form.status = false;
          // Update localStorage with status false
          localStorage.setItem("registrationFormData", JSON.stringify(form));
          console.log("Payment not verified - status remains false for:", form.email);
          setSubmitStatus("fail");
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#13151a" }}>
        <AnimatedBackground />
        <main className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 min-h-screen relative z-10">
          <motion.div 
            className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-2xl p-8 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fcc60e] mb-4"></div>
              <p className="text-lg text-[#636f8a]">Verifying payment and completing registration...</p>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#13151a" }}>
        <AnimatedBackground />
        <main className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 min-h-screen relative z-10">
          <motion.div 
            className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-2xl p-8 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center justify-center text-red-400">
              <p className="text-2xl font-semibold mb-2">❌ {error}</p>
              <p className="text-[#636f8a]">If you believe this is a mistake, please contact support.</p>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#13151a" }}>
        <AnimatedBackground />
        <main className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 min-h-screen relative z-10">
          <motion.div 
            className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-2xl p-8 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-[#fcc60e] mb-4">✅ Payment Verified!</p>
              <p className="text-lg text-[#636f8a]">We'll email you soon</p>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }
  if (submitStatus === "fail") {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#13151a" }}>
        <AnimatedBackground />
        <main className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 min-h-screen relative z-10">
          <motion.div 
            className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-2xl p-8 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-red-400 mb-4">❌ Payment Failed</p>
              <p className="text-lg text-[#636f8a]">Registration was recorded, but payment was not successful. Please try again.</p>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }
  return null;
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
} 