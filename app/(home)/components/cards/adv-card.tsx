"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function AdvCard() {
    return (
        <Card className='space-y-0 p-4 rounded-[18px]'>
            <CardHeader className='p-0 text-center'>
                <CardTitle className=''>
                    BakaBoost
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 py-2 space-y-2 flex flex-col items-center justify-center">
                <span>Make money doing what you love.</span>
                <Link
                    href="https://ko-fi.com/pixelplacebo"
                    className='underline text-primary'
                >Start a free BakaBoost page</Link>
            </CardContent>
            <CardFooter className='p-0' />
        </Card>
    )
}