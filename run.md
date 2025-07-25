# ⚛️ MercadoLibre Clone - Frontend React

## 📋 Prerrequisitos

### Software Requerido
- **Node.js 16+**
- **npm 8+** (incluido con Node.js)

### Verificar Instalación
```bash
node --version       # Debe mostrar 16+
npm --version        # Debe mostrar 8+

meli-clone-front/
├── public/                  # Archivos públicos
├── src/
│   ├── components/          # Componentes React
│   │   ├── ProductPage/     # Página principal de producto
│   │   └── ErrorBoundary/   # Manejo de errores
│   ├── hooks/               # Custom hooks
│   ├── services/            # Integración con API
│   ├── utils/               # Utilidades y helpers
│   └── __tests__/           # Tests unitarios
├── package.json             # Dependencias y scripts
└── run.md                  # Este archivo

## Clonar repositorio
git clone https://github.com/oscacaac1986/front_clon_meli.git
cd meli-clone-front

npm install

# Crear archivo .env en la raíz
echo REACT_APP_API_URL=http://localhost:8000 > .env
echo REACT_APP_ENVIRONMENT=development >> .env

npm start

