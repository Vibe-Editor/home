import React from 'react';

export default function PricingPage() {
  return (
    <div className="pricing-page">
      <h1 className="text-center text-3xl font-bold mb-8">Choose Your Plan</h1>
      <div className="flex justify-center gap-8">
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">$20 Plan</h2>
          <p className="mb-4">Basic features for individuals.</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Select</button>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">$99 Teams Plan</h2>
          <p className="mb-4">Advanced features for teams.</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Select</button>
        </div>
      </div>
    </div>
  );
}
