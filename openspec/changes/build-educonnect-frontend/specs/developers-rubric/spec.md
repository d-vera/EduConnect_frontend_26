## ADDED Requirements

### Requirement: Institutional accreditation and team member profiles
The developers page (`/developers`) SHALL fetch institutional and team metadata from `GET /api/v1/developers` and display the institution header (Instituto Técnico Nacional de Comercio "Federico Álvarez Plata" Nocturno, Materia: Diseño y Programación Web III, Gestión 2026), alongside team member profiles (Dennis Vera, roles, bio, and GitHub link).

#### Scenario: Rendering team profiles
- **WHEN** the user visits `/developers`
- **THEN** the system displays the institutional credentials, academic course name, and Dennis Vera's profile card with avatar and GitHub profile link.

### Requirement: Interactive technology stack matrix
The developers page SHALL display an interactive comparison matrix detailing the full-stack architecture: Backend (Scala 3, ZIO 2, sttp Tapir, zio-http, PostgreSQL, Flyway) and Frontend (Angular 17+, Tailwind CSS), complete with academic justifications for functional reactive programming and type safety.

#### Scenario: Exploring tech stack layers
- **WHEN** the user views the tech stack matrix
- **THEN** the system presents categorized cards (Backend Runtime, API Specification, HTTP Server Engine, Database Access, Database Migrations, Frontend Integration) with version badges and technical rationale.

### Requirement: Contest evaluation rubric compliance checklist
The developers page SHALL display an interactive checklist detailing the 100-point contest rubric breakdown:
1. Funcionalidad Técnica Completa (25 pts)
2. Calidad Temática en Comunicación Efectiva (25 pts)
3. Experiencia de Usuario y Diseño Responsivo (25 pts)
4. Innovación Tecnológica con Scala/ZIO y Angular Signals (25 pts)

#### Scenario: Viewing rubric compliance
- **WHEN** the user reviews the contest compliance section
- **THEN** the system displays all 4 rubric dimensions with their 25-point weighting and explicit evidence points showing how EduConnect meets each requirement.
