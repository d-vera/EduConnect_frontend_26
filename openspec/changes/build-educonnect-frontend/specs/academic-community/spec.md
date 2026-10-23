## ADDED Requirements

### Requirement: Priority-filtered notice board
The academic community hub SHALL display announcements fetched from `GET /api/v1/announcements` and allow users to filter notices by priority level (`URGENT`, `NORMAL`, `INFO`, or all).

#### Scenario: Filtering announcements
- **WHEN** the user selects the "Urgentes" filter pill
- **THEN** the system filters the list to show only announcements with `priority == 'URGENT'` or requests `GET /api/v1/announcements?priority=URGENT`.

#### Scenario: Notice card display
- **WHEN** announcements are displayed
- **THEN** each card displays title, content, author name, author role, date formatted, and a priority badge with corresponding colors (red for URGENT, blue for NORMAL, slate for INFO).

### Requirement: Modal for posting announcements
The system SHALL provide a modal dialog allowing teachers and students to publish announcements by submitting `{ title, content, authorName, authorRole, priority }` to `POST /api/v1/announcements`.

#### Scenario: Publishing an announcement successfully
- **WHEN** the user fills out all required fields in the modal and clicks "Publicar Aviso"
- **THEN** the system sends the payload to `POST /api/v1/announcements`, closes the modal, triggers a success toast, and refreshes the announcements list.

#### Scenario: Form validation on empty fields
- **WHEN** any required field is empty when attempting to submit
- **THEN** the system marks the invalid input fields and prevents submission.

### Requirement: Student inquiry box (Buzón de Consultas)
The academic community hub SHALL provide a contact form allowing students to submit inquiries directly to teachers by sending `{ studentName, studentEmail, topic, message }` to `POST /api/v1/queries`.

#### Scenario: Submitting an academic inquiry
- **WHEN** a student enters a valid name, email, topic, and message and clicks "Enviar Consulta"
- **THEN** the system submits the payload to `POST /api/v1/queries`, clears the form, and displays a success notification confirming receipt.

#### Scenario: Invalid email format
- **WHEN** a student enters an invalid email format
- **THEN** the system displays an inline validation message stating that a valid email address is required.
