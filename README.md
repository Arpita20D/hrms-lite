# HRMS Lite - Human Resource Management System

A lightweight, full-stack web application for managing employee records and tracking daily attendance.

## 🚀 Live Demo

- **Frontend URL**: [Your deployed frontend URL]
- **Backend API**: [Your deployed backend URL]
- **GitHub Repository**: [Your repository URL]

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Assumptions & Limitations](#assumptions--limitations)

## 📖 Overview

HRMS Lite is a professional web-based Human Resource Management System that enables administrators to efficiently manage employee records and track daily attendance. The application features a clean, intuitive interface with complete CRUD operations for employees and comprehensive attendance tracking capabilities.

## ✨ Features

### Employee Management
- ✅ Add new employees with unique ID, name, email, and department
- ✅ View all employees in a clean table format
- ✅ Delete employees (cascades to attendance records)
- ✅ Real-time form validation
- ✅ Duplicate employee ID and email prevention

### Attendance Management
- ✅ Mark daily attendance (Present/Absent)
- ✅ View all attendance records
- ✅ Filter attendance by employee
- ✅ Prevent duplicate attendance for same date
- ✅ Date-based attendance tracking

### Dashboard (Bonus)
- ✅ Total employees count
- ✅ Total attendance records
- ✅ Today's present/absent statistics
- ✅ Quick action buttons

### Additional Features
- ✅ Professional, production-ready UI
- ✅ Loading states and error handling
- ✅ Empty state messages
- ✅ Success/Error notifications
- ✅ Responsive design
- ✅ Form validation with error messages
- ✅ Confirmation dialogs for delete operations

## 🛠 Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **React Router DOM** 6.20.0 - Client-side routing
- **Axios** 1.6.2 - HTTP client for API calls
- **CSS3** - Styling (no framework dependencies)

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.0.0 - MongoDB ODM
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

### Deployment
- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway
- **Database**: MongoDB Atlas (Cloud)

## 📁 Project Structure

```
hrms-lite/
├── backend/
│   ├── models/
│   │   ├── Employee.js          # Employee schema
│   │   └── Attendance.js        # Attendance schema
│   ├── routes/
│   │   ├── employees.js         # Employee API routes
│   │   └── attendance.js        # Attendance API routes
│   ├── server.js                # Express server setup
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js     # Dashboard page
│   │   │   ├── Employees.js     # Employee management
│   │   │   └── Attendance.js    # Attendance management
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main app component
│   │   ├── App.css              # Global styles
│   │   └── index.js             # App entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hrms-lite
# For MongoDB Atlas use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrms-lite
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
# For production, use your deployed backend URL:
# REACT_APP_API_URL=https://your-backend-url.com/api
```

5. Start the frontend development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

### Running the Full Application

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

Visit `http://localhost:3000` in your browser.

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Employee Endpoints

#### Get All Employees
```http
GET /employees
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "employeeId": "EMP001",
      "fullName": "John Doe",
      "email": "john@example.com",
      "department": "Engineering",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Employee
```http
GET /employees/:id
```

#### Create Employee
```http
POST /employees
Content-Type: application/json

{
  "employeeId": "EMP001",
  "fullName": "John Doe",
  "email": "john@example.com",
  "department": "Engineering"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": { ... }
}
```

#### Delete Employee
```http
DELETE /employees/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Employee and associated attendance records deleted successfully"
}
```

### Attendance Endpoints

#### Get All Attendance Records
```http
GET /attendance
GET /attendance?employeeId=EMP001  # Filter by employee
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "employeeId": "EMP001",
      "date": "2024-01-01T00:00:00.000Z",
      "status": "Present",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Mark Attendance
```http
POST /attendance
Content-Type: application/json

{
  "employeeId": "EMP001",
  "date": "2024-01-01",
  "status": "Present"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": { ... }
}
```

#### Get Attendance Summary
```http
GET /attendance/summary/:employeeId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "totalPresent": 20,
    "totalAbsent": 3,
    "totalDays": 23
  }
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details (in development mode)"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🚀 Deployment

### Backend Deployment (Render)

1. Create account on [Render](https://render.com)

2. Create new Web Service:
   - Connect GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `PORT`: (Render sets this automatically)

4. Deploy and note the service URL

### Frontend Deployment (Vercel)

1. Create account on [Vercel](https://vercel.com)

2. Import GitHub repository

3. Configure:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. Add environment variable:
   - `REACT_APP_API_URL`: Your deployed backend URL

5. Deploy

### MongoDB Atlas Setup

1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Create a cluster (Free tier M0 is sufficient)

3. Database Access:
   - Create database user with password
   - Note username and password

4. Network Access:
   - Add IP: `0.0.0.0/0` (Allow from anywhere) for production
   - Or add specific IPs for better security

5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

6. Use this connection string in backend `.env` as `MONGODB_URI`

## 📸 Screenshots

[Add screenshots of your application here after deployment]

- Dashboard view
- Employee management
- Add employee form
- Attendance tracking
- Mobile responsive view

## ⚙️ Assumptions & Limitations

### Assumptions
1. **Single Admin User**: No authentication/authorization implemented
2. **Basic Employee Data**: Only essential fields (ID, name, email, department)
3. **Simple Attendance**: Binary status (Present/Absent) without time tracking
4. **Single Organization**: System designed for one organization

### Limitations
1. **No Authentication**: Anyone with the URL can access and modify data
2. **No User Roles**: Single admin role, no employee self-service portal
3. **No Edit Employee**: Employees can only be added or deleted, not edited
4. **No Attendance Edit/Delete**: Once marked, attendance cannot be modified
5. **No Reporting**: Limited to basic dashboard stats
6. **No File Uploads**: No support for profile pictures or documents
7. **No Email Notifications**: No automated emails for any actions
8. **No Leave Management**: Out of scope as per requirements
9. **No Payroll**: Out of scope as per requirements
10. **Date-only Tracking**: No time-in/time-out tracking

### Future Enhancements (Out of Scope)
- User authentication and authorization
- Edit employee details
- Edit/delete attendance records
- Advanced reporting and analytics
- Leave management system
- Payroll integration
- Employee self-service portal
- Document management
- Email notifications
- Mobile application
- Export to Excel/PDF
- Multi-organization support
- Audit logs

## 👨‍💻 Development

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build
```

### Code Quality
- Follow ES6+ JavaScript standards
- Use meaningful variable and function names
- Add comments for complex logic
- Handle errors gracefully
- Validate all inputs

## 📝 License

This project is created as part of a coding assignment.

## 🤝 Contributing

This is an assignment project and is not open for contributions.

## 📧 Contact

For any queries regarding this project, please contact: [Your contact information]

---

**Note**: Replace placeholder URLs and add actual deployment links before final submission.