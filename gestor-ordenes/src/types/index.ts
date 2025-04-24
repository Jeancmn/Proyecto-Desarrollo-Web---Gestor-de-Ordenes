export type MenuItemType ={
    id: number
    name:string
    price: number
}

export type OrderItem = MenuItemType & {
    quantity: number    
}