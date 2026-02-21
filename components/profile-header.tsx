import { Button } from "@/components/ui/button"
import { Mail, MoreHorizontal } from 'lucide-react'
import Image from "next/image"

export default function ProfileHeader() {
  return (
    <div className="max-w-[60rem] mx-auto">
      <div className="flex items-center -mt-3 gap-4">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-[#E1F9F6] border-4 border-white shadow-[0px_4px_20px_rgba(149,185,193,0.2)]">
          <Image
            src="/kat.gif"
            alt="Avatar"
            width={115}
            height={115}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">kat</h1>
          </div>
          <p className="text-base text-muted-foreground">7,567 Followers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="h-8 px-4 rounded-full">
            Follow
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

