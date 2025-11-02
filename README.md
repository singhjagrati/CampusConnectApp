# Campus Connect App

A modern full-featured Campus Events and Community platform built in React Native (with Expo).

Discover, register, and join campus events, upload photos, share events, and connect with organizers — all on your mobile!

---

## Features

- Beautiful light & dark mode with instant theme toggle
- Event registration, sharing, and Google Calendar booking
- Photo upload for registered events (Expo Image Picker, max 3 per event)
- Multiscreen bottom tab navigation (Home, Events, Live, About)
- Contact organizers (email), get directions via Google Maps
- Rate and review events
- 100% responsive UI (Android & iOS tested)
- Context-based registration and theme management

---

## Demo/Test API

- [CampusConnect Mock API](https://6904c0616b8dabde4964fc0f.mockapi.io/api/cc/CampusConnect)

---

## Installation

1. Clone the repo:
    ```
    git clone https://github.com/singhjagrati/CampusConnectApp.git
    cd CampusConnectApp
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Run on your device/simulator:
    ```
    npx expo start
    ```

---

## Usage

- Switch between dark/light modes using toggle at top right.
- Register/unregister for campus events.
- Upload event photos (up to 3 per event, needs camera roll permission).
- Directly share events, add to Google Calendar, email event organizers, and view locations in maps.

---

## Requirements

- Node.js >= 16
- NPM or Yarn
- Latest Expo Go (on iOS or Android)
- Camera roll permissions for photo upload

---

## Folder Structure
CampusConnectApp/
├── src/
│   ├── components/
│   │   ├── EventCard.js
│   │   ├── eventsApi.js
│   │   └── SearchBar.js
│   ├── contexts/
│   │   └── EventRegistrationContext.js
│   ├── navigation/
│   │   ├── MainNavigator.js
│   │   └── TabNavigator.js
│   ├── screens/
│   │   ├── AboutScreen.js
│   │   ├── EventDetailsScreen.js
│   │   ├── HomeScreen.js
│   │   ├── LiveSessionsScreen.js
│   │   └── RegisteredEventsScreen.js
│   └── assets/
├── .expo/
├── .gitignore
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
└── README.md

text

---

## License

Feel free to fork, extend, or use for your own campus/community projects!

---

**Made with using React Native + Expo**


