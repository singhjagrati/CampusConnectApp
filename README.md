# CampusConnectApp# Campus Connect App

A modern, full-featured Campus Events and Community platform built in React Native with Expo.

Discover, register, and join campus events, upload photos, share events, and connect with organizers — all on your mobile!

## Features

- **Beautiful light & dark mode with instant theme toggle**
- **Event registration, sharing, and calendar booking**
- **Photo upload for registered events (Expo Media Library/Pickers)**
- **Multiscreen bottom tab navigation**
- **Contact organizers and get directions via Google Maps**
- **Rate and review events**
- **Reusable context system for registration and theming**
- 100% responsive UI, tested on Android and iOS

## Installation

1. **Clone the repo**
    ```
    git clone https://github.com/YOUR_USERNAME/campus-connect-app.git
    cd campus-connect-app
    ```
2. **Install dependencies**
    ```
    npm install
    ```
3. **Start the Expo app**
    ```
    npx expo start
    ```

## Usage

- Use the toggle button at the top right to switch between dark and light mode at any time.
- Register/unregister for campus events.
- Upload event photos (max 3 per event) — permissions to photo library required!
- Share events, add them to your Google Calendar, email/text organizers, and view locations in maps.

## Requirements

- Node.js >= 16
- Expo Go (latest) on mobile for development/testing
- Permissions to camera roll (photo upload)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

## Folder Structure

├── App.js
├── components/
│ └── ThemeToggleButton.js
├── contexts/
│ ├── ThemeContext.js
│ └── EventRegistrationContext.js
├── navigation/
│ ├── MainNavigator.js
│ └── TabNavigator.js
├── screens/
│ ├── AboutScreen.js
│ ├── HomeScreen.js
│ ├── RegisteredEventsScreen.js
│ ├── EventDetailsScreen.js
│ └── LiveSessionsScreen.js
├── package.json
¬.gitignore

## License

Feel free to fork, extend, and use for learning or your own campus projects!

---

**Made with using React Native + Expo**

