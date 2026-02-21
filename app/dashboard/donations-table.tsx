"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { DonationWithPayment, getDonations } from "./actions"
import { DonationDetailsDialog } from "./donation-details-dialog"

export function DonationsDataTable() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [data, setData] = useState<{
        donations: DonationWithPayment[]
        total: number
        pages: number
    }>()
    const [loading, setLoading] = useState(true)
    const [selectedDonation, setSelectedDonation] = useState<DonationWithPayment | null>(null)

    const currentPage = Number(searchParams.get("page")) || 1

    const fetchData = useCallback(async () => {
        setLoading(true)
        const result = await getDonations(currentPage)
        setData(result)
        setLoading(false)
    }, [currentPage])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const createQueryString = useCallback(
        (params: Record<string, string | number | null>) => {
            const newSearchParams = new URLSearchParams(searchParams.toString())

            Object.entries(params).forEach(([key, value]) => {
                if (value === null) {
                    newSearchParams.delete(key)
                } else {
                    newSearchParams.set(key, String(value))
                }
            })

            return newSearchParams.toString()
        },
        [searchParams]
    )

    if (loading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>No data available</div>
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Payment Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[100px]">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.donations.map((donation) => (
                            <TableRow key={donation.id}>
                                <TableCell>
                                    {format(new Date(donation.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>{donation.name}</TableCell>
                                <TableCell>{donation.amount} coffees</TableCell>
                                <TableCell>${donation.total.toFixed(2)}</TableCell>
                                <TableCell>{donation.paymentType}</TableCell>
                                <TableCell>{donation.payment?.status || "N/A"}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSelectedDonation(donation)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={`${pathname}?${createQueryString({
                                page: currentPage > 1 ? currentPage - 1 : null,
                            })}`}
                        />
                    </PaginationItem>

                    {Array.from({ length: data.pages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={`${pathname}?${createQueryString({
                                    page: page === 1 ? null : page,
                                })}`}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href={`${pathname}?${createQueryString({
                                page: currentPage < data.pages ? currentPage + 1 : null,
                            })}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            <DonationDetailsDialog
                donation={selectedDonation}
                open={selectedDonation !== null}
                onOpenChange={(open) => !open && setSelectedDonation(null)}
            />
        </div>
    )
} 