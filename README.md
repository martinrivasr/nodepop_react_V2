# Nodepop

## Descripción
**Nodepop** es una aplicación desarrollada con **React** y **Node.js** para la publicación y gestión de productos en venta. Utiliza tecnologías modernas como **Vite** para el desarrollo rápido, **TypeScript** para tipado seguro y una base de datos gestionada con scripts personalizados.

## Instalación
Para instalar las dependencias del proyecto, ejecuta:
```sh
npm install
```

## Scripts Disponibles
Los siguientes scripts están disponibles en el archivo `package.json`:

### Desarrollo
```sh
npm run dev
```
Inicia el entorno de desarrollo con **Vite**.

### Construcción
```sh
npm run build
```
Compila el código **TypeScript** y construye la aplicación con **Vite**.

### .env file
crear el archivo .env con la direccion de la API


### Linter
```sh
npm run lint
```
Ejecuta **ESLint** para verificar el código en busca de errores y asegurar buenas prácticas.

### Vista previa de la compilación
```sh
npm run preview
```
Ejecuta la versión compilada de la aplicación.

### Inicialización de la base de datos
```sh
npm run build:initDB
npm run initDB:api
```
Compila el script de inicialización de la base de datos y lo ejecuta.


### ventanas emergentes.
Durante la primera ejecucion, es necesario permitir las ventanas emergentes.

## Dependencias Principales
- **react** y **react-dom**: Librería y núcleo de React.
- **react-router-dom**: Gestión de rutas en la aplicación.
- **axios**: Cliente HTTP para solicitudes a la API.
- **bootstrap** y **bootstrap-icons**: Estilos y componentes para la UI.
- **dotenv**: Manejo de variables de entorno.

## Dependencias de Desarrollo
- **vite**: Herramienta de desarrollo rápida para React.
- **typescript**: Tipado estático para JavaScript.
- **eslint**, **prettier**: Herramientas de linting y formateo.
- **@vitejs/plugin-react**: Plugin de Vite para React.

## Estructura del Proyecto
```
nodepop
 ┣ src/           # Código fuente de la aplicación
 ┣ dist/          # Archivos generados tras la compilación
 ┣ package.json   # Configuración del proyecto y dependencias
 ┣ .eslintrc.js   # Configuración de ESLint
 ┗ .prettierrc    # Configuración de Prettier
```

## Contribución
Si deseas contribuir al proyecto, abre un **pull request** o reporta un **issue** en el repositorio oficial.

## Licencia
Este proyecto está bajo la licencia **MIT**.
