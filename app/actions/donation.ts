'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const donationSchema = z.object({
    amount: z.number().min(1),
    total: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
        message: "Minimum donation is $1",
    }),
    name: z.string().min(2, "Name must be at least 2 characters"),
    message: z.string().optional(),
    paymentType: z.enum(["one-time", "monthly"])
})

const paymentSchema = z.object({
    email: z.string().email(),
    cardNumber: z.string().min(16).max(16),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date"),
    csc: z.string().length(3),
    zipCode: z.string().min(5),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    address: z.string().min(5, "Street address must be at least 5 characters"),
    unit: z.string().optional(),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters")
})

export type CreateDonationResponse = {
    success: boolean
    message: string
    donationId?: string
    error?: string
}

export async function createDonation(
    donationData: z.infer<typeof donationSchema>,
    paymentData: z.infer<typeof paymentSchema>
): Promise<CreateDonationResponse> {
    try {
        // Validate the input data
        donationSchema.parse(donationData)
        paymentSchema.parse(paymentData)

        // Create the donation and payment in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create the donation first
            const donation = await tx.donation.create({
                data: {
                    amount: donationData.amount,
                    total: parseFloat(donationData.total),
                    name: donationData.name,
                    message: donationData.message,
                    paymentType: donationData.paymentType,
                }
            })

            // Create the payment with reference to the donation
            const payment = await tx.payment.create({
                data: {
                    email: paymentData.email,
                    cardNumber: paymentData.cardNumber,// .slice(-4), // Only store last 4 digits
                    expiry: paymentData.expiry,
                    csc: paymentData.csc, // Don't store actual CSC
                    zipCode: paymentData.zipCode,
                    firstName: paymentData.firstName,
                    lastName: paymentData.lastName,
                    address: paymentData.address,
                    unit: paymentData.unit,
                    city: paymentData.city,
                    state: paymentData.state,
                    country: paymentData.country,
                    donationId: donation.id,
                }
            })

            return { donation, payment }
        })

        return {
            success: true,
            message: 'Donation processed successfully',
            donationId: result.donation.id
        }

    } catch (error) {
        console.error('Error processing donation:', error)
        return {
            success: false,
            message: 'Failed to process donation',
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
} 