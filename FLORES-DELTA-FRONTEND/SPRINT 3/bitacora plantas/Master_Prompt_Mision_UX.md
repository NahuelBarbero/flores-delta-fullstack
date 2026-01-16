# Master Prompt - Misión: UX para la Bitácora de Planta

**Para:** Lovable
**De:** Tech Lead
**Misión:** Implementación de la Vista de Detalle de Planta

---

Hola Lovable,

Inicia la **Misión: UX para la Bitácora de Planta**. Esta es la feature más importante del sprint.

### 1. Objetivo Técnico

Tu objetivo es desarrollar la nueva "Vista de Detalle de Planta", una pantalla que presenta el historial de una planta en una línea de tiempo interactiva. Debes crear el componente, integrarlo en la navegación de la app y asegurar que cumple con la visión técnica y de producto.

### 2. Contexto y Estrategia

La competencia (como Growdiaries) ha demostrado que una línea de tiempo visual es la forma más efectiva de presentar una bitácora de cultivo. Nuestra meta es superar esa experiencia.

Para ello, he realizado una investigación (cuyos resultados están en la carpeta `Mision UX/`) y he diseñado un componente de referencia que ya resuelve la parte más compleja: el layout de la línea de tiempo horizontal. Tu trabajo es tomar esa base, integrarla y darle vida dentro de la aplicación.

### 3. Inventario de Recursos

- **Documento de Requerimientos (El "QUÉ"):**
  - `Mision UX/PRD_Mision_UX.md`: Contiene el valor para el usuario y los criterios que tu implementación debe satisfacer. Léelo con atención.

- **Código de Referencia (El "CÓMO" - Esqueleto):**
  - `reference_plant_detail_page.jsx`: **Tu punto de partida obligatorio.** Este archivo contiene el esqueleto del componente `PlantDetailPage` con el layout correcto, incluyendo la línea de tiempo horizontal y los componentes de `lucide-react`. **No reinventes esta estructura.**

- **Investigación de Soporte (El "PORQUÉ"):**
  - Carpeta `Mision UX/`: No necesitas leer todos los archivos, pero ten presente que esta carpeta contiene el análisis de la competencia que justifica por qué la línea de tiempo horizontal es un requisito clave.

### 4. Plan de Acción Técnico

1.  **Análisis Inicial:** Lee y comprende el `PRD_Mision_UX.md`.
2.  **Creación del Archivo:** Crea un nuevo archivo en `src/pages/PlantDetailPage.tsx`.
3.  **Implementación del Componente:**
    - Usa el contenido de `reference_plant_detail_page.jsx` como base para tu nuevo archivo `PlantDetailPage.tsx`.
    - Adáptalo para que sea un componente de React en TypeScript (`.tsx`), asegurando que los tipos sean correctos (puedes usar `any` para los props inicialmente si es necesario).
4.  **Integración en la Navegación (`App.tsx`):**
    - En `src/App.tsx`, importa tu nuevo componente `PlantDetailPage`.
    - Añade una nueva ruta que renderice este componente. La ruta debe ser dinámica: `<Route path="/plant/:id" element={<PlantDetailPage />} />`.
5.  **Habilitar el Acceso (`PlantCard.tsx`):**
    - Modifica el componente `src/components/dashboard/PlantCard.tsx`.
    - Envuelve el componente `Card` dentro de un componente `Link` de `react-router-dom`.
    - El `Link` debe apuntar a la nueva ruta de detalle, pasando el ID de la planta. Por ejemplo: `to={\"/plant/${plant.id}\"}`.
6.  **Verificación Final:**
    - Comprueba que al hacer clic en una `PlantCard` en el Dashboard, se navega correctamente a la página de detalle.
    - Asegúrate de que la página de detalle se renderiza con los datos de mock y la línea de tiempo es visible.
    - Confirma que no hay errores de compilación o de runtime.

Ejecuta esta misión con especial atención al detalle. Es el núcleo de la experiencia del usuario.
