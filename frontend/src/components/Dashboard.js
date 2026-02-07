import React, { useState, useEffect } from 'react';
import { employeeAPI, attendanceAPI } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAttendance: 0,
    presentToday: 0,
    absentToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [employeesRes, attendanceRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll()
      ]);

      const employees = employeesRes.data.data;
      const allAttendance = attendanceRes.data.data;

      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Filter today's attendance
      const todayAttendance = allAttendance.filter(record => {
        const recordDate = new Date(record.date);
        recordDate.setHours(0, 0, 0, 0);
        return recordDate.getTime() === today.getTime();
      });

      const presentToday = todayAttendance.filter(r => r.status === 'Present').length;
      const absentToday = todayAttendance.filter(r => r.status === 'Absent').length;

      setStats({
        totalEmployees: employees.length,
        totalAttendance: allAttendance.length,
        presentToday,
        absentToday
      });

      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Overview of your HRMS system</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Employees</h4>
          <div className="stat-value">{stats.totalEmployees}</div>
        </div>

        <div className="stat-card">
          <h4>Total Attendance</h4>
          <div className="stat-value">{stats.totalAttendance}</div>
        </div>

        <div className="stat-card">
          <h4>Present Today</h4>
          <div className="stat-value" style={{ color: '#27ae60' }}>
            {stats.presentToday}
          </div>
        </div>

        <div className="stat-card">
          <h4>Absent Today</h4>
          <div className="stat-value" style={{ color: '#e74c3c' }}>
            {stats.absentToday}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Quick Actions</h3>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/employees'}
          >
            Manage Employees
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/attendance'}
          >
            Mark Attendance
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>System Information</h3>
        </div>
        <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
          Welcome to HRMS Lite - Your simple and efficient Human Resource Management System. 
          Use this dashboard to get a quick overview of your employee data and attendance records. 
          Navigate using the menu above to manage employees or track attendance.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;