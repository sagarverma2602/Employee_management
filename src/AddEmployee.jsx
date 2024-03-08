import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Users from "./Users";

function AddEmployee() {
  const {
    getUsers,
    setUser
  } = Users();
  const [users,setUsers]=useState(()=>{
    return getUsers()
  })
  const [currentUser, setCurrentUser] = useState({
    user: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    img: "",
  });
  const [ifEmailExists, setIfEmailExists] = useState(false);
  const handleInputChange = (e) => {
    function isDigit(value) {
      return !isNaN(parseInt(value, 10));
    }
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        [name]: checked
          ? [...prevUser[name], value]
          : prevUser[name].filter((course) => course !== value),
      }));
    }
    if (type === "tel" && !isDigit(value[value.length - 1])) {
      return;
    }
    
    else {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
    if(name==="email"){
      var r=false
      for(let i=0;i<Users.length;i++){
        if(value===""){
          continue;
        }
        if(Users[i].email===value){
          r=true
          break
        }
      }
      setIfEmailExists(r)
    } 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        img: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    if (currentUser.user.trim() === "") {
      alert("Please enter name.");
      return;
    }
    if (currentUser.email.trim() === "" ) {
      alert("Please enter email.");
      return;
    }
    if (ifEmailExists) {
      alert("Email already exists");
      return;
    }
    if (currentUser.mobile.length!=10) {
      alert("Please enter valid mobile no.");
      return;
    }
    if (currentUser.designation.trim() === "") {
      alert("Please enter designation.");
      return;
    }
    if (currentUser.course.length === 0) {
      alert("Please select course.");
      return;
    }
    if (currentUser.gender.trim() === "") {
      alert("Please select Gender")
      return;
    }
    if (currentUser.img.trim() === "") {
      alert("Please select Image")
      return;
    }
    setUsers([...users, { id: uuidv4(), ...currentUser ,date:new Date().toLocaleDateString()}]);
    alert("Employee added");
    setCurrentUser({
      user: "",
      email: "",
      mobile: "",
      designation: "",
      img:"",
      course: [],
      gender: "",
    });
    console.log("Form submitted:", currentUser);
  };
useEffect(()=>{
  setUser(users)
  // localStorage.setItem("employeeManager",JSON.stringify(Users));
}
,[users]);
  return (
    <>
       <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
  
    <Link to="/Dashboard" style={{ color: '#007bff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>Home</Link>
    <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Add Employee</h1>
  </div>
    <form
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#f8f9fa'
      }}
    >
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>
            <label htmlFor="user" style={{ fontSize: '16px', fontWeight: 'bold' }}>Name:</label>
            </td>
            <td>
              <input
                id="user"
                name="user"
                type="text"
                placeholder="Enter Name"
                value={currentUser.user}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="email" style={{ fontSize: '16px', fontWeight: 'bold' }}>Email:</label>
            </td>
            <td>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={currentUser.email}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
              {ifEmailExists && <p>Email already exists</p>}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="mobile" style={{ fontSize: '16px', fontWeight: 'bold' }}>Mobile No:</label>
            </td>
            <td>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Enter Mobile No"
                value={currentUser.mobile}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="designation" style={{ fontSize: '16px', fontWeight: 'bold' }}>Designation:</label>
            </td>
            <td>
              <select
                id="designation"
                name="designation"
                value={currentUser.designation}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Gender:</label>
            </td>
            <td>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={currentUser.gender === "male"}
                onChange={handleInputChange}
              />
              <label htmlFor="male" >Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={currentUser.gender === "female"}
                onChange={handleInputChange}
              />
              <label htmlFor="female">Female</label>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="course" style={{ fontSize: '16px', fontWeight: 'bold' }}>Course:</label>
            </td>
            <td>
              <div style={{ padding: "8px", borderRadius: "4px" }}>
                <label style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    name="course"
                    value="MCA"
                    checked={currentUser.course.includes("MCA")}
                    onChange={handleInputChange}
                    style={{ marginRight: "5px" }}
                  />
                  MCA
                </label>
                <label style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    name="course"
                    value="BCA"
                    checked={currentUser.course.includes("BCA")}
                    onChange={handleInputChange}
                    style={{ marginRight: "5px" }}
                  />
                  BCA
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="course"
                    value="BSC"
                    checked={currentUser.course.includes("BSC")}
                    onChange={handleInputChange}
                    style={{ marginRight: "5px" }}
                  />
                  BSC
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="file" name="myImage" onChange={handleImageChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </td>
            <td>
              {currentUser.img && (
                <div>
                  <img alt="not found" width={"100px"} src={currentUser.img} />
                  <br />
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <input type="button" value="Submit" onClick={handleFormSubmit} style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer'
              }}/>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    </>
  );
}

export default AddEmployee;
