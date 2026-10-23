## ADDED Requirements

### Requirement: Category filtering tabs
The educational content section SHALL fetch available categories from `GET /api/v1/content/categories` and display interactive filter tabs ("Todos", "Comunicación Asertiva", "Escucha Activa", "Resolución de Conflictos", "Netiqueta Digital").

#### Scenario: Switching categories
- **WHEN** the user selects a category tab such as "Escucha Activa"
- **THEN** the system filters the displayed articles to only show those belonging to the selected category, or queries `GET /api/v1/content/articles?category={slug}`.

#### Scenario: Selecting all categories
- **WHEN** the user clicks "Todos"
- **THEN** the system retrieves and displays the full collection of articles across all categories.

### Requirement: Educational article card grid
The system SHALL present educational articles in a responsive grid layout displaying title, excerpt, category badge, estimated reading time, author, and a "Leer más" action button.

#### Scenario: Viewing article cards
- **WHEN** the user views `/content`
- **THEN** the system displays cards for each article with hover elevations and clear typography.

### Requirement: Full Markdown article reader view
The system SHALL provide a dedicated reader view at `/content/:slug` that fetches article details from `GET /api/v1/content/articles/{slug}` and parses the Markdown content using `marked` styled with `@tailwindcss/typography`.

#### Scenario: Opening an article
- **WHEN** the user clicks on an article card or navigates directly to `/content/:slug`
- **THEN** the system loads the article and renders headings, paragraphs, bulleted lists, and quotes with appropriate typography and readability spacing.

#### Scenario: Copying article link
- **WHEN** the user clicks the "Compartir" or "Copiar Enlace" button in the reader view
- **THEN** the system copies the current URL to the clipboard and triggers a confirmation toast notification.

#### Scenario: Returning to catalog
- **WHEN** the user clicks the "Volver a Artículos" back button
- **THEN** the system navigates back to `/content`.
