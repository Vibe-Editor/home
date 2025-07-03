import { NextRequest, NextResponse } from 'next/server'
import { helioConfig } from '@/lib/helio-config'

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

    const subscriptions = await response.json()
    
    // Check if the provided email exists in any of the successful transactions
    const emailFound = subscriptions.some((subscription: any) => {
      return subscription.email === email && 
             subscription.status === 'ACTIVE' &&
             subscription.transactions.some((transaction: any) => 
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