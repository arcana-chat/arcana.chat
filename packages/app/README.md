# ⌨️ Arcana App

This is where the entirety of major features for the app lives. This is formatted to share code between web & native without jumping between too many files. The goal of this is to split each `feature` up and then create related items back at their app roots. They should corespond 1:1 to the name of the route you're working on.

## ⚛️ Atoms

The `atoms` folder is where we keep all our [Jotai](https://jotai.org/) atoms. These are small, composable pieces of state that we use throughout the app to manage things like user authentication, API requests, and more. Think of them like the building blocks of our app's state.

## 📦 Components

The Components folder is where we keep all our shared components that aren't direct UI building blocks. These might include things like form components, utility components, or other reusable pieces of code that we use throughout the app.

## 👩‍🎤 Features

The Features folder is where we keep all our app's screens and features. Each feature corresponds to a related app screen or feature, and contains all the code necessary to render that screen or feature. This is where the magic happens!

## 🪄 Providers

The Provider folder is where we keep all our app's context providers. These providers are used to manage different app contexts, like the user's authentication state or the app's theme. By keeping them all in one place, we can easily manage and update our app's state.

## 🛠️ Utils

The Utils folder is where we keep all our general utility functions and modules. These might include things like date formatting functions, API client modules, or other general-purpose code that we use throughout the app.
