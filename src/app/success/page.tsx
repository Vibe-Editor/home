"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScmtb68T0PE9ux3jc7uT6spr_sKuRXzrneT5qniPIuHjwuA-A/formResponse"; // Replace with your actual Google Form URL

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<{ fullName: string; email: string } | null>(null);
  const [form, setForm] = useState({ useCase: "", teamSize: "", role: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

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
        if (data.verified) {
          // Fetch session details from Stripe
          fetch("/api/stripe-session-details?session_id=" + encodeURIComponent(sessionId))
            .then(async (res) => {
              if (!res.ok) throw new Error("Could not fetch session details");
              const d = await res.json();
              setSessionData({ fullName: d.fullName, email: d.email });
            })
            .catch(() => setError("Could not fetch session details"));
        } else {
          setError("Payment not verified");
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionData) return;
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("entry.1885883987", sessionData.fullName);
      formDataToSend.append("entry.1234487408", sessionData.email);
      formDataToSend.append("entry.755360426", form.useCase);
      formDataToSend.append("entry.803028115", form.teamSize);
      formDataToSend.append("entry.1737138215", form.role);
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors",
      });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-lg">Verifying payment...</p>
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
  if (!sessionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg">Loading registration details...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl flex flex-col items-center">
        <p className="text-2xl font-bold text-green-600 mb-4">✅ Payment Verified!</p>
        <p className="mb-2 text-gray-700">Welcome, <span className="font-semibold">{sessionData.fullName}</span> ({sessionData.email})</p>
        <form className="w-full mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Primary Use Case</label>
            <select className="w-full border rounded px-3 py-2" value={form.useCase} onChange={e => handleFormChange("useCase", e.target.value)} required>
              <option value="">Select...</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="School">School</option>
              <option value="Agency">Agency</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Team Size</label>
            <select className="w-full border rounded px-3 py-2" value={form.teamSize} onChange={e => handleFormChange("teamSize", e.target.value)} required>
              <option value="">Select...</option>
              <option value="Just me">Just me</option>
              <option value="2-9">2-9 people</option>
              <option value="10-49">10-49 people</option>
              <option value="50-199">50-199 people</option>
              <option value="200-499">200-499 people</option>
              <option value="500-999">500-999 people</option>
              <option value="1000+">1000+ people</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Role</label>
            <select className="w-full border rounded px-3 py-2" value={form.role} onChange={e => handleFormChange("role", e.target.value)} required>
              <option value="">Select...</option>
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
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded disabled:opacity-50" disabled={submitting}>
            {submitting ? "Submitting..." : "Complete Registration"}
          </button>
          {submitStatus === "success" && <p className="text-green-600 mt-4">Registration complete!</p>}
          {submitStatus === "error" && <p className="text-red-600 mt-4">There was an error. Please try again.</p>}
        </form>
      </div>
    </div>
  );
} 