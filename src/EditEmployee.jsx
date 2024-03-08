
import { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
const EditEmployee = () => {
    
    const location=useLocation()
    const LOCAL_STORAGE_KEY='employeeManager'
    const reader=new FileReader()
    const id=location.state
    const [editUser,setEditUser]=useState(()=>{
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).find(user=>user.id===id)
    })
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        
    
        reader.onloadend = () => {
          setEditUser({...editUser,img:reader.result});      
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };
    const [users,setUsers] = useState(()=>{
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))||[]
        }
    )
    function handle(e){
        setEditUser({...editUser,[e.target.name]:e.target.value})
    }
    function submit(){
        setUsers(users.map(user => user.id === editUser.id ? editUser : user));
        alert('Employee Edited')
        
        
    }
    useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(users))
        
        
        

    },[users])
    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
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
      
      const linkStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        textDecoration: 'none',
        color: '#007bff',
        border: '1px solid #007bff',
        marginRight: '10px',
      };

  return (
    <div style={{ textAlign: 'center' }}>
  <div style={{ marginBottom: '20px' }}>
    <Link to="/Dashboard" style={linkStyle}>Home</Link>
  </div>
  <h1 style={{ marginBottom: '20px', fontSize: '32px' }}>Edit Employee</h1>
  
  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
    <input type="text" name="user" value={editUser && editUser.user} onChange={handle} style={inputStyle} placeholder="Enter Name" />
    <input type="email" name="email" value={editUser.email} onChange={handle} style={inputStyle} placeholder="Enter Email" />
    <input type="text" name="mobile" value={editUser.mobile} onChange={handle} style={inputStyle} placeholder="Enter Mobile" />
    <input type="text" name="designation" value={editUser.designation} onChange={handle} style={inputStyle} placeholder="Enter Designation" />
    <input type="text" name="course" value={editUser.course} onChange={handle} style={inputStyle} placeholder="Enter Course" />
    <input type='file' name='img' onChange={handleImageChange} style={{ marginBottom: '20px' }} />
    {editUser.img && <img alt="User" width={"250px"} src={editUser.img} style={{ marginBottom: '20px', borderRadius: '5px' }} />}
    <br />
    <button onClick={submit} style={buttonStyle}>Finish Editing</button>
  </div>
</div>

  )
}

export default EditEmployee