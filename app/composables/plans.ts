import planWeek from '~/assets/images/plan-week.jpg'
import planMonth from '~/assets/images/plan-month.jpg'
import planYear from '~/assets/images/plan-year.jpg'

export type PlanId = 'week' | 'month' | 'year'

export const plans = [
  {
    id: 'week' as const,
    label: 'TRY IT OUT',
    name: '1 Week',
    price: 273,
    cadence: '/ week',
    servings: '7 ที่',
    billing: '39 บาทต่อครั้ง',
    days: 7,
    features: [
      'จัดส่งสดใหม่ทุกวัน',
      'ยกเลิกได้ทุกเมื่อ',
      'ขนาดสำหรับครัวเรือนเดียว',
    ],
  },
  {
    id: 'month' as const,
    label: 'MOST POPULAR',
    name: '1 Month',
    price: 1053,
    cadence: '/ month',
    servings: '30 ที่',
    billing: 'ประหยัด 10%',
    days: 30,
    popular: true as const,
    features: [
      'จัดส่งสดใหม่ทุกวัน',
      'การ์ดสูตรอาหารฟรีทุกสัปดาห์',
      'หยุดพักได้ทุกเมื่อ',
    ],
  },
  {
    id: 'year' as const,
    label: 'BEST VALUE',
    name: '1 Year',
    price: 9965,
    cadence: '/ year',
    servings: '365 ที่',
    billing: 'ประหยัด 30%',
    days: 365,
    features: [
      'จัดส่งสดใหม่ทุกวัน',
      'รุ่นจำกัดตามฤดูกาล',
      'สนับสนุนระดับพรีเมียม',
    ],
  },
] as const

export type Plan = (typeof plans)[number]

export const planImages: Record<PlanId, string> = {
  week: planWeek,
  month: planMonth,
  year: planYear,
}

export function getPlan(id: PlanId): Plan {
  return plans.find(p => p.id === id)!
}
