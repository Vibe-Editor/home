"use client";
import React, { useEffect, useState, Suspense } from "react";

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
          // Payment not found or failed - don't submit to Google Form
          console.log("Crypto payment failed - not submitting to Google Form");
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-lg">Verifying crypto payment and completing registration...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
        <p className="text-xl font-semibold mb-2">❌ {error}</p>
        <p className="text-sm">If you believe this is a mistake, please contact support.</p>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-green-600 mb-4">✅ Crypto Payment Verified!</p>
        <p className="text-lg">Registration complete! Thank you.</p>
      </div>
    );
  }

  if (paymentStatus === 'failure') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-red-600 mb-4">❌ Crypto Payment Failed</p>
        <p className="text-lg">Payment was not successful. Please try again.</p>
      </div>
    );
  }

  return null;
}

export default function CryptoSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <CryptoSuccessContent />
    </Suspense>
  );
} 