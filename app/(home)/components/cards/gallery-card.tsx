"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'


const images = [
    "https://storage.ko-fi.com/cdn/useruploads/post/6d57fcc4-5129-4a10-936b-2d50a48e2353_social-media-slideshow_0002_layer-14.png",
    "https://storage.ko-fi.com/cdn/useruploads/post/4ca50e6c-7b02-47fe-b981-9bcc1b9c065e_social-media-slideshow_0001_layer-1.png",
    "https://storage.ko-fi.com/cdn/useruploads/post/48aa3f3d-0423-49d3-a851-151b24e8d150_social-media-slideshow_0000_layer-15.png",
]

export default function GalleryCard() {
    return (
        <Card className='space-y-0 p-4 rounded-[18px]'>
            <CardHeader className='p-0 pb-4'>
                <CardTitle className='flex flex-row justify-between items-center'>
                    <div className="text-base">Gallery</div>
                    <Button
                        variant={'link'}
                        className='underline text-muted-foreground text-base'
                    >View Gallery</Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-4 space-y-4">
                <div className="grid grid-cols-3 gap-1">
                    {images.map((image) => (
                        <div className="relative h-[118px] w-[118px]"
                            key={image}
                        >
                            <Image
                                src={image}
                                alt="Gallery Image"
                                fill
                                className="object-cover aspect-square"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}