# Cogni - CBT Web Application

A Progressive Web Application (PWA) built with Nuxt 3, implementing Cognitive Behavioral Therapy (CBT) techniques to assist users in managing thoughts and emotions. The application provides structured tools for mental wellness practice, with each user's entries kept private by Firestore security rules.

## Features

- **CBT Tools** - Evidence-based thought analysis and restructuring
- **Guided Exercises** - Structured CBT worksheets and activities
- **Private Entries** - Firestore security rules let users read and write only their own entries

## Technology Stack

- **Framework:** [Nuxt 3](https://nuxt.com/)
- **Language:** TypeScript
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Hosting & Deployment:** Netlify
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
