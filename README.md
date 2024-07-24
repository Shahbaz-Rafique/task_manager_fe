# Task Manager Project

## Introduction

Welcome to the Task Manager Project! This application is designed to help users manage tasks, activities, and user profiles efficiently. The front-end is built using React and provides a user-friendly interface for handling various task-related operations.

## Project Structure

### Root Directory

- **index.html**
  - The main HTML file that serves as the entry point for the web application. It contains the root `<div>` where the React application will be mounted.

- **README.md**
  - This file, which contains instructions on how to set up, run, and use the project.

### Source Directory (src)

- **App.jsx**
  - The main application component. It typically includes the routing logic and the structure for the entire app.

- **main.jsx**
  - The entry point for the React application. This file renders the `App` component into the DOM.

- **index.css**
  - Global CSS styles for the application.

### Assets

- **src/assets/images/**
  - Contains image files (`gold.png`, `platinum.png`, `profile.png`, `silver.png`) used in the application for various UI elements like profiles or badges.

### Components

These are reusable pieces of UI used throughout the application:

- **activities/index.jsx**
  - Component related to displaying or managing activities, likely showing a list of user or task activities.

- **badge/index.jsx**
  - Component for displaying badges, which might represent user achievements or statuses.

- **buttons/index.jsx**
  - Component for rendering different types of buttons.

- **datepicker/index.jsx**
  - Component for date selection.

- **layout/authLayout.jsx**
  - Layout component for authentication-related pages (e.g., sign-in, sign-up). It provides a consistent look and feel for all authentication pages.

- **layout/defaultLayout.jsx**
  - Default layout component used across most pages of the application, ensuring a consistent structure and styling.

- **modal/index.jsx**
  - Component for modal dialogs, which are used to show pop-up windows for user actions or notifications.

- **navbar/index.jsx**
  - Component for the navigation bar, providing links to different sections of the application.

- **progress/index.jsx**
  - Component for displaying progress bars, indicating task completion status or other progress metrics.

- **subTaskList/index.jsx**
  - Component for listing subtasks, likely showing a breakdown of tasks into smaller, manageable pieces.

- **table/index.jsx**
  - Component for displaying data in table format, useful for structured information like task lists or reports.

- **taskList/index.jsx**
  - Component for listing tasks, probably the main task view in the application.

- **uploadImg/index.jsx**
  - Component for handling image uploads, allowing users to upload profile pictures or other images.

- **userinfo/index.jsx**
  - Component for displaying user information, such as profile details and activity stats.

### Constants

- **constant/index.jsx**
  - Contains constants used throughout the application, such as URLs, static values, or configuration settings.

### Pages

These are the main views or pages in the application:

- **dashboard.jsx**
  - The dashboard page, possibly showing an overview of tasks and activities, providing quick access to essential information.

- **DashboardMainPage.jsx**
  - Main content of the dashboard, likely integrating various components to display user-specific data.

- **errorPage.jsx**
  - Page displayed for handling errors (e.g., 404 page), informing users when something goes wrong.

- **handleTasks.jsx**
  - Page for handling task-related actions, such as creating, updating, or deleting tasks.

- **hanldeSubTasks.jsx**
  - Page for handling subtask-related actions, similar to `handleTasks.jsx` but focused on subtasks.

- **InvitedTasks.jsx**
  - Page for displaying tasks the user has been invited to, showing collaborative tasks or assignments.

- **newProfile.jsx**
  - Page for creating a new user profile, guiding users through the setup process.

- **profile.jsx**
  - User profile page, displaying personal information and user-specific data.

- **reports.jsx**
  - Page for displaying reports, providing insights and analytics on tasks and activities.

- **settings.jsx**
  - Settings page for configuring user preferences, allowing customization of the application.

- **signIn.jsx**
  - Sign-in page, allowing users to log into the application.

- **signUp.jsx**
  - Sign-up page, allowing new users to register an account.

- **TaskNotes.jsx**
  - Page for managing notes related to tasks, providing a place to add and view task-specific notes.

- **userActivity.jsx**
  - Page displaying user activity, showing recent actions and changes made by the user.

### Styling

- **styling/date.css**
  - CSS specific to date-related components or pages, providing styles for date pickers or calendars.

## Installation

### Prerequisites

- Node.js (version 12.x or later)
- npm (version 6.x or later) or yarn (version 1.x or later)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/task-manager.git
   cd task-manager
