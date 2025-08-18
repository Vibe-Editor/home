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

  const [collabMembers, setCollabMembers] = React.useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
      }}></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo Section */}
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <Image src="/image.png" alt="Usuals Logo" width={48} height={48} className="mx-auto h-12 w-auto" />
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
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-2xl p-6 max-w-xs transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/25 flex flex-col justify-between h-full min-h-[460px]">
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
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-2xl p-6 max-w-xs transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/25 flex flex-col justify-between h-full min-h-[460px]">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Enterprise
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
                      min={0}
                      value={collabMembers}
                      onChange={(e) => setCollabMembers(parseInt(e.target.value, 10) || 0)}
                      className="w-16 bg-transparent border border-gray-700 rounded text-center text-white text-sm py-1 focus:outline-none"
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
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-2xl p-6 max-w-xs transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-500/25 flex flex-col justify-between h-full min-h-[460px]">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Limited (100)
                  </span>
                </div>

                <div className="text-center mb-6 mt-3">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl font-bold">$99</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Founder Plan</h2>
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
                </div>

                <button
                  onClick={() => handlePayment('FounderPlan')}
                  className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50 text-sm"
                >
                  Become a Founder
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              🔒 Secure payment processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}