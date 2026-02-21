"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"

interface Product {
    id: string
    name: string
    description: string
    image: string
    sold: number | string
    isFree?: boolean
}

const products: Product[] = [
    {
        id: "1",
        name: "Halloween room pixel art wallpaper (still image)",
        description: "This is a pixel art wallpaper showcasing a Halloween themed room. Each downlo...",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/16c91c40-3880-4114-b558-a79151aeeae1_grey-wight-zoxwrpmywra-unsplash.png",
        sold: 339,
        isFree: true
    },
    {
        id: "2",
        name: "Summer sun pixel art wallpaper (includes still and animated)",
        description: "This is a pixel art wallpaper showcasing the summer sun and clouds. Each ...",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/18125d59-d834-4ac1-941d-504f904caa10_stillimage.png",
        sold: 608,
        isFree: true
    },
    {
        id: "3",
        name: "kat's Pixel Art Brush Pack for Procreate",
        description: "This pixel art brush pack for procreate includes 5 pixel art brushes! It includes...",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/7c2fc4ea-0b7b-4398-8af4-5c6ca8bc2e14_brushpack2.png",
        sold: "34k",
        isFree: true
    },
    {
        id: "4",
        name: "kat's Isometric grid",
        description: "A simple isometric grid for your pixel art projects",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/1376b071-7714-4079-9415-ae22eb49a0e5_isometricgridheroimage-suare.png",
        sold: "7.1k",
        isFree: true
    }
]

const filters = [
    { label: "All", value: "all" },
    { label: "brush", value: "brush" },
    { label: "brush pack", value: "brush-pack" },
    { label: "grid", value: "grid" },
    { label: "isometric", value: "isometric" },
    { label: "pixelart", value: "pixelart" },
    { label: "procreate", value: "procreate" },
    { label: "resources", value: "resources" },
    { label: "tutorials", value: "tutorials" },
    { label: "wallpaper", value: "wallpaper" },
]

export default function Shop() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
                {filters.map((filter) => (
                    <Button
                        key={filter.value}
                        variant={filter.value === "all" ? "default" : "secondary"}
                        className={cn(
                            "rounded-full text-sm h-8",
                            filter.value === "all" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-100 hover:bg-gray-200"
                        )}
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/shop/${product.id}`}
                        className="group bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow"
                    >
                        <div className="relative aspect-square">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            <Button
                                variant="default"
                                size="sm"
                                className={cn(
                                    "bg-blue-500 hover:bg-blue-600",
                                    "absolute bottom-2 right-2 h-8 px-2"
                                )}>
                                Free +
                            </Button>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium text-base mb-1 line-clamp-2">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Flame className="w-4 h-4 text-[#ff8c00]" />
                                    <span>{product.sold} sold</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
