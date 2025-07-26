# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

# 👨‍⚕️ CareConnect – Appointment Booking App

CareConnect is a basic mobile application that allows patients to view a list of doctors, search for them by name or specialization, and book an appointment by selecting an available time slot. The app is built using modern technologies like React Native, Expo, and React Navigation.

## 🚀 Key Features

- **Doctor Listing:** Browse a comprehensive list of doctors in a clean and intuitive UI.
- **Search Functionality:** Filter doctors instantly by their name or specialization.
- **Doctor Details:** Tap on any doctor to view their detailed profile, including experience and ratings.
- **Appointment Booking:** Select from static time slots to book a new appointment.
- **Local Storage:** Booking data is persisted locally on the device using `AsyncStorage`.
- **Confirmation Screen:** A dedicated screen provides a clear confirmation of a successful booking.

## 🛠️ Technology Stack

- **React Native (Expo CLI):** For cross-platform mobile application development.
- **React Navigation:** To manage the navigation flow between different screens.
- **AsyncStorage:** Used for local persistence of booking data, ensuring data remains even after the app is closed.
- **TypeScript:** To ensure type-safety and improve code quality and maintainability.

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
