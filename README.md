Multi-role access (Caretaker & Patient)

Prescription management (Caretaker edits, Patient views)

Reminder system (Caretaker sets → Patient receives)

LLM assistant (with prescription context & disclaimers)

SOS button (location + emergency contact)

Wearable integration (basic vitals reading)

That’s a lot for 24h — but still possible if we strip it down to lightweight implementations for SOS & wearable data.

Plan to Make This Work
We’ll prioritize speed over complexity:

1. Multi-role Login
Firebase Auth (Email/Password).

Firestore stores "role": "caretaker" or "patient".

Role-based UI.

2. Prescription Management
Firestore collection: /patients/{patientId}/prescriptions.

Caretaker: Add/edit/delete.

Patient: Read-only.

3. Reminder System
Stored in Firestore with time + message.

On patient device → fetch reminders → flutter_local_notifications to trigger alerts locally.

Caretaker changes → instantly synced to patient.

4. LLM Assistant
OpenAI gpt-4o-mini API (fast & cheap).

Pass prescriptions + last 5 messages as context.

Display a red disclaimer: “This is not a substitute for medical advice.”

5. SOS Button
Patient app has big red SOS button.

On tap → get GPS via geolocator → send SMS to caretaker/emergency contact using telephony package.

Optional: Also push a notification to caretaker app via Firebase Cloud Messaging.

6. Wearable Integration
Simplest path: Use Google Fit API or Health Connect (on Android) to pull steps, heart rate, SpO₂ if the wearable already syncs there.

For demo: Even if you don’t have a wearable, use mock data but show the “connected” screen.

Show vitals on caretaker dashboard with warning if abnormal