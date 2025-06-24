import React, { useState, useEffect } from 'react';
import '../App.css';
import './Admin.css';

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [showChange, setShowChange] = useState(false);
  const [changeForm, setChangeForm] = useState({ username: '', password: '' });
  const [changeError, setChangeError] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      setLoggedIn(true);
      fetchData();
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setLoggedIn(true);
        localStorage.setItem('adminLoggedIn', 'true');
        fetchData();
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Server error');
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/admin/data');
      const json = await res.json();
      setData(json);
    } catch {
      setError('Failed to fetch data');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setForm({ username: '', password: '' });
    setData([]);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:4000/api/admin/delete/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setData(data.filter(row => row.id !== id));
      } else {
        alert('Failed to delete.');
      }
    } catch {
      alert('Server error.');
    }
    setDeletingId(null);
  };

  const handleChangeCredentials = async (e) => {
    e.preventDefault();
    setChangeError('');
    setChangeSuccess('');
    if (!changeForm.username || !changeForm.password) {
      setChangeError('Both fields are required.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/admin/change-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changeForm)
      });
      if (res.ok) {
        setChangeSuccess('Credentials updated successfully!');
        setTimeout(() => setShowChange(false), 1200);
      } else {
        setChangeError('Failed to update credentials.');
      }
    } catch {
      setChangeError('Server error.');
    }
  };

  return (
    <div className="admin-bg-panel">
      <div className="admin-center-container">
        <div className="admin-header">
          <img src="/icon.jpg" alt="Admin Logo" className="admin-logo" />
          <h2 className="admin-title">CredWorth.AI</h2>
          <div className="admin-subtitle">Admin Panel</div>
          <div className="admin-desc">Manage and view all waitlist entries</div>
        </div>
        <div className="admin-content">
          {showChange && (
            <div className="admin-card animate__animated animate__fadeIn" style={{maxWidth: 400, margin: '0 auto', zIndex: 10, position: 'relative'}}>
              <h4 className="admin-card-title">Change Credentials</h4>
              {changeError && <div className="alert alert-danger admin-alert">{changeError}</div>}
              {changeSuccess && <div className="alert alert-success admin-alert">{changeSuccess}</div>}
              <form onSubmit={handleChangeCredentials}>
                <div className="mb-3">
                  <input type="text" className="form-control admin-input" placeholder="New Username" value={changeForm.username} onChange={e => setChangeForm({...changeForm, username: e.target.value})} />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control admin-input" placeholder="New Password" value={changeForm.password} onChange={e => setChangeForm({...changeForm, password: e.target.value})} />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button type="button" className="btn btn-outline-secondary admin-login-btn" onClick={() => setShowChange(false)}>Cancel</button>
                  <button type="submit" className="btn admin-login-btn">Update</button>
                </div>
              </form>
            </div>
          )}
          {!loggedIn ? (
            <form onSubmit={handleLogin} className="admin-card admin-login-form animate__animated animate__fadeIn">
              <h4 className="admin-card-title">Admin Login</h4>
              {error && <div className="alert alert-danger admin-alert">{error}</div>}
              <div className="mb-4">
                <input type="text" name="username" className="form-control form-control-lg admin-input" placeholder="Username" value={form.username} onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <input type="password" name="password" className="form-control form-control-lg admin-input" placeholder="Password" value={form.password} onChange={handleChange} required />
              </div>
              <button className="btn w-100 admin-login-btn" type="submit">Login</button>
            </form>
          ) : (
            <div className="admin-card admin-data-card animate__animated animate__fadeIn">
              <div className="admin-data-header">
                <h4 className="admin-data-title">Waitlist Data</h4>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-light admin-logout-btn" onClick={handleLogout}>Logout</button>
                  <button className="btn btn-outline-light admin-logout-btn" onClick={() => setShowChange(true)}>Change Credentials</button>
                </div>
              </div>
              <div className="table-responsive admin-table-responsive">
                <table className="table table-hover table-striped table-bordered align-middle mb-0 admin-table">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Suggestion</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr><td colSpan="6" className="text-center py-4">No data found</td></tr>
                    ) : data.map((row, idx) => (
                      <tr key={idx} className="admin-table-row">
                        <td>{idx + 1}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        <td>{row.suggestion}</td>
                        <td>
                          <button className="btn btn-sm btn-danger admin-delete-btn" onClick={() => handleDelete(row.id)} disabled={deletingId === row.id} title="Delete">
                            {deletingId === row.id ? (
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h2a2 2 0 012 2v2" /></svg>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin; 