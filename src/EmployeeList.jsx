

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Users from './Users';

function EmployeeList() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); 
  const {
    getUsers,
    setUser
  } = Users();
  

  const history = useNavigate();
  const [users, setUsers] = useState(() => {
    return getUsers();
  });
  // const temp=employees.getUsers()

  function handlesearch(user) {
    return (
      user.user.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.date.includes(search.toLowerCase())
    );
  }

  function onDelete(id) {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  }

  function onEdit(user) {
    history(`/edit-employee`, { state: user.id });
  }

  function nextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function prevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }
    useEffect(()=>{
      setUser(users)
  },[users])
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.filter((user) => handlesearch(user)).slice(indexOfFirstUser, indexOfLastUser);
  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    marginRight: '10px',
  };
  
  const searchInputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '200px',
  };
  const cardStyle = {
    width: '300px',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    marginBottom: '20px',
  };
  
  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  };
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '20px' ,marginBottom:'10px'}}>
  <Link to='/' style={linkStyle}>Home</Link>
  <Link to='/add-employee' style={linkStyle}>Add Employee</Link>
  <div style={{ marginTop: '10px' }}>
    <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)} style={searchInputStyle} />
  </div>
</div>

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
  {currentUsers.map((user) => (
    <div key={user.id} style={cardStyle}>
      <div>
  <h2 style={{ marginBottom: '10px', fontSize: '24px', color: '#333' }}>{user.user}</h2>
  <p style={{ marginBottom: '5px' }}><strong>Email:</strong> <span style={{ color: '#007bff' }}>{user.email}</span></p>
  <p style={{ marginBottom: '5px' }}><strong>Mobile:</strong> {user.mobile}</p>
  <p style={{ marginBottom: '5px' }}><strong>Designation:</strong> {user.designation}</p>
  <p style={{ marginBottom: '5px' }}><strong>Gender:</strong> {user.gender}</p>
  <p style={{ marginBottom: '5px' }}><strong>Course:</strong> {user.course}</p>
  {user.img && <img src={user.img} alt='User' style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }} />}
  {user.date && <div style={{ marginBottom: '5px' }}><strong>Date:</strong> {user.date}</div>}
</div>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={() => onDelete(user.id)} style={buttonStyle}>Delete</button>
        <button onClick={() => onEdit(user)} style={{ ...buttonStyle, marginLeft: '10px' }}>Edit</button>
      </div>
    </div>
  ))}
</div>
<div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
  <button onClick={prevPage} disabled={currentPage === 1} style={buttonStyle}>Prev</button>
  <button onClick={nextPage} disabled={currentUsers.length < usersPerPage} style={{ ...buttonStyle, marginLeft: '10px' }}>Next</button>
</div>

    </>
  );
}

export default EmployeeList;
