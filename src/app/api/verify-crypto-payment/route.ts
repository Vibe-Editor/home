import { NextRequest, NextResponse } from 'next/server'
import { helioConfig } from '@/lib/helio-config'

// TypeScript interfaces for Hel.io API response
interface CustomerDetails {
  email: string
  discordUser: string | null
  telegramUser: string | null
}

interface TokenQuote {
  from: string
  fromAmountDecimal: string
  to: string
  toAmountMinimal: string
}

interface TransactionMeta {
  id: string
  amount: string
  senderPK: string
  recipientPK: string
  transactionType: string
  customerDetails: CustomerDetails
  productDetails: any | null
  additionalProductDetails: any[]
  transactionSignature: string
  transactionStatus: 'SUCCESS' | 'PENDING' | 'FAILED'
  splitRevenue: boolean
  remainingAccounts: any[]
  totalAmount: string
  totalAmountAsUSD: string
  affiliateAmount: string
  tokenQuote: TokenQuote
  shopifyPaymentDetails: any | null
  submitGeolocation: string
}

interface Transaction {
  id: string
  paylinkId: string
  fee: string
  quantity: number
  createdAt: string
  paymentType: 'PAYLINK' | string
  meta: TransactionMeta
}

interface Subscription {
  id: string
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED'
  email: string
  renewalDate: string
  createdAt: string
  transactions: Transaction[]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    // Construct the Hel.io API URL with parameters
    const url = `${helioConfig.apiUrl}?paylink=${helioConfig.paylinkId}&apiKey=${helioConfig.apiKey}`
    
    // Make the request to Hel.io API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${helioConfig.bearerToken}`
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch payment data' },
        { status: 500 }
      )
    }

    const subscriptions: Subscription[] = await response.json()
    
    // Check if the provided email exists in any of the successful transactions
    const emailFound = subscriptions.some((subscription: Subscription) => {
      return subscription.email === email && 
             subscription.status === 'ACTIVE' &&
             subscription.transactions.some((transaction: Transaction) => 
               transaction.meta.transactionStatus === 'SUCCESS'
             )
    })

    if (emailFound) {
      return NextResponse.json({
        success: true,
        verified: true,
        message: 'Payment verified successfully'
      })
    } else {
      return NextResponse.json({
        success: true,
        verified: false,
        message: 'No successful payment found for this email'
      })
    }

  } catch (error) {
    console.error('Error verifying crypto payment:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 