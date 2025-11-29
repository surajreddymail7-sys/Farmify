# Farmify - Modern Farming Platform

A full-stack React application connecting farmers with resources, community posts, and agricultural guidance.

## Features

- 🔐 User Authentication (JWT)
- 📝 Social Feed (Create, like, comment)
- 🌱 Agriculture Plans & Resources
- 🌍 Multilingual (10 Indian languages)
- 👤 User Profiles & Stats
- 🎨 Modern UI with green gradients
- ⚡ Real-time updates

## Tech Stack

- React 19 + Vite 7
- React Router DOM 7
- Node.js + Express
- MongoDB Atlas
- JWT Authentication

## Quick Start

**Backend:**
```bash
cd backend
npm install
npm run dev  # Port 5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev  # Port 5173
```

## Environment Setup

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

**Backend `.env`:**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Application Routes

- `/` - Landing page
- `/auth` - Login/Signup
- `/dashboard` - Main feed
- `/resources` - Agriculture plans
- `/articles` - Coming soon
- `/ai` - AI assistant
- `/account` - User profile

## API Endpoints

- `POST /api/auth/register|login`
- `GET /api/posts`
- `POST /api/posts`
- `PUT /api/posts/:id/like`
- `PUT /api/users/profile`

## License

MIT
