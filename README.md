# MercadoLibre Clone - Frontend

## 📖 Descripción
Aplicación React que replica la interfaz de usuario de MercadoLibre, conectada a una API FastAPI backend.

## 🏗️ Arquitectura

src/
├── components/         # Componentes React
├── hooks/             # Custom hooks
├── pages/              # pages
├── services/          # API y servicios externos
├── styles/          # Estilos y ajustes del sitio web
├── utils/             # Utilidades y helpers

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/oscacaac1986/front_clon_meli.git
cd meli-clone-front

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Desarrollo
npm start

# Producción
npm run build
npm install -g serve
serve -s build

# Tests con coverage
npm test -- --coverage --watchAll=false

# Tests en modo watch
npm run test:watch

# Coverage detallado
npm run test:coverage

