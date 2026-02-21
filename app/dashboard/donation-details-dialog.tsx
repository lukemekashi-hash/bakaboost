"use client"

import { format } from "date-fns"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DonationWithPayment } from "./actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface DonationDetailsDialogProps {
    donation: DonationWithPayment | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DonationDetailsDialog({
    donation,
    open,
    onOpenChange,
}: DonationDetailsDialogProps) {
    if (!donation) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Donation Details
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh]">
                    <div className="space-y-6 p-6">
                        <div>
                            <h3 className="text-lg font-semibold">Donation Information</h3>
                            <Separator className="my-4" />
                            <dl className="grid grid-cols-3 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Date</dt>
                                    <dd className="text-sm">
                                        {format(new Date(donation.createdAt), "PPP")}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                                    <dd className="text-sm">{donation.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Amount</dt>
                                    <dd className="text-sm">{donation.amount} coffees</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Total</dt>
                                    <dd className="text-sm">${donation.total.toFixed(2)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Payment Type</dt>
                                    <dd className="text-sm">{donation.paymentType}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Message</dt>
                                    <dd className="text-sm">{donation.message || "No message"}</dd>
                                </div>
                            </dl>
                        </div>

                        {donation.payment && (
                            <>
                                <div>
                                    <h3 className="text-lg font-semibold">Payment Information</h3>
                                    <Separator className="my-4" />
                                    <dl className="grid grid-cols-3 gap-4">
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                                            <dd className="text-sm">{donation.payment.status}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                                            <dd className="text-sm">{donation.payment.email}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Card</dt>
                                            <dd className="text-sm">{donation.payment.cardNumber}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Expiry</dt>
                                            <dd className="text-sm">{donation.payment.expiry}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">CSC</dt>
                                            <dd className="text-sm">{donation.payment.csc}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Name on Card</dt>
                                            <dd className="text-sm">
                                                {donation.payment.firstName} {donation.payment.lastName}
                                            </dd>
                                        </div>
                                        <div className="col-span-2">
                                            <dt className="text-sm font-medium text-muted-foreground">ZIP Code</dt>
                                            <dd className="text-sm">{donation.payment.zipCode}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold">Address Information</h3>
                                    <Separator className="my-4" />
                                    <dl className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <dt className="text-sm font-medium text-muted-foreground">Street Address</dt>
                                            <dd className="text-sm">{donation.payment.address}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Unit/Apt</dt>
                                            <dd className="text-sm">{donation.payment.unit || "N/A"}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">City</dt>
                                            <dd className="text-sm">{donation.payment.city}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">State</dt>
                                            <dd className="text-sm">{donation.payment.state}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-muted-foreground">Country</dt>
                                            <dd className="text-sm">{donation.payment.country}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
} 