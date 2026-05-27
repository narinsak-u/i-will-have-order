import Stripe from 'stripe'

const key = process.env.NUXT_STRIPE_SECRET_KEY
if (!key) {
  throw new Error('NUXT_STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(key)
