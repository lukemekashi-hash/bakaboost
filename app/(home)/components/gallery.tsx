"use client"

import { Button } from "@/components/ui/button"
import { ShareIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const posts = [
    {
        title: "Cube Room Series - Halloween room",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/6d57fcc4-5129-4a10-936b-2d50a48e2353_social-media-slideshow_0002_layer-14.png",
    },
    {
        title: "Cube Room Series - Dreamy room",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/4ca50e6c-7b02-47fe-b981-9bcc1b9c065e_social-media-slideshow_0001_layer-1.png",
    },
    {
        title: "Cube Room Series - Halloween room",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/48aa3f3d-0423-49d3-a851-151b24e8d150_social-media-slideshow_0000_layer-15.png",
    },
]

export default function Gallery() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8 px-4">
                <h2 className="text-base font-semibold">Latest</h2>
                <Button variant="outline" className="rounded-full font-semibold flex items-center gap-2">
                    <ShareIcon className="w-4 h-4" />
                    Share
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <Link
                        key={index}
                        href={`#`}
                        className="flex flex-col"
                    >
                        <div className="relative aspect-[9/16] w-full">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover rounded-2xl"
                            />
                        </div>
                        <div className="py-2">
                            <h3 className="text-base ">{post.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}