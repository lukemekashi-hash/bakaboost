export interface ShopItem {
  id: string
  title: string
  price: string
  downloads?: string
  image: string
  isFree?: boolean
}

export interface SupportMessage {
  id: string
  name: string
  message?: string
  type: 'coffee'
  timeAgo: string
}

