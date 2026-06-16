# Proyecto Web con GitHub Actions

## Estructura del proyecto

```
proyecto-web/
├── .github/
│   └── workflows/
│       ├── ci.yml                  ← Pipeline principal (tests + deploy)
│       └── branch-protection.yml   ← Protege main vía API de GitHub
├── src/
│   └── utils.js                    ← Lógica de negocio (testeable)
├── tests/
│   ├── unit/
│   │   └── utils.test.js           ← Pruebas unitarias (Vitest)
│   └── e2e/
│       └── home.spec.js            ← Pruebas de extremo a extremo (Playwright)
├── index.html
├── vite.config.js
├── vitest.config.js
└── playwright.config.js
```

## Cómo funciona el pipeline

```
Pull Request hacia main
        │
        ▼
┌───────────────────┐
│  Unit Tests       │  ← Vitest: prueba funciones individuales
│  (Vitest)         │
└────────┬──────────┘
         │ Si pasa ✅
         ▼
┌───────────────────┐
│  E2E Tests        │  ← Playwright: prueba el navegador real
│  (Playwright)     │
└────────┬──────────┘
         │ Si pasa ✅
         ▼
    ¿Es push a main?
         │ Sí
         ▼
┌───────────────────┐
│  Deploy           │  ← Solo si TODOS los tests pasaron
│  GitHub Pages     │
└───────────────────┘
```

**Si cualquier prueba falla → el merge queda bloqueado automáticamente.**

## Configuración inicial (una sola vez)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar protección de rama en GitHub

Ve a tu repo → **Settings → Branches → Add rule** para `main` y activa:
- ✅ Require status checks to pass before merging
  - `Unit Tests (Vitest)`
  - `E2E Tests (Playwright)`
- ✅ Require branches to be up to date before merging
- ✅ Require a pull request before merging

O bien, crea un secret `ADMIN_TOKEN` (PAT con permisos `repo`) y
ejecuta el workflow `branch-protection.yml` desde la pestaña Actions —
esto aplica las reglas automáticamente vía la API de GitHub.

### 3. Habilitar GitHub Pages (opcional)
Ve a **Settings → Pages** y selecciona la rama `gh-pages`.

## Comandos locales

```bash
# Desarrollo
npm run dev

# Pruebas unitarias
npm run test:unit

# Pruebas E2E (requiere build previo)
npm run build
npm run test:e2e

# Todas las pruebas
npm test
```
