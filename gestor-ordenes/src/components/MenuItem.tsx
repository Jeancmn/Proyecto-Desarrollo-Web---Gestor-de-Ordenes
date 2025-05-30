import { Dispatch } from "react"
import { OrderActions } from "../reducers/order-reducers"
import { MenuItemType } from "../types"

type MenuProps = {
    item: MenuItemType    
    dispatch: Dispatch<OrderActions>
}

export default function MenuItems({ item, dispatch }: MenuProps) {

    return (
        <>
            <button
                className="border-2 bg-yellow-400 hover:bg-gray-300  w-full p-3 flex justify-between"
                onClick={() => dispatch({ type: 'add-order', payload: { item } })}            
            >
                <p>{item.name}</p>
                <p className="font-black">${item.price}</p>
            </button>

        </>
    )
}
