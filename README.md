# Scheduling System

A full-stack scheduling system built with React (Vite) for the frontend and Node.js/Express for the backend. Users can register, log in, set their availability, generate booking links, and allow others to book available slots.

## Features

- User authentication (register, login, logout)
- Set and manage availability
- Generate and share booking links
- Book available slots via public links
- Responsive, modern UI with Tailwind CSS

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Axios, Tailwind CSS, Formik, Yup
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

#### 1. Clone the repository

```sh
git clone <your-repo-url>
cd Scheduling System
```

#### 2. Install dependencies

##### For the backend:

```sh
cd server
npm install
```

##### For the frontend:

```sh
cd ../client
npm install
```

#### 3. Set up environment variables

- Create a `.env` file in the `server` directory with the following:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000
  ```

# env data shared in email

#### 4. Start the backend server

```sh
cd server
npm run dev
```

#### 5. Start the frontend (React) app

```sh
cd client
npm run dev
```

- Frontend will run at [http://localhost:5173](http://localhost:5173)
- Backend will run at [http://localhost:5000](http://localhost:5000)

## Folder Structure

- `client/` - React frontend
- `server/` - Node.js/Express backend

## Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend

- `npm start` - Start backend server

## License

This project is for educational/demo purposes.
