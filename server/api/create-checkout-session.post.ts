/*
 * POST /api/create-checkout-session
 * Initiates a Stripe Checkout Session for a subscription plan purchase.
 * Validates the request body (planId + customer info), creates a Stripe
 * payment session with line items and metadata, and returns the session
 * URL for the client to redirect to Stripe's hosted checkout page.
 */
import { stripe } from '../utils/stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { planId, customer } = body as {
    planId: 'week' | 'month' | 'year'
    customer: { name: string; email: string; address: string }
  }

  const validPlans = ['week', 'month', 'year'] as const
  if (!planId || !validPlans.includes(planId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'planId must be one of: week, month, year',
    })
  }

  if (
    !customer ||
    typeof customer !== 'object' ||
    !customer.name ||
    typeof customer.name !== 'string' ||
    !customer.name.trim() ||
    !customer.email ||
    typeof customer.email !== 'string' ||
    !customer.email.trim() ||
    !customer.address ||
    typeof customer.address !== 'string' ||
    !customer.address.trim()
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'customer must be an object with non-empty string fields: name, email, address',
    })
  }

  const plans = {
    week: { name: '1 Week', price: 273 },
    month: { name: '1 Month', price: 1053 },
    year: { name: '1 Year', price: 9965 },
  } as const

  const plan = plans[planId]

  // Stripe expects the amount in the smallest currency unit (e.g., cents for USD)
  // Since our prices are in THB, we multiply by 100 to convert to satang
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
