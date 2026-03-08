# Bibek Labs - Personal Brand Portfolio

Modern personal brand portfolio website for Bibek - Full Stack Developer, AI Builder, and Automation Expert.

## Features

- Modern dark theme with smooth animations
- Responsive design for mobile and desktop
- SEO optimized
- Blog system
- Digital product store with Stripe integration
- Contact form with email notifications
- Newsletter subscription
- Admin dashboard
- JWT authentication

## Tech Stack

### Frontend
- Next.js 14
- React.js
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Nodemailer
- Stripe

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bibek-portfolio
```

2. Install dependencies
```bash
npm install
```

3. The .env file has been created with default values

4. Update .env with your credentials:
   - For MongoDB: Use local MongoDB or MongoDB Atlas connection string
   - For Email: Use Gmail with App Password (not regular password)
   - For Stripe: Get keys from Stripe Dashboard

5. Start MongoDB:

**Option 1: Local MongoDB**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service

**Option 2: MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update MONGODB_URI in .env

**Option 3: Quick Start (No MongoDB)**
- The server will try to connect but continue running
- You can test the frontend without database features

6. Run development servers

Frontend:
```bash
npm run dev
```

Backend:
```bash
npm run server:dev
```

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
├── server/             # Express backend
│   ├── models/         # MongoDB models
│   └── routes/         # API routes
├── public/             # Static assets
└── package.json
```

## Environment Variables

See `.env.example` for required environment variables.

## Deployment

### Frontend (Vercel)
```bash
npm run build
```

### Backend (Railway/Render)
```bash
npm run server
```

## License

MIT
