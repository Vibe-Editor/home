"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScmtb68T0PE9ux3jc7uT6spr_sKuRXzrneT5qniPIuHjwuA-A/formResponse"; // Replace with your actual Google Form URL

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
        if (!res.ok) throw new Error("Session verification failed");
        const data = await res.json();
        const stored = localStorage.getItem("registrationFormData");
        if (!stored) throw new Error("No registration data found");
        const form = JSON.parse(stored);
        if (data.verified) {
          // Payment verified, set status true
          form.status = true;
          // Submit to Google Form
          const formDataToSend = new FormData();
          formDataToSend.append("entry.1885883987", form.fullName);
          formDataToSend.append("entry.1234487408", form.email);
          formDataToSend.append("entry.755360426", form.useCase);
          formDataToSend.append("entry.803028115", form.teamSize);
          formDataToSend.append("entry.1737138215", form.role);
          formDataToSend.append("entry.879932707", "true"); // Status true
          await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            body: formDataToSend,
            mode: "no-cors",
          });
          setSubmitStatus("success");
        } else {
          // Payment not verified, set status false
          form.status = false;
          const formDataToSend = new FormData();
          formDataToSend.append("entry.1885883987", form.fullName);
          formDataToSend.append("entry.1234487408", form.email);
          formDataToSend.append("entry.755360426", form.useCase);
          formDataToSend.append("entry.803028115", form.teamSize);
          formDataToSend.append("entry.1737138215", form.role);
          formDataToSend.append("entry.879932707", "false"); // Status false
          await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            body: formDataToSend,
            mode: "no-cors",
          });
          setSubmitStatus("fail");
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-lg">Verifying payment and completing registration...</p>
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
  if (submitStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-green-600 mb-4">✅ Payment Verified!</p>
        <p className="text-lg">Registration complete! Thank you.</p>
      </div>
    );
  }
  if (submitStatus === "fail") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-red-600 mb-4">❌ Payment Failed</p>
        <p className="text-lg">Registration was recorded, but payment was not successful. Please try again.</p>
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