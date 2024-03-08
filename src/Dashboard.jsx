
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.jpg';
const Welcome = () => {
  const navigate = useNavigate();
  const [sessionUser] = useState(() => {
    const sessionuser=localStorage.getItem('userId');
    console.log(sessionuser);
    if (sessionuser===undefined || sessionuser==null || sessionuser==='') {
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationTime');
      
    }
    return sessionuser
  });
  useEffect(() => {
  if (sessionUser===undefined || sessionUser==null || sessionUser==='') {
    navigate('/');
  }
  }
  , []);
  return (
    <>
    <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{display:'flex',justifyContent:'flex-start',textAlign:'center'}}>
      <img src={logo} alt="Logo" style={{ width: '75px', height: '75px', }} />
      <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Welcome {sessionUser}</h2>

      </div>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Link to="/add-employee" style={{ marginRight: '20px', textDecoration: 'none', display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', transition: 'background-color 0.3s ease' }}>
      Add Employee
    </Link>
    <Link to="/emp-list" style={{ textDecoration: 'none', display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', transition: 'background-color 0.3s ease' }}>
      Show Employees
    </Link>
  </div>
</div>
</>

  )
}

export default Welcome