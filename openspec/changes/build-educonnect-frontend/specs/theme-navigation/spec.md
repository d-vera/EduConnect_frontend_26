## ADDED Requirements

### Requirement: Sticky translucent navigation and responsive menu
The application SHALL provide a sticky top navigation bar featuring the EduConnect logo, the #5 "Comunicación Efectiva" theme tag, links to all main routes (`/`, `/content`, `/quiz`, `/comunidad`, `/developers`), an external link to Swagger docs (`http://localhost:8080/docs`), a theme mode toggle button, and a collapsible mobile hamburger menu.

#### Scenario: Navigating between routes
- **WHEN** the user clicks any navigation link (e.g., "Cuestionario")
- **THEN** the system smoothly routes to `/quiz` and marks the active link with visual highlights.

#### Scenario: Mobile viewport responsiveness
- **WHEN** the viewport width is below `768px` (mobile)
- **THEN** the system collapses the navigation links into a hamburger menu button that opens a drawer or mobile dropdown when tapped.

### Requirement: Dark and light theme toggle with local storage persistence
The system SHALL provide a theme toggle control that switches the visual appearance between light mode and dark mode, toggling the `.dark` class on the root `<html>` element and persisting the user's choice in `localStorage`.

#### Scenario: Toggling dark mode
- **WHEN** a user in light mode clicks the theme toggle button
- **THEN** the system applies the dark theme immediately, updates the toggle icon to a sun/light indicator, and saves `"dark"` to `localStorage`.

#### Scenario: Persisting theme across page reloads
- **WHEN** a user reloads the application after previously selecting dark mode
- **THEN** the system reads the stored preference and automatically initializes the application with the dark theme enabled.

### Requirement: Centralized toast notification system
The system SHALL provide a toast notification service and container to display non-blocking success, error, and info messages with auto-dismiss after 4 seconds.

#### Scenario: Displaying an error notification
- **WHEN** an HTTP request fails or an error is dispatched to `ToastService`
- **THEN** the system renders a floating toast card with an error icon, message, and a close button at the bottom-right or top-right of the screen.
