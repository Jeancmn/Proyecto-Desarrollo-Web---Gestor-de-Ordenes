# 🍕 Gestor de Órdenes de Restaurante

Una aplicación web moderna para gestionar órdenes de restaurante construida con React, TypeScript y Vite. Permite crear, guardar y administrar órdenes con sistema de propinas y persistencia local.

## ✨ Características

- 📋 **Menú interactivo** con productos categorizados
- 🛒 **Carrito de compras** con cantidades dinámicas
- 💰 **Sistema de propinas** personalizable
- 💾 **Persistencia local** - las órdenes se guardan automáticamente
- 🔄 **Actualización en tiempo real** sin necesidad de recargar
- 📱 **Diseño responsivo** con Tailwind CSS
- 🧾 **Historial de órdenes** con numeración automática

## 🚀 Tecnologías utilizadas

- **React 18** con Hooks
- **TypeScript** para tipado estático
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **useReducer** para manejo de estado
- **LocalStorage** para persistencia

## 📦 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/gestor-ordenes.git
cd gestor-ordenes
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador** en `http://localhost:5173`

## 🎮 Cómo usar

### 1. Agregar productos al carrito
- Navega por el menú de productos
- Haz clic en "Agregar" para añadir productos al carrito
- Los productos se agrupan automáticamente por tipo

### 2. Gestionar el carrito
- Incrementa/decrementa cantidades
- Elimina productos del carrito
- Ve el subtotal en tiempo real

### 3. Configurar propina
- Selecciona un porcentaje de propina predefinido
- Ve el cálculo total actualizado automáticamente

### 4. Guardar orden
- Haz clic en "Guardar Orden" para registrar la compra
- Las órdenes se numeran automáticamente
- Se guardan con fecha y hora

### 5. Ver historial
- Consulta todas las órdenes guardadas
- Ve detalles completos de cada orden
- Limpia el historial cuando sea necesario

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── MenuItem.tsx     # Producto individual del menú
│   ├── OrderContents.tsx # Contenido del carrito
│   ├── OrderItems.tsx   # Resumen y botón de guardar
│   └── SavedOrders.tsx  # Historial de órdenes
├── data/
│   └── db.ts           # Base de datos del menú
├── reducers/
│   └── order-reducers.ts # Lógica de estado con useReducer
├── types/
│   └── index.ts        # Definiciones de tipos TypeScript
└── App.tsx             # Componente principal
```

## 🛠️ Scripts disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Preview de la build de producción
- `npm run lint` - Ejecuta el linter

## 💡 Características técnicas

### Estado Global con useReducer
- Manejo centralizado del estado de la aplicación
- Acciones tipadas para operaciones del carrito
- Persistencia automática en localStorage

### Prevención de duplicados
- Sistema inteligente que evita órdenes duplicadas
- Compatible con React.StrictMode
- Verificación por contenido y timestamp

### Eventos personalizados
- Comunicación entre componentes sin prop drilling
- Actualización automática de la interfaz
- Sincronización en tiempo real

## 🎨 Personalización

### Modificar el menú
Edita `src/data/db.ts` para agregar/modificar productos:

```typescript
export const menuItems: MenuItemType[] = [
    {
        id: 1,
        name: "Tu Producto",
        price: 10,
        category: "categoria"
    }
    // ...más productos
]
```

### Ajustar propinas
Modifica las opciones en `src/data/db.ts`:

```typescript
export const tipOptions = [
    { id: 'tip-10', value: 0.10, label: '10%' },
    { id: 'tip-20', value: 0.20, label: '20%' },
    // ...más opciones
]
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

- GitHub: [@Jeancmn](https://github.com/Jeancmn)

---

⭐ ¡No olvides dar una estrella al proyecto si te fue útil!
