import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md flex flex-col items-center">
        <p className="text-2xl font-bold text-red-600 mb-4">❌ Payment Cancelled</p>
        <p className="mb-6 text-gray-700">Your payment was cancelled. If this was a mistake, you can try again.</p>
        <Link href="/signup">
          <button className="px-6 py-3 rounded bg-blue-600 text-white font-semibold">Return to Signup</button>
        </Link>
      </div>
    </div>
  );
} 