"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Google Form URL for submission
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/17qO2Uci4vrbiDXp-ngLUyHE7OC_KpfVYvxDrtLJa01o/formResponse";

function CryptoSuccessContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'confirming' | 'success' | 'failure'>('confirming');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get the stored form data
        const stored = localStorage.getItem("registrationFormData");
        if (!stored) {
          throw new Error("No registration data found");
        }

        const formData = JSON.parse(stored);
        const userEmail = formData.email;

        if (!userEmail) {
          throw new Error("No email found in registration data");
        }

        // Call the crypto payment verification API
        const response = await fetch(`/api/verify-crypto-payment?email=${encodeURIComponent(userEmail)}`);
        
        if (!response.ok) {
          throw new Error("Failed to verify payment");
        }

        const result = await response.json();

        if (result.success && result.verified) {
          // Payment successful - update form status and submit to Google Form
          formData.status = true;
          
          const formDataToSend = new FormData();
          formDataToSend.append("entry.1885883987", formData.fullName);
          formDataToSend.append("entry.1234487408", formData.email);
          formDataToSend.append("entry.755360426", formData.useCase);
          formDataToSend.append("entry.803028115", formData.teamSize);
          formDataToSend.append("entry.1737138215", formData.role);
          formDataToSend.append("entry.879932707", "True"); // Status True

          console.log("Submitting to Google Form (crypto success):", {
            fullName: formData.fullName,
            email: formData.email,
            useCase: formData.useCase,
            teamSize: formData.teamSize,
            role: formData.role,
            status: true
          });

          await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            body: formDataToSend,
            mode: "no-cors",
          });

          setPaymentStatus('success');
        } else {
          // Payment not found or failed
          formData.status = false;
          
          const formDataToSend = new FormData();
          formDataToSend.append("entry.1885883987", formData.fullName);
          formDataToSend.append("entry.1234487408", formData.email);
          formDataToSend.append("entry.755360426", formData.useCase);
          formDataToSend.append("entry.803028115", formData.teamSize);
          formDataToSend.append("entry.1737138215", formData.role);
          formDataToSend.append("entry.879932707", "False"); // Status False

          console.log("Submitting to Google Form (crypto failure):", {
            fullName: formData.fullName,
            email: formData.email,
            useCase: formData.useCase,
            teamSize: formData.teamSize,
            role: formData.role,
            status: false
          });

          await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            body: formDataToSend,
            mode: "no-cors",
          });

          setPaymentStatus('failure');
        }
      } catch (err) {
        console.error('Error verifying crypto payment:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  if (loading || paymentStatus === 'confirming') {
    return (
      <div className="min-h-screen bg-[#13151a] flex flex-col items-center justify-center px-4">
        <div className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-3xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#fcc60e] mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-white mb-4">Confirming Payment</h1>
          <p className="text-[#636f8a]">Please wait while we verify your crypto payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#13151a] flex flex-col items-center justify-center px-4">
        <div className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Payment Verification Error</h1>
          <p className="text-[#636f8a] mb-6">{error}</p>
          <p className="text-sm text-[#636f8a]">If you believe this is a mistake, please contact support.</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#13151a] flex flex-col items-center justify-center px-4">
        <div className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-[#fcc60e] mb-4">Payment Successful!</h1>
          <p className="text-white text-lg mb-4">Your crypto payment has been verified.</p>
          <p className="text-[#636f8a]">Registration complete! Thank you for choosing Usuals.ai.</p>
          <div className="mt-6 p-4 bg-[#0097fc]/10 rounded-2xl">
            <p className="text-[#0097fc] text-sm">You'll receive access details via email shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failure') {
    return (
      <div className="min-h-screen bg-[#13151a] flex flex-col items-center justify-center px-4">
        <div className="bg-[#21252e]/50 backdrop-blur-xl border border-[#495266] rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Payment Not Found</h1>
          <p className="text-white text-lg mb-4">We couldn't verify your crypto payment.</p>
          <p className="text-[#636f8a] mb-6">Your registration was recorded, but payment was not successful.</p>
          <button 
            onClick={() => window.location.href = '/signup'}
            className="bg-[#fcc60e] text-[#13151a] font-medium rounded-2xl px-6 py-3 hover:bg-[#e6b30d] transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default function CryptoSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#13151a] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fcc60e]"></div>
      </div>
    }>
      <CryptoSuccessContent />
    </Suspense>
  );
} 