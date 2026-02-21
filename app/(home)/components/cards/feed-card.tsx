"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FeedItem {
    id: string
    avatar: string
    username: string
    action: string
    item: string
    timestamp: string
    comment?: string
}

const feedItems: FeedItem[] = [
    {
        id: '1',
        avatar: 'https://ko-fi.com/img/anon12.png?v=10', // Replace with your avatar path
        username: 'Somebody',
        action: 'bought a',
        item: 'coffee',
        timestamp: '3h'
    },
    {
        id: '2',
        avatar: 'https://ko-fi.com/img/anon12.png?v=10',
        username: 'Somebody',
        action: 'bought a',
        item: 'coffee',
        timestamp: '6h'
    },
    {
        id: '3',
        avatar: 'https://ko-fi.com/img/anon12.png?v=10',
        username: 'Somebody',
        action: 'bought a',
        item: 'coffee',
        timestamp: '8h'
    },
    {
        id: '4',
        avatar: 'https://ko-fi.com/img/anon12.png?v=10',
        username: 'Somebody',
        action: 'bought a',
        item: 'coffee',
        timestamp: '19 days',
    },
    {
        id: '5',
        avatar: 'https://ko-fi.com/img/anon5.png?v=1', // Different avatar for supporter
        username: 'Ko-fi Supporter',
        action: 'bought a',
        item: 'coffee',
        timestamp: '20 days',
        comment: "girl, what'll it take for you to do a 1 on 1 call w me to teach me how to make this BEAUTIFUL art!!"
    },
    {
        id: '6',
        avatar: 'https://ko-fi.com/img/anon12.png?v=10',
        username: 'Somebody',
        action: 'bought a',
        item: 'coffee',
        timestamp: '24 days',
        comment: "I appreciate your videos, and I’m excited to use the pixel brushes that you gave me. I just got an iPad, and I’m excited to give them a try! Thank you for all that you do!"
    }
]

export function FeedCard() {
    return (
        <Card className='space-y-0 p-4 rounded-[18px]'>
            <CardHeader className='p-0 pb-4'>
                <CardTitle className='flex flex-row justify-between items-center'>
                    <div className="text-base">Feed</div>
                    <Button
                        variant={'link'}
                        className='underline text-muted-foreground text-base'
                    >
                        Give Support
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
                <div className="flex flex-col gap-8">
                    {feedItems.map((item) => (
                        <div key={item.id} className="flex flex-col items-start gap-3">
                            <div className="flex items-center gap-3 w-full justify-between">
                                <div className="relative h-10 w-10 flex-shrink-0">
                                    <Image
                                        src={item.avatar}
                                        alt={item.username}
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex-1 flex flex-row items-center gap-4 min-w-0">
                                    <p className="text-base">
                                        <span className="font-semibold">{item.username}</span>
                                        {' '}{item.action}{' '}
                                        <span className="">{item.item}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.timestamp}
                                    </p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Report abuse</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {item.comment && (
                                <div className="p-4 border rounded-xl">
                                    <p className="text-base">{item.comment}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}