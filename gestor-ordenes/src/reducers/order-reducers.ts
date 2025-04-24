import { MenuItemType, OrderItem } from "../types";
import { menuItems } from "../data/db";
export type OrderActions =
    { type: 'add-order', payload: { item: MenuItemType } } |
    { type: 'remove-item', payload: { id: OrderItem['id'] } } |
    { type: 'set-tip', payload: { tip: number } } |
    { type: 'save-order' }


export type OrderState = {
    data: MenuItemType[]
    orders: OrderItem[]
    tip: number
    divId: string
}

export const initialState: OrderState = {
    data: menuItems,
    orders: [],
    tip: 0,
    divId: 'parent'
}

export const orderReducer = (state: OrderState = initialState, action: OrderActions): OrderState => {

    if (action.type === 'add-order') {
        const itemExist = state.orders.find(searchOrder => searchOrder.id === action.payload.item.id)

        let updateOrders: OrderItem[] = []

        if (itemExist) {
            updateOrders = state.orders.map(item => {
                if (item.id === action.payload.item.id) {
                    return {
                        ...item, quantity: item.quantity + 1
                    }
                }
                return item
            })

        } else {
            const newItem: OrderItem = { ...action.payload.item, quantity: 1 }
            updateOrders = [...state.orders, newItem]
        }
        return {
            ...state,
            orders: updateOrders
        }
    }

    if (action.type === 'remove-item') {
        const updateOrders = state.orders.filter(item => item.id !== action.payload.id)

        return {
            ...state,
            orders: updateOrders
        }
    }

    if (action.type === 'set-tip') {
        return {
            ...state,
            tip: action.payload.tip
        }
    }

    if (action.type === 'save-order') {
        const div = document.getElementById(state.divId)
        const msg = document.createElement('p')

        msg.textContent = 'Se ha guardado su orden'
        msg.classList.add('guardar')

        div?.appendChild(msg)

        setTimeout(() => msg.remove(), 2000)

        return {
            ...state,
            orders: [],
            tip: 0,
        }
    }

    return state
}