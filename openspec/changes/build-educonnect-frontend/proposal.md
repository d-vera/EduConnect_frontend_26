## Why

EduConnect is an academic web application designed for the 2026 Web Development III contest (*Diseño y Programación Web III* at Instituto Técnico Nacional de Comercio "Federico Álvarez Plata" Nocturno), addressing the official theme **"Comunicación Efectiva" (Theme #5)**. The backend has already been engineered with Scala 3, ZIO 2, sttp Tapir, and PostgreSQL at `http://localhost:8080`. 

To complete the end-to-end platform, a modern, highly engaging frontend is required. It must provide students and teachers with an interactive space to consume educational content, evaluate communication skills through an interactive quiz, consult academic notices, and submit direct inquiries.

## What Changes

- **Scaffold Angular Application**: Initialize an Angular project with standalone components, Signals, reactive forms, new control flow (`@if`, `@for`, `@switch`), and `provideHttpClient(withFetch())`.
- **Implement Tailwind CSS Design System**: Configure Tailwind CSS with glassmorphism, responsive utilities, custom colors (indigo, violet, emerald), dark mode toggle persistence, and `@tailwindcss/typography`.
- **Integrate Markdown Rendering**: Support rich formatting of academic articles from the backend using `marked`.
- **Core Domain Services & Type-Safe Models**: Model OpenAPI schemas and provide services for Home, Content, Quiz, Community, Developers, and Toast alerts.
- **Home & Overview Page (`/`)**: Hero section, real-time metrics cards, high-priority urgent announcement alert bar, and featured articles preview.
- **Educational Content Module (`/content`, `/content/:slug`)**: Category filter tabs, responsive article grid, and full Markdown article reader with reading time and author credentials.
- **Interactive Quiz Module (`/quiz`)**: Single-page quiz experience with participant registration, interactive radio choice cards, score gauge calculation, qualitative feedback, and attempt history persistence.
- **Academic Community Hub (`/comunidad`)**: Priority-filtered notice board, modal to publish notices, and student query form ("Buzón de Consultas") with toast feedback.
- **Developers & Tech Matrix Page (`/developers`)**: Institutional accreditation for "Federico Álvarez Plata", Dennis Vera profile, comparative tech matrix (Scala 3/ZIO 2 vs Angular 17+), and 100-point contest rubric breakdown.

## Capabilities

### New Capabilities
- `home-dashboard`: Contest overview, live statistics fetched from `/api/v1/home/summary`, urgent alerts, and featured content highlights.
- `educational-content`: Category-filtered article catalog and full-page Markdown reading view with author metadata and reading time estimation.
- `interactive-quiz`: Single-page quiz assessment featuring participant welcome, answer selection, animated result gauge, qualitative feedback, and attempt persistence.
- `academic-community`: Notice board with priority tags (URGENT, NORMAL, INFO), modal announcement creation form, and student query submission box.
- `developers-rubric`: Institutional header, team member bios, functional reactive programming justification matrix, and contest evaluation criteria.
- `theme-navigation`: Translucent glassmorphic navigation bar, dark/light mode toggle with localStorage persistence, non-blocking toast notifications, and footer linking to Swagger API docs.

### Modified Capabilities
*(None - initial greenfield frontend project)*

## Impact

- **Affected Systems**: Creation of the entire frontend client in `/Users/dennisvera/github/EduConnect_frontend_26`.
- **APIs Consumed**: `http://localhost:8080/api/v1/*` (Home summary, Content categories/articles, Quiz questions/submit/attempts, Announcements, Queries, Developers).
- **Dependencies Introduced**: Angular CLI / core packages, Tailwind CSS, `@tailwindcss/typography`, `marked`, Lucide / SVG icons.
