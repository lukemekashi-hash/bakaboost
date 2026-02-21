"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { CreditCardIcon, XIcon } from 'lucide-react'
import { createDonation } from "@/app/actions/donation"
import { toast } from "sonner"

const donationSchema = z.object({
    amount: z.number().min(1),
    total: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
        message: " donation is $1",
    }),
    name: z.string().min(2, "Name must be at least 2 characters"),
    message: z.string().optional(),
    paymentType: z.enum(["one-time", "monthly"]) as z.ZodType<"one-time" | "monthly">
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

type DonationValues = z.infer<typeof donationSchema>
type PaymentValues = z.infer<typeof paymentSchema>

export default function BuyCoffeeCard() {
    const [isPaymentStep, setIsPaymentStep] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const donationForm = useForm<DonationValues>({
        resolver: zodResolver(donationSchema),
        defaultValues: {
            amount: 1,
            total: "3",
            name: "",
            message: "",
            paymentType: "one-time",
        },
    })

    const paymentForm = useForm<PaymentValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            email: "",
            cardNumber: "",
            expiry: "",
            csc: "",
            zipCode: "",
            firstName: "",
            lastName: "",
            address: "",
            unit: "",
            city: "",
            state: "",
            country: ""
        }
    })

    const paymentType = donationForm.watch("paymentType")

    async function onSubmitDonation() {
        paymentForm.reset()
        setIsPaymentStep(true)
    }

    async function onSubmitPayment(paymentData: PaymentValues) {
        try {
            setIsSubmitting(true)
            const donationData = donationForm.getValues()

            const result = await createDonation(donationData, paymentData)

            if (result.success) {
                toast.success(result.message)
                // Reset forms and state
                donationForm.reset()
                paymentForm.reset()
                setIsPaymentStep(false)
            } else {
                toast.error(result.error || 'Something went wrong')
            }
        } catch (error) {
            toast.error('Failed to process payment')
            console.error('Payment submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isPaymentStep) {
        return (
            <Card className='space-y-0 p-4 rounded-[18px]'>
                <CardHeader className='relative p-0 pb-2'>
                    <CardTitle className='text-base'>Your email address</CardTitle>
                </CardHeader>
                <Form {...paymentForm} key="payment-form">
                    <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)} className="space-y-4">
                        <CardContent className="p-0 pb-4 space-y-6">
                            <div className="space-y-2">
                                <FormField
                                    control={paymentForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
                                                    type="email"
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                    name={field.name}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Pay with...</h3>
                                <div className="flex justify-center items-center gap-2 p-4 border rounded-md text-white bg-zinc-900">
                                    <CreditCardIcon className="w-7 h-7" />
                                    <span>Debit or Credit Card</span>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsPaymentStep(false)}
                                >
                                    <XIcon className="w-8 h-8" />
                                </Button>
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    control={paymentForm.control}
                                    name="cardNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Card number"
                                                    maxLength={16}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={paymentForm.control}
                                        name="expiry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={paymentForm.control}
                                        name="csc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="CSC"
                                                        maxLength={3}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={paymentForm.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field} placeholder="First name" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={paymentForm.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field} placeholder="Last name" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={paymentForm.control}
                                    name="zipCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} placeholder="ZIP code" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-4">
                                    <h3 className="text-base font-semibold">Address Information</h3>
                                    <FormField
                                        control={paymentForm.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field} placeholder="Street address" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={paymentForm.control}
                                        name="unit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field} placeholder="Apartment, suite, etc. (optional)" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={paymentForm.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} placeholder="City" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={paymentForm.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} placeholder="State" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={paymentForm.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field} placeholder="Country" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                By continuing, you confirm you&apos;re 18 years or older.
                            </p>
                        </CardContent>
                        <CardFooter className='p-0'>
                            <Button type="submit" className='rounded-full w-full' size={'lg'} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Processing...
                                    </div>
                                ) : (
                                    `Pay $${donationForm.getValues('total')} ${paymentType === 'monthly' ? '/ month' : ''}`
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        )
    }

    return (
        <Card className='space-y-0 p-4 rounded-[18px]'>
            <CardHeader className='p-0 pb-4'>
                <CardTitle className='text-base'>Buy a Coffee for kat</CardTitle>
            </CardHeader>
            <Form {...donationForm}>
                <form onSubmit={donationForm.handleSubmit(onSubmitDonation)} className="space-y-4">
                    <CardContent className="p-0 pb-4 space-y-4">
                        <div className="flex rounded-full bg-muted p-1">
                            <FormField
                                control={donationForm.control}
                                name="paymentType"
                                render={({ field }) => {
                                    console.log('Current payment type:', field.value); // Debug log
                                    return (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <div className="flex w-full">
                                                    <Button
                                                        type="button"
                                                        variant={field.value === 'one-time' ? 'default' : 'ghost'}
                                                        className="flex-1 rounded-full text-sm"
                                                        onClick={() => donationForm.setValue('paymentType', 'one-time')}
                                                    >
                                                        One time
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant={field.value === 'monthly' ? 'default' : 'ghost'}
                                                        className="flex-1 rounded-full text-sm"
                                                        onClick={() => donationForm.setValue('paymentType', 'monthly')}
                                                    >
                                                        Monthly
                                                    </Button>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-500 text-2xl">☕</span>
                                    <span>${3} each</span>
                                </div>
                                <FormField
                                    control={donationForm.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => {
                                                    const newAmount = Math.max(1, field.value - 1)
                                                    field.onChange(newAmount)
                                                    donationForm.setValue('total', String(newAmount * 3))
                                                }}
                                            >
                                                -
                                            </Button>
                                            <span className="w-8 text-center">{field.value}</span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => {
                                                    const newAmount = field.value + 1
                                                    field.onChange(newAmount)
                                                    donationForm.setValue('total', String(newAmount * 3))
                                                }}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <FormField
                                    control={donationForm.control}
                                    name="total"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        aria-label="Donation amount"
                                                        className="w-full pl-8"
                                                        onChange={(e) => {
                                                            if (!isNaN(Number(e.target.value))) {
                                                                field.onChange(e.target.value)
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={donationForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Your name or nickname"
                                                    className="w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={donationForm.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Your message"
                                                    className="min-h-[100px]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {paymentType === 'one-time' && (
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="monthly"
                                        checked={paymentType !== 'one-time'}
                                        onCheckedChange={() => donationForm.setValue('paymentType', paymentType === 'one-time' ? 'monthly' : 'one-time')}
                                    />
                                    <Label htmlFor="monthly" className="text-sm">Make it monthly</Label>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className='p-0'>
                        <Button type="submit" className='rounded-full w-full' size={'lg'}>
                            Donate ${donationForm.watch('total')} {paymentType === 'monthly' ? '/ month' : ''}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}