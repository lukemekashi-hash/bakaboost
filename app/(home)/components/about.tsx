"use client"

import AboutCard from "./cards/about-card"
import AdvCard from "./cards/adv-card"
import BuyCoffeeCard from "./cards/buy-coffe-card"
import { FeedCard } from "./cards/feed-card"
import GalleryCard from "./cards/gallery-card"
import ShopCard from "./cards/shop-card"
import SupportersCard from "./cards/supporters-card"

export default function About() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-start gap-4 px-4 md:px-0">
            <div className="flex-shrink-0 md:min-w-[285px] md:w-[400px] md:max-w-[400px] space-y-4 md:sticky md:top-20">
                <AboutCard />
                <GalleryCard />
                <SupportersCard />
            </div>
            <div className="flex-grow space-y-4">
                <BuyCoffeeCard />
                <ShopCard />
                <FeedCard />
                <AdvCard />
            </div>
        </div>
    )
}