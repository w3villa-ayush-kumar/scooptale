# Scooptale

Scooptale is a full-stack movie community platform where fans discover movies and share reviews. The project includes a React + Vite client and an Express + MongoDB API that handles authentication, plans, reviews, payments, and integrations with external services.

## Features

- Browse trending films and detailed movie pages.
- Community reviews with user profiles and PDF exports.
- Authentication with email/password plus Google/Facebook OAuth.
- Subscription plans and Stripe payments.
- Media uploads via Cloudinary and email notifications.

## Tech Stack

**Client**

- React 19 + Vite
- React Router
- Tailwind CSS

**Server**

- Node.js + Express
- MongoDB + Mongoose
- Passport OAuth, JWT auth
- Stripe, Cloudinary, Nodemailer

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB instance

### 1) Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2) Configure environment variables

Create `.env` files for both the client and server.

#### `server/.env`

```bash
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
BACKEND_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_FROM="Scooptale <noreply@example.com>"

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

TMDB_API_KEY=your_tmdb_key
TMDB_BASE_URL=https://api.themoviedb.org/3

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

#### `client/.env`

```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### 3) Run the app

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

The API will be available at `http://localhost:5000` and the client at `http://localhost:5173`.

## Scripts

### Client

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Server

```bash
npm run dev
npm run start
```

## Project Structure

```
.
├── client/        # React + Vite front-end
└── server/        # Express API + MongoDB
```
