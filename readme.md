# 🎵 VibeRoom - Music Streaming & Social Platform

## 📋 Project Overview
![SS-1](/frontend/public/ss1.png)




![SS-2](/frontend/public/ss2.png)


VibeRoom is a comprehensive music streaming and social interaction platform that combines the best of music discovery, streaming, and real-time communication. Built with cutting-edge technologies, VibeRoom offers users a seamless experience to enjoy music, connect with friends, and explore new sounds.

## 🚀 Features

### 🎧 Music Streaming
- Real-time music playback
- Personalized playlists
- Song recommendations
- Music discovery

### 💬 Social Interaction
- In-app messaging
- Friend activity tracking
- Collaborative playlists
- Music sharing

### 👑 Admin Panel
- User management
- Content moderation
- Analytics dashboard
- Platform configuration

## 💻 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Shadcn/UI
- Clerk Authentication
- Zustand (State Management)

### Backend
- Node.js
- Express.js
- MongoDB
- Cloudinary (Media Storage)

### Authentication
- Clerk Authentication

### Additional Services
- Cloudinary (Media Management)
- MongoDB Atlas (Database)

## 🔧 Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account
- Clerk Account
- Cloudinary Account

## 🛠️ Environment Setup

Create a `.env` file in the root of your backend directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb+srv://your-connection-string
ADMIN_EMAIL=your-admin-email@example.com
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
NODE_ENV=development
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
```

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📂 Project Structure

### Backend (`/backend`)
- `src/`
  - `controller/`: Business logic handlers
  - `lib/`: Utility functions
  - `middleware/`: Request processing middleware
  - `models/`: Database schema definitions
  - `routes/`: API endpoint definitions
- `index.js`: Main server entry point

### Frontend (`/frontend`)
- `src/`
  - `components/`: Reusable React components
  - `pages/`: Page-level components
  - `stores/`: Zustand state management
  - `types/`: TypeScript type definitions
  - `lib/`: Utility functions
- `App.tsx`: Main application component

## 🔐 Authentication

VibeRoom uses Clerk for secure, multi-method authentication:
- Email/Password
- Social Logins
- Passwordless Authentication

## 🌐 Deployment

### Backend
- Recommended: Render, Heroku, or DigitalOcean
- Ensure MongoDB Atlas connection
- Set environment variables

### Frontend
- Recommended: Vercel, Netlify
- Configure environment variables
- Set up custom domain

## 🔍 Key Dependencies

### Backend
- Express
- Mongoose
- Cloudinary
- Cors
- Dotenv

### Frontend
- React
- TypeScript
- Tailwind CSS
- Zustand
- Clerk React
- Lucide React

## 🛡️ Security Practices

- Environment variable protection
- Clerk authentication
- HTTPS enforcement
- Input validation
- Rate limiting
- CORS configuration

## 📊 Performance Optimization

- Lazy loading
- Code splitting
- Memoization
- Efficient state management
- Cloudinary image optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

Specify your project's license (e.g., MIT, Apache 2.0)

## 🚨 Troubleshooting

- Ensure all environment variables are correctly set
- Check MongoDB Atlas network access
- Verify Clerk authentication configuration
- Review Cloudinary media upload settings

## 📞 Support

For issues or questions, please open a GitHub issue or contact support@viberoom.com

## 🌟 Acknowledgments

- Clerk Authentication
- MongoDB
- Cloudinary
- React Community
```