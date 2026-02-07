import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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