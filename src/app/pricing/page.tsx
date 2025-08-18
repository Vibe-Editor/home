"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PricingPage() {
  const handlePayment = async (planType: string, teamMembers: number = 0) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planType, teamMembers }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect the user to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('Failed to create Stripe checkout session:', data.error);
        alert('Unable to initiate payment. Please try again later.');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  const collabMembers = 3;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#13151a] text-white">
      {/* Dotted Background */}
      <div className="absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#404040_1px,transparent_1px)]"></div>
      {/* Center radial mask to darken edges */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#13151a] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* Subtle animated circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#fcc60e]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0097fc]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#495266]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo Section */}
          <div className="mb-8 flex items-center justify-center">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Image src="/Usuals Logo.svg" alt="Usuals Logo" width={40} height={40} className="h-10 w-10" />
              <span className="text-white font-bold text-3xl">Usuals</span>
            </Link>
          </div>

          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Unlock premium features and take your experience to the next level
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="flex justify-center gap-8 flex-wrap">
            {/* $20 Plan Card */}
            <div className="group relative">
              
              <div className="relative w-80 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between h-full min-h-[460px] bg-transparent" style={{
                background: 'linear-gradient(135deg, rgba(179,192,206,0.10) 0%, rgba(19,21,26,1) 50%, rgba(179,192,206,0.10) 100%)'
              }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>

                <div className="text-center mb-6 mt-3">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-gray-400 ml-1">/month</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Basic Plan</h2>
                  <p className="text-gray-400 text-sm">Perfect for getting started</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Core features access
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 email support
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Monthly updates
                  </div>
                </div>

                <button 
                  onClick={() => handlePayment('BasicPlan')} 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 text-sm"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* $89 Collaborative Plan Card */}
            <div className="group relative">
              
              <div className="relative w-80 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between h-full min-h-[460px] bg-transparent" style={{
                background: 'linear-gradient(135deg, rgba(179,192,206,0.10) 0%, rgba(19,21,26,1) 50%, rgba(179,192,206,0.10) 100%)'
              }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Collaborative
                  </span>
                </div>

                <div className="text-center mb-6 mt-3">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl font-bold">$89</span>
                    <span className="text-gray-400 ml-1">/month</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Collaborative Plan</h2>
                  <p className="text-gray-400 text-sm">Advanced collaboration features ( +$29 per additional member)</p>
                  {/* Input for number of additional team members */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <label htmlFor="teamMembers" className="text-gray-300 text-sm">Team Members:</label>
                    <input
                      id="teamMembers"
                      type="number"
                      value={3}
                      readOnly
                      className="w-16 bg-transparent border border-gray-700 rounded text-center text-white text-sm py-1 opacity-70 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Individual
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Team collaboration
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integrations
                  </div>
                </div>

                <button 
                  onClick={() => handlePayment('CollaborativePlan', collabMembers)} 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 text-sm"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* $99 Founder Plan Card */}
            <div className="group relative">
              
              <div className="relative w-80 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between h-full min-h-[460px] bg-transparent" style={{
                background: 'linear-gradient(135deg, rgba(179,192,206,0.10) 0%, rgba(19,21,26,1) 50%, rgba(179,192,206,0.10) 100%)'
              }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Limited (100)
                  </span>
                </div>

                <div className="text-center mb-6 mt-3">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl font-bold">Enterprise</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Reach Out</h2>
                  <p className="text-gray-400 text-sm">Early supporter — limited to 100 slots</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All Collaborative features
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority roadmap influence
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Only 100 slots available
                  </div>
                </div>

                <a
                  href="https://t.me/tusharsinha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50 text-sm"
                >
                  Reach Out
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              🔒 Secure payment processing With Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}