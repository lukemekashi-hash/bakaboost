"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

interface Product {
    name: string;
    price: number;
    image: string;
    sold?: number | string;
}

const products: Product[] = [
    {
        name: 'Halloween room pixel art wallpaper (still image)',
        price: 0,
        image: 'https://storage.ko-fi.com/cdn/useruploads/post/16c91c40-3880-4114-b558-a79151aeeae1_grey-wight-zoxwrpmywra-unsplash.png',
        sold: 339
    },
    {
        name: 'Summer sun pixel art wallpaper (includes still and animated)',
        price: 0,
        image: 'https://storage.ko-fi.com/cdn/useruploads/post/18125d59-d834-4ac1-941d-504f904caa10_stillimage.png',
        sold: 606
    },
    {
        name: 'kat\'s Pixel Art Brush Pack for Procreate',
        price: 0,
        image: 'https://storage.ko-fi.com/cdn/useruploads/post/7c2fc4ea-0b7b-4398-8af4-5c6ca8bc2e14_brushpack2.png',
        sold: "34k"
    },
    {
        name: 'kat\'s Isometric grid',
        price: 0,
        image: 'https://storage.ko-fi.com/cdn/useruploads/post/1376b071-7714-4079-9415-ae22eb49a0e5_isometricgridheroimage-suare.png',
        sold: "7.1k"
    },
] as const

export default function ShopCard() {
    return (
        <Card className='space-y-0 p-4 rounded-[18px]'>
            <CardHeader className='p-0 pb-4'>
                <CardTitle className='flex flex-row justify-between items-center'>
                    <div className="text-base">Shop</div>
                    <Button
                        variant={'link'}
                        className='underline text-muted-foreground text-base'
                    >Go to Shop</Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-4 space-y-4">
                <div className="flex flex-col gap-2">
                    {products.map((product) => (
                        <Link
                            href={`/shop/${product.name}`}
                            key={product.name}
                            className="w-full flex items-center border-1.5 gap-6 rounded-lg pr-4 overflow-hidden hover:bg-slate-50"
                        >
                            <div className="w-full gap-2 flex flex-row items-center justify-between">
                                <div className="relative h-[90px] w-[90px] flex-shrink-0">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm font-semibold overflow-hidden line-clamp-2 whitespace-pre-wrap truncate break-words">{product.name}</span>
                                    <div className="text-sm text-muted-foreground flex flex-row items-center gap-1">
                                        <Flame className="w-4 h-4 text-[#ff8c00] " />
                                        {product.sold?.toLocaleString()} sold
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="default"
                                className="flex-shrink-0"
                                size={'sm'}
                            >
                                Free +
                            </Button>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}