import React, { useState, useEffect } from 'react';
import { attendanceAPI, employeeAPI } from '../services/api';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetchAttendance(selectedEmployee);
    } else {
      fetchAttendance();
    }
  }, [selectedEmployee]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [employeesRes, attendanceRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll()
      ]);
      setEmployees(employeesRes.data.data);
      setAttendance(attendanceRes.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async (employeeId = null) => {
    try {
      const response = await attendanceAPI.getAll(employeeId);
      setAttendance(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch attendance');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.employeeId) {
      errors.employeeId = 'Please select an employee';
    }
    
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    
    if (!formData.status) {
      errors.status = 'Status is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await attendanceAPI.mark(formData);
      setSuccess('Attendance marked successfully!');
      setFormData({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
      setShowForm(false);
      fetchAttendance(selectedEmployee);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark attendance');
      setTimeout(() => setError(''), 5000);
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.employeeId === employeeId);
    return employee ? employee.fullName : employeeId;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="page-header">
        <h2>Attendance Management</h2>
        <p>Track daily attendance for all employees</p>
      </div>

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3>Attendance Records</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
            disabled={employees.length === 0}
          >
            {showForm ? 'Cancel' : '+ Mark Attendance'}
          </button>
        </div>

        {employees.length === 0 && (
          <div className="alert alert-info">
            Please add employees first before marking attendance.
          </div>
        )}

        {showForm && employees.length > 0 && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <div className="form-grid">
              <div className="form-group">
                <label>Employee *</label>
                <select
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className={formErrors.employeeId ? 'error' : ''}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp.employeeId}>
                      {emp.fullName} ({emp.employeeId})
                    </option>
                  ))}
                </select>
                {formErrors.employeeId && (
                  <div className="form-error">{formErrors.employeeId}</div>
                )}
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={formErrors.date ? 'error' : ''}
                />
                {formErrors.date && (
                  <div className="form-error">{formErrors.date}</div>
                )}
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={formErrors.status ? 'error' : ''}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
                {formErrors.status && (
                  <div className="form-error">{formErrors.status}</div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Mark Attendance
            </button>
          </form>
        )}

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Filter by Employee</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp.employeeId}>
                {emp.fullName} ({emp.employeeId})
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading attendance records...</p>
          </div>
        ) : attendance.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Attendance Records</h3>
            <p>Start marking attendance using the button above</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id}>
                    <td>{record.employeeId}</td>
                    <td>{getEmployeeName(record.employeeId)}</td>
                    <td>{formatDate(record.date)}</td>
                    <td>
                      <span className={`status-badge status-${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;