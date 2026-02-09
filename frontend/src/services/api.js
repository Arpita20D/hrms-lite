import axios from 'axios';

// In development you can set REACT_APP_API_URL to your backend (e.g. http://localhost:5000/api).
// In production, use the relative /api so Vercel's rewrite/proxy will forward requests to the backend.
const API_URL = 'https://hrms-lite-backend-v5gp.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee APIs
export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  delete: (id) => api.delete(`/employees/${id}`),
};

// Attendance APIs
export const attendanceAPI = {
  getAll: (employeeId) => {
    const params = employeeId ? { employeeId } : {};
    return api.get('/attendance', { params });
  },
  mark: (data) => api.post('/attendance', data),
  getSummary: (employeeId) => api.get(`/attendance/summary/${employeeId}`),
};

export default api;