"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import Image from "next/image";

interface Post {
    title: string;
    description: string;
    image: string;
    date: string;
    likes: number;
}

const posts: Post[] = [
    {
        title: "Cube Room Series - Halloween room",
        description: "This witchy, Halloween room interior was created as a 31-day October art challenge. Each item was suggested by commenters on Instagram and TikTok. The hand-pixeled artwork \"Halloween room\" is now available as a sticker and sticker sheet. Get it here: pixelplacebo.com",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/6d57fcc4-5129-4a10-936b-2d50a48e2353_social-media-slideshow_0002_layer-14.png",
        date: "2024-01-01",
        likes: 6,
    },
    {
        title: "Cube room series - Dreamy bedroom",
        description: "This charming, cozy bedroom haunts my daydreams, and now it can haunt yours too. The hand-pixelled artwork \"Dreamy bedroom\" is now available as a sticker and print. Get it here: pixelplacebo.com",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/4ca50e6c-7b02-47fe-b981-9bcc1b9c065e_social-media-slideshow_0001_layer-1.png",
        date: "2024-01-01",
        likes: 16,
    },
    {
        title: "Cube room series - Office",
        description: "This isometric office would be the perfect place to make pixel art and play pixel games. Based on the artist's real life studio, this artwork is now available as a print and as sticker in two colorways, day and night. Get it here: pixelplacebo.com",
        image: "https://storage.ko-fi.com/cdn/useruploads/post/48aa3f3d-0423-49d3-a851-151b24e8d150_social-media-slideshow_0000_layer-15.png",
        date: "2024-01-01",
        likes: 13,
    },
]

export default function Posts() {
    return (
        <div className="max-w-xl mx-auto space-y-4 px-4 md:px-0">
            {posts.map((post, index) => (
                <Card key={index} className="overflow-hidden rounded-2xl bg-white">
                    {/* Header */}
                    <div className="p-4 pb-2 text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    {/* Content */}
                    <div className="pt-0">
                        <div className="px-4">
                            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.description}</p>
                        </div>
                        <div className="relative h-[360px] w-full">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                            <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}