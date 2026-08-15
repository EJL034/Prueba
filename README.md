# Sistema de Gestión de Incapacidades

Sistema web para el registro, seguimiento y reportes de boletas de incapacidad.

## Archivos principales (unificados)

| Archivo            | Descripción                                      |
|--------------------|--------------------------------------------------|
| `css/styles.css`   | **Todos los estilos** en un solo archivo         |
| `js/app.js`        | **Todo el JavaScript** unificado (config, datos, validaciones, utilidades, autenticación, reportes y UI) |
| `index.html`       | Aplicación principal                             |
| `login.html`       | Página de inicio de sesión                       |

## Cómo usar

1. Abre `login.html` en el navegador.
2. Usuarios de prueba:
   - **Administrador**: `admin@empresa.com` / `admin123`
   - **Usuario**: `usuario@empresa.com` / `user123`

## Orden de módulos dentro de `js/app.js`

1. `config.js` → Configuración global
2. `datos.js` → Persistencia (localStorage)
3. `validaciones.js` → Reglas de negocio
4. `utilidades.js` → Funciones auxiliares
5. `autenticacion.js` → Login y permisos
6. `reportes.js` → Reportes y estadísticas
7. `app.js` → Interfaz de usuario y eventos

## Notas

- No se necesita backend. Todo funciona con `localStorage`.
- Los archivos antiguos individuales y las versiones `*2` se pueden borrar si ya no los necesitas.
