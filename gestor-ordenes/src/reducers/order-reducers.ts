import { MenuItemType, OrderItem } from "../types";
import { menuItems } from "../data/db";
export type OrderActions =
    { type: 'add-order', payload: { item: MenuItemType } } |
    { type: 'remove-item', payload: { id: OrderItem['id'] } } |
    { type: 'set-tip', payload: { tip: number } } |
    { type: 'save-order' } |
    { type: 'clear-saved-orders' }


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
        if (state.orders.length === 0) return state;
        
        const div = document.getElementById(state.divId)
        const msg = document.createElement('p')

        msg.textContent = 'Se ha guardado su orden'
        msg.classList.add('guardar')

        div?.appendChild(msg)

        setTimeout(() => msg.remove(), 2000)

        // --- NUEVO: Guardar en localStorage ---
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Calcular el número basado en el último número existente
        const newOrderNumber = savedOrders.length > 0 ? 
            Math.max(...savedOrders.map((order: any) => order.number || 0)) + 1 : 1;
        
        const newOrder = {
            number: newOrderNumber,
            date: new Date().toISOString(),
            orders: state.orders,
            tip: state.tip,
            total: state.orders.reduce((total, item) => total + (item.price * item.quantity), 0) * (1 + state.tip)
        };

        // NUEVO: Verificar si esta orden ya existe (mismo contenido y hora similar)
        const currentTime = new Date().getTime();
        const isDuplicate = savedOrders.some((order: any) => {
            const orderTime = new Date(order.date).getTime();
            const timeDiff = Math.abs(currentTime - orderTime);
            // Si la diferencia es menor a 1 segundo Y tiene el mismo contenido
            return timeDiff < 1000 && 
                    JSON.stringify(order.orders) === JSON.stringify(state.orders) &&
                    order.tip === state.tip;
        });

        // Solo guardar si no es duplicado
        if (!isDuplicate) {
            savedOrders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(savedOrders));
            // Disparar evento personalizado para actualizar la UI
            window.dispatchEvent(new CustomEvent('ordersUpdated'));
        }
        // --- FIN NUEVO ---

        return {
            ...state,
            orders: [],
            tip: 0,
        }
    }

    if (action.type === 'clear-saved-orders') {
    localStorage.removeItem('orders');
    return state;
}
    return state
}