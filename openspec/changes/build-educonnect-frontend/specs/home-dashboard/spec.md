## ADDED Requirements

### Requirement: Contest presentation and live metrics display
The home dashboard SHALL display the contest motto, the official theme badge (#5 Comunicación Efectiva), and live counter cards showing total articles, quiz question pool, and active announcements fetched from `GET /api/v1/home/summary`.

#### Scenario: Successful summary loading
- **WHEN** a user visits the home page (`/`)
- **THEN** the system requests `/api/v1/home/summary` and displays the metric counters for articles, questions, and announcements, along with the hero title and motto.

#### Scenario: Summary loading error handling
- **WHEN** the backend service is temporarily unreachable during home page load
- **THEN** the system displays fallback placeholders and a non-blocking toast warning indicating connection issues.

### Requirement: Urgent academic notice banner
The home dashboard SHALL evaluate the `recentAnnouncements` array from `/api/v1/home/summary` and render a high-priority alert bar if any announcement has `priority == 'URGENT'`.

#### Scenario: Display urgent announcement
- **WHEN** there is at least one announcement with `priority: "URGENT"` in the home summary
- **THEN** the system renders a prominent red/amber urgent banner at the top of the content area with the title and content.

#### Scenario: No urgent announcements present
- **WHEN** none of the recent announcements have `priority: "URGENT"`
- **THEN** the system omits the urgent banner without leaving empty visual spaces.

### Requirement: Featured educational articles and quick actions
The home dashboard SHALL display featured articles with reading time, author, and category badge, plus Call-To-Action (CTA) buttons linking directly to the articles and the interactive quiz.

#### Scenario: Clicking explore articles CTA
- **WHEN** the user clicks the "Explorar Artículos" CTA button in the hero section
- **THEN** the system navigates to the `/content` route.

#### Scenario: Clicking start quiz CTA
- **WHEN** the user clicks the "Hacer el Quiz" CTA button
- **THEN** the system navigates to the `/quiz` route.
