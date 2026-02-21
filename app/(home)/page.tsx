import ArtGrid from "@/components/art-grid"
import ProfileHeader from "@/components/profile-header"
import SiteHeader from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import About from "./components/about"
import Gallery from "./components/gallery"
import Posts from "./components/posts"
import Shop from "./components/shop"

const tabs = [
  {
    value: "about",
    label: "About",
  },
  {
    value: "gallery",
    label: "Gallery",
  },
  {
    value: "posts",
    label: "Posts",
  },
  {
    value: "shop",
    label: "Shop",
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <ArtGrid />
        <ProfileHeader />
        <Tabs defaultValue="about" className="">
          <div className="w-full bg-white sticky top-0 z-50">
            <div className="max-w-[60rem] mx-auto">
              <TabsList className="bg-transparent mt-4 gap-6">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "data-[state=active]:border-b-4 data-[state=active]:border-primary",
                      "data-[state=active]:text-primary",
                      "bg-transparent data-[state=active]:shadow-none rounded-none pb-2",
                      "text-base font-semibold hover:text-primary px-0"
                    )}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          <div className="bg-[linear-gradient(0deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.03)_100%),linear-gradient(0deg,#467ceb0d_0%,#467ceb0d_100%)] pt-4 pb-10 min-h-screen">
            <div className="max-w-[60rem] mx-auto">
              <TabsContent value="about">
                <About />
              </TabsContent>
              <TabsContent value="gallery">
                <Gallery />
              </TabsContent>
              <TabsContent value="posts">
                <Posts />
              </TabsContent>
              <TabsContent value="shop">
                <Shop />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  )
}

