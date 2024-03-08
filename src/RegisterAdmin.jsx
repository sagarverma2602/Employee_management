import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterAdminForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!formData.userId.trim()) {
      errors.userId = 'User ID is required';
    }
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    admins.push(formData);
    localStorage.setItem('admins', JSON.stringify(admins));

    setFormData({
      userId: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
  <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Register Admin</h2>
  <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '16px' }}>User ID:</label>
      <input
        type="text"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
      />
      {errors.userId && <span style={{ color: 'red', fontSize: '14px' }}>{errors.userId}</span>}
    </div>
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '16px' }}>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
      />
      {errors.password && <span style={{ color: 'red', fontSize: '14px' }}>{errors.password}</span>}
    </div>
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '16px' }}>Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
      />
      {errors.confirmPassword && <span style={{ color: 'red', fontSize: '14px' }}>{errors.confirmPassword}</span>}
    </div>
    <button
      type="submit"
      style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}
    >
      Register
    </button>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <button
        type="button"
        style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}
      >
        Login
      </button>
    </Link>
  </form>
</div>

  );
};

export default RegisterAdminForm;
