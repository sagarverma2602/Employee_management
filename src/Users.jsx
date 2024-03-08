import React, { useEffect, useState } from 'react'

const Users = () => {
    const LOCAL_STORAGE_KEY = 'employeeManager'
    const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
    
    function getUsers(){
        
      return (users)

    }
    function setUser(newUsers){
        localStorage.setItem("employeeManager",JSON.stringify(newUsers));
        

    }
    return{getUsers,setUser}
}

export default Users