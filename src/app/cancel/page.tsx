"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Use the correct /formResponse endpoint for your form
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/17qO2Uci4vrbiDXp-ngLUyHE7OC_KpfVYvxDrtLJa01o/formResponse";

export default function CancelPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Try to submit the form data with status: false
    const stored = localStorage.getItem("registrationFormData");
    if (stored) {
      const form = JSON.parse(stored);
      form.status = false;
      const formDataToSend = new FormData();
      formDataToSend.append("entry.1885883987", form.fullName);
      formDataToSend.append("entry.1234487408", form.email);
      formDataToSend.append("entry.755360426", form.useCase);
      formDataToSend.append("entry.803028115", form.teamSize);
      formDataToSend.append("entry.1737138215", form.role);
      formDataToSend.append("entry.879932707", "False"); // Status False (capitalized for dropdown)
      // Debug log
      console.log("Submitting to Google Form (cancel):", {
        fullName: form.fullName,
        email: form.email,
        useCase: form.useCase,
        teamSize: form.teamSize,
        role: form.role,
        status: false
      });
      fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors",
      }).then(() => setSubmitted(true));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md flex flex-col items-center">
        <p className="text-2xl font-bold text-red-600 mb-4">❌ Payment Cancelled</p>
        <p className="mb-6 text-gray-700">
          Your payment was cancelled. {submitted ? "Registration was recorded with status: false." : "Recording registration..."}
        </p>
        <Link href="/signup">
          <button className="px-6 py-3 rounded bg-blue-600 text-white font-semibold">Return to Signup</button>
        </Link>
      </div>
    </div>
  );
} 