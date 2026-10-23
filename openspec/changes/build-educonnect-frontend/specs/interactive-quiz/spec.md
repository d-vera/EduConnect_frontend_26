## ADDED Requirements

### Requirement: Participant registration and single-page question view
The interactive quiz module SHALL prompt for the participant's name before or within the quiz, fetch questions from `GET /api/v1/quiz/questions`, and display all active questions on a single vertical scroll page with interactive option cards.

#### Scenario: Displaying questions
- **WHEN** the user navigates to `/quiz`
- **THEN** the system loads the list of questions and their answer choices without revealing correct answers.

#### Scenario: Selecting an answer option
- **WHEN** the user clicks an option card for question 1
- **THEN** the card transitions to an active/selected state, and the system records the selected option ID.

### Requirement: Quiz completion validation and submission
The system SHALL validate that an answer has been selected for every question and that a participant name has been entered before enabling submission to `POST /api/v1/quiz/submit`.

#### Scenario: Attempting submission with missing answers
- **WHEN** the participant clicks "Enviar Evaluación" without answering all questions
- **THEN** the system prevents submission, highlights the unanswered questions, and displays a warning notification.

#### Scenario: Successful submission
- **WHEN** all questions are answered, participant name is provided, and the user clicks submit
- **THEN** the system posts `{ participantName, selectedOptionIds }` to `/api/v1/quiz/submit` and receives the evaluation result.

### Requirement: Animated results gauge and qualitative feedback
Upon receiving the quiz submission response, the system SHALL render an animated percentage score gauge, qualitative feedback message, participant credentials, and options to retry or print a certificate card.

#### Scenario: Viewing evaluation score
- **WHEN** the submission completes successfully
- **THEN** the system displays the score (e.g. `100/100`), the percentage gauge, and the feedback string provided by the backend.

### Requirement: Attempt history persistence
The system SHALL persist the latest attempt ID in `localStorage` and allow users to view their previous evaluation result via `GET /api/v1/quiz/attempts/{id}`.

#### Scenario: Reloading the quiz page after submission
- **WHEN** a user with a saved attempt ID in `localStorage` visits `/quiz`
- **THEN** the system provides an option to review their previous score or start a new attempt.
