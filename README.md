
# Gender Reveal Project

This project is a **gender reveal** platform built using modern technologies like **React**, **Express**, **MongoDB**, and **TailwindCSS**. It allows users to register, login, and cast their vote for either "Boy" or "Girl". The application is designed to display voting results in real time, providing a simple and interactive user experience.

## Key Features

- **User Registration and Login:** Users can securely register and log in to cast their vote.
- **Vote Tracking:** Votes for "Boy" and "Girl" are stored and tracked in real-time using MongoDB.
- **Email Notifications:** After successful registration, users receive a confirmation email.
- **Language Support:** The app supports multiple languages, including English and Ukrainian, using **i18next**.
- **Chart Visualization:** The voting results are displayed visually using **Chart.js**.
- **Responsive UI:** Styled with **TailwindCSS** for a responsive and modern user interface.

## Technology Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Express, Node.js
- **Database:** MongoDB
- **Internationalization:** i18next
- **Email Notifications:** Nodemailer
- **Vote Charts:** Chart.js

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gender-reveal.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Start the backend:
   ```bash
   npm start
   ```

5. Access the app at `http://localhost:3000`.

## Folder Structure

- `/src` – Contains the React components.
- `/server.js` – Backend server setup with Express and MongoDB.
- `/tailwind.config.js` – TailwindCSS configuration.
- `/package.json` – Lists dependencies and scripts.
  
## License

This project is licensed under the MIT License.
