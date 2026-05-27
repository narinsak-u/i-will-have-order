import Stripe from 'stripe'
import { stripe } from '../utils/stripe'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = query.session_id as string

  if (!sessionId || !sessionId.startsWith('cs_')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid session ID' })
  }

  let session: Stripe.Response<Stripe.Checkout.Session>
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch (error) {
    console.error('Stripe session retrieval failed:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to verify payment session' })
  }

  if (session.payment_status !== 'paid') {
    throw createError({ statusCode: 400, statusMessage: 'Payment not completed' })
  }

  const planId = session.metadata?.planId
  if (!planId) {
    throw createError({ statusCode: 400, statusMessage: 'Session missing plan data' })
  }

  return { planId, paymentStatus: session.payment_status }
})
