import { useEffect, useState } from "react";

type SavedOrder = {
  number: number;
  date: string;
  orders: { name: string; quantity: number; price: number }[];
  tip: number;
  total: number;
};

export default function SavedOrders() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  const loadOrders = () => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(saved);
  };

  useEffect(() => {
    // Cargar órdenes al inicio
    loadOrders();

    // Escuchar eventos personalizados para cambios internos (ESTE ES EL IMPORTANTE)
    const handleOrdersUpdate = () => {
      loadOrders();
    };

    // Agregar listener para el evento personalizado
    window.addEventListener('ordersUpdated', handleOrdersUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('ordersUpdated', handleOrdersUpdate);
    };
  }, []);

  const handleClearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('ordersUpdated'));
  };

  return (
    <div className="mt-10 p-5 bg-white bg-opacity-10 rounded-lg">
      <h2 className="text-2xl font-black text-white mb-4">Órdenes Guardadas</h2>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded mb-4 font-bold"
        onClick={handleClearOrders}
        disabled={orders.length === 0}
      >
        Limpiar Órdenes
      </button>
      {orders.length === 0 && <p className="text-black">No hay órdenes guardadas.</p>}
      {orders.map(order => (
        <div key={order.number} className="mb-6 border-b border-slate-400 pb-4">
          <p className="text-white font-bold">Orden {order.number} - {new Date(order.date).toLocaleString()}</p>
          <ul className="ml-4 text-white">
            {order.orders.map((item, idx) => (
              <li key={idx}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="text-white">Propina: {order.tip * 100}%</p>
          <p className="text-white font-black">Total: ${order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}