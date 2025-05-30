# 🍕 Gestor de Órdenes de Restaurante (Full-Stack)

Una aplicación web full-stack moderna para gestionar órdenes de restaurante. Frontend construido con React, TypeScript y Vite. Backend con Node.js, Express y PostgreSQL. Permite crear, guardar y administrar órdenes con sistema de propinas y persistencia en base de datos.

## ✨ Características

- 📋 **Menú interactivo** con productos categorizados
- 🛒 **Carrito de compras** con cantidades dinámicas
- 💰 **Sistema de propinas** personalizable
- 🗄️ **Base de datos PostgreSQL** - persistencia real en producción
- 💾 **Fallback a localStorage** - funciona offline si falla la API
- 🔄 **API REST completa** con endpoints para menú y órdenes
- 📱 **Diseño responsivo** con Tailwind CSS
- 🧾 **Historial de órdenes** con numeración automática
- 🔒 **Manejo de errores** robusto con validaciones
- 🚀 **Deployment en Railway** para producción

## 🏗️ Arquitectura

```
┌─────────────────┐    HTTP/API    ┌──────────────────┐    SQL    ┌─────────────────┐
│   FRONTEND      │ ←──────────→   │    BACKEND       │ ←─────→   │   DATABASE      │
│                 │   requests     │                  │  queries  │                 │
│ React + Vite    │                │ Node.js/Express  │           │ PostgreSQL      │
│ TypeScript      │                │ + Sequelize      │           │                 │
│ (Vercel) ✅     │                │ (Railway) ✅     │           │ (Railway) ✅    │
└─────────────────┘                └──────────────────┘           └─────────────────┘
```

## 🚀 Tecnologías utilizadas

### Frontend
- **React 18** con Hooks
- **TypeScript** para tipado estático
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **useReducer** para manejo de estado

### Backend
- **Node.js** con Express
- **TypeScript** para tipado del servidor
- **Sequelize ORM** para base de datos
- **PostgreSQL** como base de datos principal
- **CORS** para comunicación frontend-backend
- **Helmet** para seguridad
- **Morgan** para logging

### DevOps & Deployment
- **Railway** para backend y base de datos
- **Vercel** para frontend
- **Git/GitHub** para control de versiones

## 📦 Instalación

### Frontend

1. **Clona el repositorio**
```bash
git clone https://github.com/Jeancmn/gestor-ordenes.git
cd gestor-ordenes
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura variables de entorno** (opcional)
```bash
# Crear .env.local
VITE_API_URL=https://tu-backend.railway.app/api
```

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

### Backend

1. **Clona el repositorio del backend**
```bash
git clone https://github.com/Jeancmn/restaurant-backend.git
cd restaurant-backend
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura variables de entorno**
```bash
# Crear .env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/restaurant_db
```

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

## 🌐 APIs y Endpoints

### Base URL
- **Desarrollo**: `http://localhost:3000/api`
- **Producción**: `https://tu-backend.railway.app/api`

### Endpoints del Menú
```bash
GET    /api/menu           # Obtener todos los items del menú
POST   /api/menu           # Crear nuevo item
PUT    /api/menu/:id       # Actualizar item existente
DELETE /api/menu/:id       # Eliminar item (soft delete)
```

### Endpoints de Órdenes
```bash
GET    /api/orders              # Obtener todas las órdenes
POST   /api/orders              # Crear nueva orden
PUT    /api/orders/:id/status   # Actualizar estado de orden
DELETE /api/orders              # Eliminar todas las órdenes
```

### Health Check
```bash
GET    /health             # Verificar estado del servidor
```

## 🎮 Cómo usar

### 1. Agregar productos al carrito
- Navega por el menú de productos cargados desde la base de datos
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
- Haz clic en "Guardar Orden" para registrar en la base de datos
- Las órdenes se numeran automáticamente
- Se guardan con fecha, hora y estado

### 5. Ver historial
- Consulta todas las órdenes guardadas desde la base de datos
- Ve detalles completos de cada orden con estado
- Limpia el historial cuando sea necesario

## 📁 Estructura del proyecto

### Frontend
```
src/
├── components/          # Componentes React
│   ├── MenuItem.tsx     # Producto individual del menú
│   ├── OrderContents.tsx # Contenido del carrito
│   ├── OrderItems.tsx   # Resumen y botón de guardar
│   └── SavedOrders.tsx  # Historial de órdenes
├── data/
│   └── db.ts           # Datos de fallback local
├── reducers/
│   └── order-reducers.ts # Lógica de estado con useReducer
├── services/           # (Servicios para API cuando se implemente)
├── types/
│   └── index.ts        # Definiciones de tipos TypeScript
└── App.tsx             # Componente principal
```

