import "./App.css";
import AddEmployee from "./AddEmployee";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import EmployeeList from "./EmployeeList";
import EditEmployee from "./EditEmployee";
import RegisterAdminForm from "./RegisterAdmin";
import Login from "./Login";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path='/emp-list' element={<EmployeeList/>} />
        <Route path='/edit-employee' element={<EditEmployee/>}></Route>
        <Route path='/register-admin' element={<RegisterAdminForm/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
