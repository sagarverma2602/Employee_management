
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });
    const [sessionUser,setSessionUser] = useState(() => localStorage.getItem('userId'));
      
    
    const [admins] = useState(() => {
        return JSON.parse(localStorage.getItem('admins')) || [];
    }
    );
    function handle(e) {
        e.preventDefault();
        const { userId, password } = formData;
        const admin = admins.find(admin => admin.userId === userId && admin.password === password);
        console.log(admins)
        if (admin) {
            localStorage.setItem('userId', userId);
            const expirationTime = new Date().getTime() + 60 * 60 * 1000;
            localStorage.setItem('expirationTime', expirationTime);

            console.log('Login successful');
            navigate('/dashboard');
        } else {
            console.log('Invalid login')
        }
    }
    useEffect(() => {
        console.log(sessionUser)
        if (sessionUser && new Date().getTime() <localStorage.getItem('expirationTime')) {
            
            navigate('/dashboard');
        }
        else{
            localStorage.removeItem('userId');
            localStorage.removeItem('expirationTime');
            setSessionUser(null);
        }
    },[sessionUser]);
        

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
      
  <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Login</h2>
  <div style={{ maxWidth: '300px', margin: '0 auto' }}>
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '16px' }}>User ID:</label>
      <input
        type="text"
        name="userId"
        onChange={(e) => setFormData({...formData, userId: e.target.value})}
        value={formData.userId}
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
      />
    </div>
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '16px' }}>Password:</label>
      <input
        type="password"
        name="password"
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        value={formData.password}
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
      />
    </div>
    <button
      onClick={(e)=>handle(e)}
      style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '16px', cursor: 'pointer' }}
    >
      Login
    </button>
  </div>
  <div style={{ marginTop: '20px', fontSize: '16px' }}>
    Don't have an account? <Link to="/register-admin" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Register Admin</Link>
  </div>
</div>

  )
}

export default Login