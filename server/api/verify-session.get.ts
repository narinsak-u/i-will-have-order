import Stripe from 'stripe'

const stripe = new Stripe(process.env.NUXT_STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = query.session_id as string

  if (!sessionId || !sessionId.startsWith('cs_')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid session ID' })
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== 'paid') {
    throw createError({ statusCode: 400, statusMessage: 'Payment not completed' })
  }

  const planId = session.metadata?.planId
  if (!planId) {
    throw createError({ statusCode: 400, statusMessage: 'Session missing plan data' })
  }

  return { planId, paymentStatus: session.payment_status }
})
