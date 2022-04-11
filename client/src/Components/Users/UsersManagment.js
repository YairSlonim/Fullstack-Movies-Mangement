import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import '../../Style/UserManagment.css'
import User from './User'
import {  useNavigate } from 'react-router-dom'
import Checkbox from 'react-checkbox-component'
import AddOrEditUser from './AddOrEditUser'
function UsersManagment() {

  const navigate = useNavigate();

  const [showUsers, setShowUsers] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState()
  const [permissions, setPermissions] = useState([])
  const [usersDetails, setUsersDetails] = useState([])
  const [allTogether, setAllTogether] = useState([])
  
 
  const fixDate = (e)=>{
    let year = new Date(e).getFullYear();
    let month = new Date(e).getMonth();
    let day = new Date(e).getDate()
    return (year+ "/" + month + "/" + day)
  }

  


  const addOrShow =(index) =>{
    if(index == "show"){
      setShowUsers(true)
      setShowAdd(false)
    }else{
      setShowUsers(false)
      setShowAdd(true)
      setUser(null)
    }
  }

  const editUser = (user) =>{
    setUser(user)
    setShowUsers(false)
    setShowAdd(true)
  }

  const deleteUser = async (user) =>{
    setUser(user)
    let result = await Axios.delete(`http://localhost:8000/api/users/${user.id}`)
    if(result.data == "deleted"){
      window.location.reload();
    }
    else{
      alert("there was a problem")
    }
    
  }
  
  const handleUpdateUser = async (e) =>{
    if(user!=null){
      let result = await Axios.post(`http://localhost:8000/api/users/user/${user.id}`,{user:e.state, permissions:e.userPermissions})
    if(result.data == "updated"){
      window.location.reload();
    }
    else{
      alert("there was a problem")
    }
    }
    else{
      let result = await Axios.post("http://localhost:8000/api/users/user",{user:e.state, permissions:e.userPermissions})
      if(result.data == "added"){
        window.location.reload();
      }
      else{
        alert("there was a problem")
      }
    }
    
   // e.preventDefault();
   
  }
  

  useEffect(async ()=>{
    let users =await Axios.get("http://localhost:8000/api/users")
    setUsers(users.data)
    let permissions =await Axios.get("http://localhost:8000/api/permissions")
    setPermissions(permissions.data)
    let usersDetails =await Axios.get("http://localhost:8000/api/users/usersDetails")
    setUsersDetails(usersDetails.data)
    
    let arrayUsers = users.data.map(x =>{return {"id": x._id,"username":x.username}} )

    const result = arrayUsers.map(item => {
        const obj = usersDetails.data.find(o => o._id === item.id);
        return { ...item, ...obj };
      });

      const result2 = result.map(item => {
        const obj = permissions.data.find(o => o._id === item.id);
        return { ...item, ...obj };
      });
      setAllTogether(result2)
  },[])

  return (
    <div className='UserMan_container'>
      <div className="allUsers_container">
      <button onClick={()=>addOrShow("show")}>All Users</button>
      <button onClick={()=>addOrShow("add")}>Add User</button>

      {showUsers === true && (
        <div>
        
          {allTogether.map(x =>
            <User 
            user={x} 
            editUser={editUser}
            deleteUser={deleteUser}
            fixDate={fixDate}
            />
          )}
        
        </div>
      )}

{showAdd === true && (
        <AddOrEditUser 
        user={user}
        handleUpdateUser={handleUpdateUser}
        fixDate={fixDate} 
        
        />  
      )}
      </div>
    </div>
  )
}

export default UsersManagment