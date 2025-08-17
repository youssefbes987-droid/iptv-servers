# Vmax IPTV Sales Management System

## Project Overview
A comprehensive IPTV sales management system that has been successfully migrated from Bolt to Replit with modern full-stack architecture. The system provides role-based dashboards for managers, salespeople, and customer service representatives.

## Architecture
- **Backend**: Express.js server with proper API routes for authentication and user management
- **Frontend**: React with wouter routing and React Query for data fetching
- **Database**: In-memory storage (MemStorage) with mock user data
- **Authentication**: Backend API-based authentication with JWT-style user sessions
- **Styling**: Tailwind CSS with custom gradients and responsive design

## Key Features
- Role-based authentication (Manager, Salesman, Customer Service)
- Modern dashboard with performance metrics
- Secure client-server separation
- Responsive design with beautiful UI
- Demo accounts for testing

## User Roles
1. **Manager** (admin/password) - Full system access with analytics
2. **Salesman** (sales1/password) - Sales-focused dashboard with targets
3. **Customer Service** (cs1/password) - Support operations interface

## Recent Changes (January 2025)
- Migrated from Bolt to Replit environment
- Updated schema to match user requirements with proper types
- Created backend API routes for secure authentication
- Implemented wouter routing instead of manual state management
- Added React Query for proper data fetching patterns
- Fixed DOM nesting warnings in navigation components
- Set up proper client-server separation for security

## Tech Stack
- **Frontend**: React 18, wouter, React Query, Tailwind CSS, Lucide React icons
- **Backend**: Express.js, TypeScript, Zod validation
- **Build**: Vite, esbuild
- **Development**: tsx, hot module replacement

## Development Setup
The project uses the standard Replit full-stack JavaScript template:
- Run `npm run dev` to start development server
- Backend serves on port 5000 with API routes prefixed with `/api`
- Frontend uses Vite for hot module replacement
- All dependencies are pre-installed

## User Preferences
- Clean, professional UI design
- Secure authentication patterns
- Modern React development practices
- Responsive design for all device sizes
- Fast migration with minimal disruption

## Migration Status
✅ Successfully migrated from Bolt to Replit
✅ Backend API routes implemented
✅ Frontend modernized with proper patterns
✅ Authentication system working
✅ All demo accounts functional
✅ UI responsive and polished