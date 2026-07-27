# 🧪 Framework de Automatización con Playwright

## 📖 Descripción

Este proyecto implementa un framework de automatización de pruebas para la aplicación web de e-commerce [Automation Exercise](https://automationexercise.com/). El objetivo es validar funcionalidades, flujos de usuario y la experiencia general de la plataforma mediante pruebas automatizadas.

## 🚀 Alcance de la Automatización

Se han automatizado 23 **casos de prueba** que validan flujos de trabajo críticos y funcionalidades clave:

- Registro, inicio de sesión y cierre de sesión de usuarios
- Navegación por categorías y marcas de productos
- Búsqueda y filtrado de productos
- Carrito de compras (agregar, eliminar, modificar cantidad)
- Proceso completo de checkout (dirección, pago, descarga de factura)
- Suscripción al boletín informativo
- Envío de reseñas de productos
- Funcionalidad de scroll y elementos recomendados

## 🧠 Habilidades y Conocimientos Adquiridos

- **Diseño de frameworks de automatización**: Arquitectura con patrón **Page Object Model (POM)** para código modular y reutilizable
- **TypeScript estricto**: Tipado estático con `strict: true` e interfaces personalizadas (`User`, `PaymentDetails`, `ReviewInfo`)
- **Fixtures personalizadas**: Inyección automática de Page Objects en los tests mediante fixtures de Playwright
- **Logging estructurado**: Sistema de logging con niveles (debug/info/warn/error) controlado por variable de entorno
- **Calidad de código**: ESLint + Prettier configurados para mantener consistencia en todo el proyecto
- **Cross-browser testing**: Ejecución en Chromium, Firefox y WebKit
- **CI/CD con GitHub Actions**: Pipeline con cache inteligente de dependencias y navegadores, ejecución manual con selección de navegador, y generación de reportes
- **Reporting**: Reportes HTML de Playwright y reportes avanzados con Allure

## 🗂️ Estructura del Proyecto

```
automation_exercise/
│
├── .env.example                # Template de variables de entorno
├── .eslintrc.json              # Configuración de ESLint
├── .prettierrc                 # Configuración de Prettier
├── .github/workflows/          # Pipeline CI/CD con GitHub Actions
├── fixtures/
│   └── baseTest.ts             # Fixtures personalizadas + utilidades compartidas
├── pages/                      # Page Objects (POM)
│   ├── BasePage.ts             # Clase base con navegación y utilidades comunes
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── SignUpPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailsPage.ts
│   ├── ViewCartPage.ts
│   ├── CheckoutPage.ts
│   ├── PaymentPage.ts
│   ├── AccountCreatedPage.ts
│   └── DeleteAccountPage.ts
├── tests/                      # Casos de prueba
│   ├── home.spec.ts
│   ├── login_signup.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── types/
│   └── index.ts                # Interfaces TypeScript para datos de prueba
├── utils/
│   ├── constants.ts            # Constantes de URLs
│   ├── helpers.ts              # Funciones utilitarias
│   ├── logger.ts               # Sistema de logging
│   └── test-data/
│       ├── data.json           # Datos de prueba
│       └── doc_test.docx       # Archivo para pruebas de carga
├── playwright.config.ts        # Configuración de Playwright
├── tsconfig.json               # Configuración de TypeScript (strict)
└── package.json
```

## ⚙️ Instalar el Proyecto

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/RebeChiSan/automation_exercise_playwright.git
   cd automation_exercise_playwright
   ```

2. **Configura las variables de entorno:**

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` si es necesario.

3. **Instala las dependencias:**

   ```bash
   npm install
   ```

4. **Instala los navegadores necesarios:**

   ```bash
   npx playwright install
   ```

## 🧠 Ejecutar el proyecto

### 💻 Desde la terminal

1. **Ejecutar todas las pruebas:**

   ```bash
   npm test
   ```

2. **Ejecutar un archivo de prueba específico:**

   ```bash
   npx playwright test tests/cart.spec.ts
   ```

3. **Ejecutar un caso de prueba específico:**

   ```bash
   npx playwright test --grep "TC_12"
   ```

4. **Ejecutar en un navegador específico:**

   ```bash
   npx playwright test --project=chromium
   ```

5. **Ver logging detallado:**

   ```bash
   set LOG_LEVEL=debug && npx playwright test
   ```

6. **Generar reporte de Playwright:**

   ```bash
   npm run report
   ```

7. **Generar y abrir reporte Allure:**

   ```bash
   npm run generate-allure
   npm run open-allure
   ```

8. **Verificar calidad de código:**

   ```bash
   npm run lint        # ESLint
   npm run format:check  # Prettier
   npm run format      # Autoformatear
   ```

### 🤖 Desde GitHub Actions - CI/CD Pipeline

El proyecto incluye un workflow de GitHub Actions con **cache inteligente** que acelera las ejecuciones:

1. **Ir a GitHub Actions**: Abre la pestaña "Actions" en tu repositorio
2. **Selecciona "Playwright Tests"**
3. **Haz clic en "Run workflow"**
4. **Selecciona una opción**:
   - **Browser**: chromium, firefox, o all
5. **Haz clic en "Run workflow"**
6. **Descargar Reportes**: Una vez completada la ejecución, encontrarás en "Artifacts":
   - `playwright-report-[browser]`
   - `allure-report-[browser]`

> El pipeline incluye caching de `node_modules` y navegadores Playwright, reduciendo el tiempo de ejecución de ~60s a ~10s cuando no hay cambios en dependencias.

## 🧰 Tecnologías Utilizadas

| Tecnología | Propósito |
|---|---|
| **Playwright** | Framework de automatización E2E multi-navegador |
| **TypeScript** | Tipado estático, interfaces, POO con `strict: true` |
| **ESLint + Prettier** | Calidad y formato consistente de código |
| **Allure** | Reportes visuales avanzados de pruebas |
| **GitHub Actions** | CI/CD con caching inteligente y ejecución manual |
| **Node.js / npm** | Entorno de ejecución y gestión de dependencias |
| **dotenv** | Configuración por entorno |

---

📌 Autor: Rebeca C. Santiago

💬 Proyecto con fines de práctica en automatización de pruebas en aplicaciones web.
