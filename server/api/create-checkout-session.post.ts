import Stripe from 'stripe'

const stripe = new Stripe(process.env.NUXT_STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { planId, customer } = body as {
    planId: 'week' | 'month' | 'year'
    customer: { name: string; email: string; address: string }
  }

  const plans: Record<string, { name: string; price: number }> = {
    week: { name: '1 Week', price: 273 },
    month: { name: '1 Month', price: 1053 },
    year: { name: '1 Year', price: 9965 },
  }

  const plan = plans[planId]
  if (!plan) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid plan' })
  }

  const amount = plan.price * 100

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'thb',
    line_items: [
      {
        price_data: {
          currency: 'thb',
          product_data: { name: `Spinach & Cheese — ${plan.name}` },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer_email: customer.email,
    metadata: {
      planId,
      customerName: customer.name,
      customerAddress: customer.address,
    },
    billing_address_collection: 'required',
    success_url: `${getRequestURL(event).origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getRequestURL(event).origin}/#checkout`,
  })

  return { url: session.url }
})
