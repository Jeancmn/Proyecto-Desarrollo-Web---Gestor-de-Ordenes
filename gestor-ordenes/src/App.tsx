import { useReducer } from "react"
import MenuItems from "./components/MenuItem"
import OrderItems from "./components/OrderItems"
import { initialState, orderReducer } from "./reducers/order-reducers"


function App() {

  const [state, dispatch] = useReducer(orderReducer, initialState)

  return (
    <>
      <header className="bg-yellow-500 py-5">
        <h1 className="text-center text-4xl font-black text-white">Gestor de Ordenes Restaurante</h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5 border border-dashed border-slate-500 rounded-lg space-y-10">
          <h2 className="text-4xl font-black text-white">Menu</h2>
          <div className="space-y-3 mt-10">
            {state.data.map(item =>
              <MenuItems
                key={item.id}
                item={item}
                dispatch={dispatch}
              />
            )}
          </div>

        </div>

        <div className="border border-dashed border-slate-500 p-5 rounded-lg space-y-10">
          <h2 className="font-black text-4xl text-white">Consumo</h2>
          {state.orders.length > 0 ?
            <OrderItems
              dispatch={dispatch}
              state={state}
            />
            :
            <p className="text-center text-white">La orden está vacia</p>
          }
          <div id={state.divId}></div>

        </div>

      </main>



    </>
  )
}

export default App