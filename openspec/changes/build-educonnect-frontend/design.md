## Context

EduConnect is an educational web application for the 2026 Web Development III contest (*Diseño y Programación Web III*) at Instituto Técnico Nacional de Comercio "Federico Álvarez Plata" Nocturno. The project centers on the official theme **"Comunicación Efectiva" (Theme #5)**.

The backend is built with Scala 3, ZIO 2, sttp Tapir, zio-http, and PostgreSQL at `http://localhost:8080`, providing verified REST endpoints with an OpenAPI 3.1 schema. This design outlines the frontend architecture using Angular 17+ (standalone components, Signals, new control flow syntax `@if`, `@for`, `@switch`) paired with Tailwind CSS for modern aesthetics (glassmorphism, vibrant gradients, and dark mode support).

## Goals / Non-Goals

**Goals:**
- Implement 100% of the contest evaluation sections:
  1. Home & Presentation (`/`) with live metrics and urgent notices.
  2. Educational Content catalog & Markdown reader (`/content`, `/content/:slug`).
  3. Interactive Quiz (`/quiz`) in a single-page view with validation, score gauge, and feedback.
  4. Academic Communication Hub (`/comunidad`) with announcements and student query box.
  5. Developers & Tech Matrix (`/developers`) highlighting Dennis Vera, team info, and Scala/Angular comparative matrix.
- Establish an aesthetic design system utilizing Tailwind CSS, subtle micro-animations, glassmorphic headers, and responsive layouts.
- Provide seamless dark and light mode toggle with state persistence in `localStorage`.
- Integrate robust error handling and non-blocking toast notifications.
- Ensure strict type safety matching the OpenAPI backend DTOs.

**Non-Goals:**
- Implementing a multi-role user authentication/session system (e.g. JWT login) as the backend contest API exposes open public endpoints for academic presentation.
- Server-side rendering (SSR) deployment; client-side single-page application (SPA) meets the contest requirements.

## Decisions

### 1. Angular Architecture: Standalone Components & Signals
- **Choice**: Angular Standalone Components without NgModules, utilizing `inject()` and Angular Signals (`signal()`, `computed()`, `effect()`).
- **Rationale**: Reduces boilerplate, aligns with modern Angular best practices, and allows reactive, granular state updates across services and UI components.
- **Alternatives Considered**: Traditional NgModules and RxJS-heavy BehaviorSubjects (rejected due to excessive boilerplate and deprecated paradigms).

### 2. Styling: Tailwind CSS & Modern Glassmorphism
- **Choice**: Tailwind CSS v3 with `@tailwindcss/typography` (`prose prose-indigo dark:prose-invert`) and custom CSS utility classes for glassmorphic elements (`backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50`).
- **Rationale**: Ensures rapid prototyping with pixel-perfect control over responsive breakpoints (`sm:`, `md:`, `lg:`), rich color palettes (Indigo `#4F46E5`, Violet `#7C3AED`, Emerald `#10B981`), and dark mode classes (`dark:`).
- **Alternatives Considered**: Bootstrap or Angular Material (rejected as they produce generic appearances that fail contest aesthetic expectations).

### 3. Markdown Rendering: `marked` Library
- **Choice**: Use `marked` with Angular's `DomSanitizer` wrapped in a reusable `MarkdownViewerComponent` or `MarkdownPipe`.
- **Rationale**: Content articles in the backend (`/api/v1/content/articles/:slug`) contain headings, lists, bold text, and blockquotes. `marked` provides fast, standard-compliant parsing without bundling heavy unneeded dependencies.
- **Alternatives Considered**: Custom regex parser (insufficient for complex markdown) or `ngx-markdown` (can introduce dependency version mismatches with Angular 17+).

### 4. Interactive Quiz Flow: Single-Page Examination View
- **Choice**: Display all quiz questions vertically with styled interactive radio choice cards, clear question numbering, a sticky floating completion progress indicator, and an animated score gauge upon submission.
- **Rationale**: Selected by user during exploration (Opción B) for efficient contest review, enabling judges and students to preview all questions, review selections, and submit in one cohesive screen.
- **Alternatives Considered**: Multi-step wizard (Opción A).

### 5. State Persistence & LocalStorage
- **Choice**: Persist theme preference (`dark` | `light`) and the latest quiz attempt ID (`educonnect_last_attempt_id`) in browser `localStorage`.
- **Rationale**: Allows users to refresh the page without losing their quiz certificate/score or their visual theme preference.

### 6. HTTP Client Configuration & Error Handling
- **Choice**: `provideHttpClient(withFetch())` configured with an environment file pointing `apiUrl` to `http://localhost:8080/api/v1`. A global HTTP interceptor or centralized service handler catches errors and triggers toast notifications via `ToastService`.

## Risks / Trade-offs

- **[CORS or Port Blocking]** → Backend on `localhost:8080` and frontend dev server on `localhost:4200`. The Scala ZIO backend already permits CORS headers; an Angular proxy configuration (`proxy.conf.json`) will be provided as an optional fallback.
- **[Markdown XSS Injection]** → Articles rendered through `marked` are sanitized through Angular's built-in `DomSanitizer` and restricted to educational HTML tags.
- **[Node Version Warning with Angular CLI]** → The environment runs Node v26 with npm 11. Angular CLI can warn about unsupported Node versions; building with standard CLI flags (`--configuration production` or dev server) works smoothly.
