"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";

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

function CreditSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const userId = searchParams.get("userId");
  const authToken = searchParams.get("authToken");
  const credits = searchParams.get("credits");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<null | "success" | "error">(null);

  // Generate a payment ID
  const generatePaymentId = () => {
    return `pay_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  };

  useEffect(() => {
    if (!sessionId || !userId || !authToken || !credits) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    const processPayment = async () => {
      try {
        // First verify the Stripe session
        const verifyResponse = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`);
        if (!verifyResponse.ok) {
          throw new Error("Payment verification failed");
        }
        
        const verifyData = await verifyResponse.json();
        console.log("Payment verification data:", verifyData);
        
        if (!verifyData.verified) {
          throw new Error("Payment was not successful");
        }

        // Generate payment ID
        const paymentId = generatePaymentId();

        // Send credits to backend
        const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/credits/purchase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            userId: userId,
            credits: parseInt(credits),
            paymentId: paymentId,
          }),
        });

        if (!backendResponse.ok) {
          const errorData = await backendResponse.text();
          throw new Error(`Backend error: ${errorData}`);
        }

        const backendData = await backendResponse.json();
        console.log("Backend response:", backendData);
        
        setPurchaseStatus("success");
      } catch (err) {
        console.error("Credit purchase error:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
        setPurchaseStatus("error");
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [sessionId, userId, authToken, credits]);

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
              <p className="text-lg text-[#636f8a]">Processing your credit purchase...</p>
              <p className="text-sm text-gray-500 mt-2">Adding {credits} credits to your account</p>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  if (error || purchaseStatus === "error") {
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
              <p className="text-2xl font-semibold mb-2">❌ Purchase Failed</p>
              <p className="text-[#636f8a] mb-4">{error || "Failed to add credits to your account"}</p>
              <p className="text-sm text-gray-500">If you believe this is a mistake, please contact support.</p>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  if (purchaseStatus === "success") {
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
              <p className="text-3xl font-bold text-[#fcc60e] mb-4">✅ Credits Added!</p>
              <p className="text-lg text-[#636f8a] mb-2">Successfully added {credits} credits to your account</p>
              <p className="text-sm text-gray-500">You can now use your credits to access premium features</p>
              <button
                onClick={() => window.close()}
                className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return null;
}

export default function CreditSuccessPage() {
  return (
    <Suspense>
      <CreditSuccessContent />
    </Suspense>
  );
}
