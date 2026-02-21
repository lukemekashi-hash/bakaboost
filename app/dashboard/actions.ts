"use server"

import { prisma } from "@/lib/prisma"

export type DonationWithPayment = Awaited<ReturnType<typeof getDonations>>["donations"][number]

export async function getDonations(page = 1, limit = 10) {
  const skip = (page - 1) * limit

  const [donations, total] = await Promise.all([
    prisma.donation.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        payment: true
      }
    }),
    prisma.donation.count()
  ])

  return {
    donations,
    total,
    pages: Math.ceil(total / limit)
  }
} 