"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Credit packages configuration
const CREDIT_PACKAGES = [
  {
    id: 'package_1000',
    credits: 1000,
    price: 0.5,
    popular: true,
    description: 'Perfect for regular users'
  },
  {
    id: 'package_1500',
    credits: 1500,
    price: 200,
    popular: false,
    description: 'Great value for power users'
  },
  {
    id: 'package_2000',
    credits: 2000,
    price: 200,
    popular: false,
    description: 'Best for heavy usage'
  }
];

export default function PurchasePage() {
  const params = useParams();
  const userId = params.userid as string;
  const authToken = params.authtoken as string;

  const handlePayment = async (packageId: string, credits: number, price: number) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          planType: 'CreditPurchase',
          packageId,
          credits,
          price,
          userId,
          authToken
        }),
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

          <div className="mb-8 flex items-center justify-center">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Image src="/Usuals Logo.svg" alt="Usuals Logo" width={40} height={40} className="h-10 w-10" />
              <span className="text-white font-bold text-3xl">Usuals</span>
            </Link>
          </div>

          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Purchase Credits
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Choose your credit package and start using our premium features
            </p>
            <div className="mt-4 text-sm text-gray-500">
              User ID: {userId}
            </div>
          </div>

          {/* Credit Packages */}
          <div className="flex justify-center gap-8 flex-wrap">
            {CREDIT_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="group relative">
                
                <div className="relative w-80 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between h-full min-h-[460px] bg-transparent" style={{
                  background: 'linear-gradient(135deg, rgba(179,192,206,0.10) 0%, rgba(19,21,26,1) 50%, rgba(179,192,206,0.10) 100%)'
                }}>
                  {pkg.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6 mt-3">
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-3xl font-bold">${pkg.price}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">{pkg.credits.toLocaleString()} Credits</h2>
                    <p className="text-gray-400 text-sm">{pkg.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {pkg.credits.toLocaleString()} credits instantly
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      No expiration date
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Full access to premium features
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      24/7 customer support
                    </div>
                  </div>

                  <button 
                    onClick={() => handlePayment(pkg.id, pkg.credits, pkg.price)} 
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/50'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/50'
                    } text-white`}
                  >
                    Purchase {pkg.credits.toLocaleString()} Credits
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              🔒 Secure payment processing with Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
