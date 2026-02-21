"use client"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { InstagramIcon, TwitchIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'

const badges = [
    "Animation", "Design", "Art", "Game Development"
]

export default function AboutCard() {
    return (
		<Card className="space-y-0 p-4 rounded-[18px]">
			<CardHeader className="p-0 pb-4">
				<CardTitle className="text-base">About</CardTitle>
			</CardHeader>
			<CardContent className="p-0 pb-4 space-y-4">
				<div className="">
					<p>
						Kat is a Roblox streamer who loves sharing fun
						adventures and creative builds with her community. With
						a passion for gaming and a friendly vibe, she makes
						every stream a blast!
					</p>
				</div>
				{/* <div className="flex flex-row items-center gap-2 text-muted-foreground">
					<LinkIcon className="w-5 h-5" />
					<Link href="https://pixelplacebo.com" className="underline">
						pixelplacebo.com
					</Link>
				</div> */}
				<div className="flex flex-row items-center gap-4">
					<InstagramIcon className="w-5 h-5 text-muted-foreground" />
					<TwitterIcon className="w-5 h-5 text-muted-foreground" />
					<YoutubeIcon className="w-5 h-5 text-muted-foreground" />
					<TwitchIcon className="w-5 h-5 text-muted-foreground" />
				</div>
			</CardContent>
			<CardFooter className="p-0 pb-4 flex flex-row flex-wrap gap-2">
				{badges.map((badge) => (
					<Badge
						key={badge}
						variant={"secondary"}
						className="text-muted-foreground"
					>
						{badge}
					</Badge>
				))}
			</CardFooter>
		</Card>
	);
}