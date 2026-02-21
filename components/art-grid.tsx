import { cn } from "@/lib/utils"

export default function ArtGrid() {
  return (
    <div className="w-full max-w-[60rem] max-h-[318px] h-[318px] mx-auto rounded-b-xl overflow-hidden">
      <div
        className={cn(
          "bg-[url('https://storage.ko-fi.com/cdn/useruploads/png_17daa8cb-1fec-47f6-86c9-7d23c60ad65bcover.jpg?v=ae160d34-210d-4926-bfc0-0f98144c541e')]",
          "bg-cover bg-center bg-no-repeat",
          "max-h-[318px] h-full w-full",
        )} />
    </div>
  )
}

