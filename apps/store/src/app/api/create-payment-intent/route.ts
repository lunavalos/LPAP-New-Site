import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil' as any,
})

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'mxn', metadata = {} } = await req.json()

    if (!amount || typeof amount !== 'number' || amount < 10) {
      return NextResponse.json({ error: 'Monto inválido' }, { status: 400 })
    }

    // Stripe uses cents/centavos — multiply by 100
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata,
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: any) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
