import React from 'react'
import '../../Style/UserManagment.css'


function User(props) {

  
  return (
      <ul className='userUl'>
        <li>Name: {props.user.FirstName + " " + props.user.LastName}</li>
        <li>User Name: {props.user.username}</li>
        <li>Session Time Out (minutes): {props.user.SessionTimeOut }</li>
        <li>Create Date: {props.fixDate(props.user.CreateDate)}</li>
        <li>Permissions: {props.user.permissions}</li>
        <button onClick={() => props.editUser(props.user)}>Edit</button>
        <button onClick={() =>props.deleteUser(props.user) }>Delete</button>
    </ul>
  )
}

export default User