### Backend
```
src/
├── config/
│   └── database.ts     # Configuración de Sequelize
├── models/
│   ├── MenuItem.ts     # Modelo de items del menú
│   ├── Order.ts        # Modelo de órdenes
│   └── index.ts        # Exportación de modelos
├── controllers/
│   ├── menuController.ts   # Lógica de negocio del menú
│   └── orderController.ts  # Lógica de negocio de órdenes
├── routes/
│   ├── menuRoutes.ts   # Rutas del menú
│   └── orderRoutes.ts  # Rutas de órdenes
└── app.ts              # Configuración de Express
server.ts               # Punto de entrada del servidor
```

## 🛠️ Scripts disponibles

### Frontend
- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Preview de la build de producción
- `npm run lint` - Ejecuta el linter

### Backend
- `npm run dev` - Inicia servidor con nodemon y ts-node
- `npm run build` - Compila TypeScript a JavaScript
- `npm run start` - Inicia servidor en producción
- `npm run start:dev` - Inicia servidor de desarrollo

## 💡 Características técnicas

### Frontend
- **Estado Global con useReducer** - Manejo centralizado del estado
- **Fallback automático** - Si falla la API, usa localStorage
- **Eventos personalizados** - Comunicación entre componentes
- **Prevención de duplicados** - Sistema inteligente anti-duplicación
- **Tipado estricto** - TypeScript en todo el frontend

### Backend
- **API REST** con Express y TypeScript
- **ORM Sequelize** para abstracción de base de datos
- **Manejo de errores** con middleware personalizado
- **Validaciones** en controladores y modelos
- **CORS configurado** para comunicación segura
- **Seed automático** de datos iniciales
- **Soft deletes** para mantener integridad de datos

### Base de Datos
- **PostgreSQL** como base de datos principal
- **Migraciones automáticas** con Sequelize
- **Relaciones definidas** entre modelos
- **Índices optimizados** para consultas rápidas

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Automático desde GitHub
# Configura VITE_API_URL en variables de entorno de Vercel
```

### Backend (Railway)
```bash
# 1. Conecta repositorio de GitHub
# 2. Railway detecta Node.js automáticamente
# 3. Agrega servicio PostgreSQL
# 4. Variables de entorno se configuran automáticamente
```

## 🔧 Variables de entorno

### Frontend (.env.local)
```env
VITE_API_URL=https://tu-backend.railway.app/api
```

### Backend (.env)
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

## 🧪 Testing de API

```bash
# Health check
curl https://tu-backend.railway.app/health

# Obtener menú
curl https://tu-backend.railway.app/api/menu

# Crear orden
curl -X POST https://tu-backend.railway.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{"items":[{"id":1,"name":"Pizza","price":10,"quantity":2}],"tip":0.15,"subtotal":20,"total":23}'
```

## 🔄 Flujo de datos

1. **Usuario interactúa** con el frontend React
2. **Frontend envía request** al backend via fetch API
3. **Backend procesa** la petición en controladores
4. **Sequelize ejecuta** queries en PostgreSQL
5. **Backend responde** con JSON estructurado
6. **Frontend actualiza** el estado y UI automáticamente
7. **Fallback a localStorage** si la API no está disponible

## 🛡️ Manejo de errores

- **Frontend**: Try/catch con fallback a localStorage
- **Backend**: Middleware de manejo de errores global
- **Base de datos**: Validaciones a nivel de modelo
- **Red**: Timeout y retry automático en requests

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo `LICENSE` para más detalles.

## 🔗 Links

- **Frontend Demo**: [https://tu-frontend.vercel.app](https://tu-frontend.vercel.app)
- **Backend API**: [https://tu-backend.railway.app](https://tu-backend.railway.app)
- **API Docs**: [https://tu-backend.railway.app/health](https://tu-backend.railway.app/health)

## 👨‍💻 Autor

- GitHub: [@Jeancmn](https://github.com/Jeancmn)
- Backend Repo: [restaurant-backend](https://github.com/Jeancmn/restaurant-backend)

---

⭐ ¡No olvides dar una estrella al proyecto si te fue útil!

## 🏷️ Versiones

- **v1.0.0** - Frontend con localStorage
- **v2.0.0** - Backend completo con PostgreSQL y deployment ✨ **ACTUAL**
