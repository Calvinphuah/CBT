# Cogni - CBT Web Application

A Progressive Web Application (PWA) built with Nuxt 3, implementing Cognitive Behavioral Therapy (CBT) techniques to assist users in managing thoughts and emotions. The application provides structured tools for mental wellness practice, with each user's entries kept private by Firestore security rules.

Live at [cogni-app.com](https://cogni-app.com).

## Features

- **Thought records** - Untangle a hard thought in 4 short steps: what happened, the thought, the feeling, and a clearer view
- **Gratitude** - Keep a list of small good things from each day
- **Guided meditation** - 8 tracks from 3 to 19 minutes
- **Three styles** - Clearing, Workbook and Companion, each in light and dark mode
- **Installable** - Works as an app on phone and desktop, and opens offline
- **Private Entries** - Firestore security rules let users read and write only their own entries

## Screenshots

All screenshots use made-up example entries.

### Clearing

| Home | Thought record | Saved | Gratitude | Meditate |
| --- | --- | --- | --- | --- |
| <img src="docs/screenshots/clearing-home.webp" width="160" alt="Clearing home"> | <img src="docs/screenshots/clearing-thought-record.webp" width="160" alt="Clearing thought record"> | <img src="docs/screenshots/clearing-saved.webp" width="160" alt="Clearing saved record"> | <img src="docs/screenshots/clearing-gratitude.webp" width="160" alt="Clearing gratitude"> | <img src="docs/screenshots/clearing-meditate.webp" width="160" alt="Clearing meditate"> |

### Workbook

| Home | Thought record | Saved | Gratitude | Meditate |
| --- | --- | --- | --- | --- |
| <img src="docs/screenshots/workbook-home.webp" width="160" alt="Workbook home"> | <img src="docs/screenshots/workbook-thought-record.webp" width="160" alt="Workbook thought record"> | <img src="docs/screenshots/workbook-saved.webp" width="160" alt="Workbook saved record"> | <img src="docs/screenshots/workbook-gratitude.webp" width="160" alt="Workbook gratitude"> | <img src="docs/screenshots/workbook-meditate.webp" width="160" alt="Workbook meditate"> |

### Companion

| Home | Thought record | Saved | Gratitude | Meditate |
| --- | --- | --- | --- | --- |
| <img src="docs/screenshots/companion-home.webp" width="160" alt="Companion home"> | <img src="docs/screenshots/companion-thought-record.webp" width="160" alt="Companion thought record"> | <img src="docs/screenshots/companion-saved.webp" width="160" alt="Companion saved record"> | <img src="docs/screenshots/companion-gratitude.webp" width="160" alt="Companion gratitude"> | <img src="docs/screenshots/companion-meditate.webp" width="160" alt="Companion meditate"> |

## Technology Stack

- **Framework:** [Nuxt 3](https://nuxt.com/)
- **Language:** TypeScript
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Hosting & Deployment:** Cloudflare Pages (builds from GitHub; every PR gets a preview link)
- **Authentication & Database:** Firebase (Auth & Firestore)
- **Encryption:** Web Crypto API (AES-GCM with a shared app key; this obscures entries at rest but is not end-to-end encryption, since the key ships in the client bundle)
- **UI Framework:** TailwindCSS

## Firestore Security Rules

Rules live in `firestore.rules` and are deployed with:

```bash
npx firebase-tools deploy --only firestore:rules
```

Deploying replaces the rules currently set in the Firebase console.

## PWA Installation

The application can be installed as a Progressive Web App on supported devices:

1.  Access the application through a compatible web browser
2.  Use the browser's install functionality:
    - Desktop: Look for the install icon in the address bar
    - Mobile: Use the browser's "Add to Home Screen" option
3.  Follow the installation prompts
4.  Access the application from your device's home screen
