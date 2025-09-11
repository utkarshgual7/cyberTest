# CyberTest Full-Stack Application

This project contains a React frontend (vite-project) and Node.js backend (server) that can be run together with a single command.

## Quick Start

### Development Mode
Run both frontend and backend in development mode:
```bash
npm run dev
```
This will start:
- Backend server on port 5000
- Frontend development server on port 5173 (Vite default)

### Production Mode
Build and run in production mode:
```bash
npm run build
npm start
```

### Individual Commands

#### Install all dependencies
```bash
npm run install:all
```

#### Run only backend
```bash
npm run server:dev    # Development mode
npm run server:start  # Production mode
```

#### Run only frontend
```bash
npm run client:dev     # Development mode
npm run client:build   # Build for production
npm run client:preview # Preview production build
```

## Project Structure
```
cyberTest/
├── server/          # Node.js backend
├── vite-project/    # React frontend
├── package.json     # Root package.json with scripts
└── DEPLOYMENT.md    # This file
```

## Deployment

1. Install all dependencies: `npm run install:all`
2. Build the frontend: `npm run build`
3. Start both services: `npm start`

The application will be ready for deployment with both frontend and backend running concurrently.