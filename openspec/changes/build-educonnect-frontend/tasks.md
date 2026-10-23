## 1. Project Initialization & Tooling Setup

- [x] 1.1 Initialize Angular application in repository root with standalone components and routing
- [x] 1.2 Install and configure Tailwind CSS, @tailwindcss/typography, and marked library
- [x] 1.3 Configure environment files (`environment.ts` with `apiUrl: 'http://localhost:8080/api/v1'`) and HTTP client with `withFetch()`

## 2. Core Models, Services & Layout Infrastructure

- [x] 2.1 Create TypeScript domain interfaces matching OpenAPI schemas (`HomeSummary`, `Category`, `Article`, `QuizQuestion`, `QuizResult`, `Announcement`, `StudentQuery`, `DevelopersInfo`)
- [x] 2.2 Implement `ThemeService` with Signal-based dark/light toggle and `localStorage` persistence
- [x] 2.3 Implement `ToastService` and standalone `ToastContainerComponent` for animated alerts
- [x] 2.4 Implement `MarkdownViewerComponent` wrapping `marked` and Angular DomSanitizer
- [x] 2.5 Implement `NavbarComponent` (glassmorphic translucent header, mobile menu, theme toggle, links) and `FooterComponent` with institutional credits and Swagger link

## 3. Home & Presentation Module (`/`)

- [x] 3.1 Implement `HomeService` to fetch `/api/v1/home/summary`
- [x] 3.2 Build `HomeComponent` with hero banner, contest badge (#5 Comunicación Efectiva), and CTA buttons
- [x] 3.3 Implement live metric counters grid (articles, questions pool, active announcements)
- [x] 3.4 Implement `UrgentAlertBarComponent` displaying high-priority alerts when available
- [x] 3.5 Implement featured articles showcase with direct navigation to article reading

## 4. Educational Content Module (`/content`, `/content/:slug`)

- [x] 4.1 Implement `ContentService` to query `/api/v1/content/categories`, `/api/v1/content/articles`, and `/api/v1/content/articles/{slug}`
- [x] 4.2 Build `ContentListComponent` with interactive category filter pills and responsive article grid
- [x] 4.3 Build `ArticleDetailComponent` with rich typography reading layout, author credentials badge, reading time, and copy-link share button

## 5. Interactive Quiz Module (`/quiz`)

- [x] 5.1 Implement `QuizService` for questions retrieval, submit payload, and attempt history lookup
- [x] 5.2 Build `QuizComponent` single-page examination view with participant name field and progress indicator
- [x] 5.3 Implement interactive question option cards with hover and selected states
- [x] 5.4 Implement submission validation and result screen featuring animated score gauge, qualitative feedback, and attempt persistence in `localStorage`

## 6. Academic Community Hub (`/comunidad`)

- [x] 6.1 Implement `CommunityService` for notices listing, notice creation, and student queries
- [x] 6.2 Build `CommunityHubComponent` with priority-filtered notice board (URGENT, NORMAL, INFO)
- [x] 6.3 Implement modal dialog form to publish new announcements with validation and live refresh
- [x] 6.4 Implement student inquiry form ("Buzón de Consultas") with validation and toast confirmation

## 7. Developers & Tech Matrix Module (`/developers`)

- [x] 7.1 Implement `DevelopersService` to query `/api/v1/developers`
- [x] 7.2 Build `DevelopersComponent` featuring institutional header ("Federico Álvarez Plata", Web III, 2026) and Dennis Vera developer profile
- [x] 7.3 Implement interactive full-stack technology matrix (Scala 3/ZIO 2 vs Angular 17+/Tailwind) with academic justifications
- [x] 7.4 Implement contest compliance checklist breaking down the 100-point evaluation rubric

## 8. Verification & Integration Testing

- [x] 8.1 Configure routes in `app.routes.ts` and test client-side navigation
- [x] 8.2 Verify end-to-end communication with the live backend at `http://localhost:8080`
- [x] 8.3 Verify responsive layout across mobile, tablet, and desktop viewports
- [x] 8.4 Run production build (`ng build`) to confirm clean compilation without errors
