import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !webhookSecret) {
    console.error('❌ Webhook error: Falta la firma de Stripe o el STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Falta la firma o el webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`❌ Error de validación de webhook: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const payload = await getPayload({ config })

  // 1. Manejar pago exitoso
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log(`💰 Pago exitoso recibido para PaymentIntent: ${paymentIntent.id}`)

    // Buscar la orden asociada
    const ordersResult = await payload.find({
      collection: 'orders',
      where: {
        'stripe.paymentIntentId': {
          equals: paymentIntent.id,
        },
      },
    })

    if (ordersResult.docs.length > 0) {
      const order = ordersResult.docs[0]
      console.log(`📦 Orden encontrada: ${order.id}. Actualizando estado a 'paid'...`)

      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          paymentStatus: 'paid',
          deliveryStatus: 'processing',
          stripe: {
            paymentIntentId: paymentIntent.id,
            paymentStatus: 'succeeded',
          },
        },
      })
      console.log(`✅ Orden ${order.id} marcada como PAGADA con éxito.`)
    } else {
      console.warn(`⚠️ Webhook recibió pago pero no encontró la orden con PaymentIntent ID: ${paymentIntent.id}`)
    }
  } 
  
  // 2. Manejar pago fallido
  else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const lastError = paymentIntent.last_payment_error?.message || 'Error desconocido'
    console.error(`❌ Pago fallido recibido para PaymentIntent: ${paymentIntent.id}. Detalle: ${lastError}`)

    const ordersResult = await payload.find({
      collection: 'orders',
      where: {
        'stripe.paymentIntentId': {
          equals: paymentIntent.id,
        },
      },
    })

    if (ordersResult.docs.length > 0) {
      const order = ordersResult.docs[0]
      console.log(`📦 Orden encontrada: ${order.id}. Marcando estado de pago como fallido...`)

      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          paymentStatus: 'failed',
          stripe: {
            paymentIntentId: paymentIntent.id,
            paymentStatus: 'failed',
          },
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
