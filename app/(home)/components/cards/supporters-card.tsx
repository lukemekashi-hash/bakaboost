"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

const supporters = [
    {
        name: "Matty D",
        image: "https://storage.ko-fi.com/cdn/useruploads/d0125dd2-462e-4e68-99ea-6582ed4a0f4b_tiny.png"
    },
    {
        name: "gothhours",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/bf711309-5803-4bf2-9d3a-d40713089d02_022e721b-aaa7-42c3-b770-30c00d0ef77b.png"
    },
    {
        name: "ghastlyTree",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/b25c9e50-1f7c-4121-90d2-2e9954c56bd8_7881c63a-dc14-4b7f-88d9-10a0abf52e3e.png"
    }
]

export default function SupportersCard() {
    return (
        <Card className='space-y-0 p-4 rounded-[18px]'>
            <CardHeader className='p-0 pb-4'>
                <CardTitle className='flex flex-row justify-between items-center'>
                    <div className="text-base">Top Supporters</div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
                <div className="bg-[#f7f7f7] rounded-lg flex flex-row items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2.5 p-3">
                        {supporters.map((supporter) => (
                            <div key={supporter.name} className="relative h-8 w-8 flex-shrink-0">
                                <Image
                                    src={supporter.image}
                                    alt={supporter.name}
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                        ))}
                    </div>
                    <Button variant={'link'} className='underline text-muted-foreground text-base'>See Leaderboard</Button>
                </div>
            </CardContent>
        </Card>
    )
}