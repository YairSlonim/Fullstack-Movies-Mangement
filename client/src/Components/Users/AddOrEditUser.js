import React, { useState } from 'react'
import '../../Style/UserManagment.css'

function AddOrEditUser(props) {
    
    const [state, setState] = useState({FirstName:props.user?props.user.FirstName:"", 
    LastName:props.user?props.user.LastName:"", UserName:props.user? props.user.username:"",
    CreateDate:props.user?props.user.CreateDate:new Date(),SessionTimeOut:props.user?props.user.SessionTimeOut:null})
    const [userPermissions, setUserPermissions] = useState(props.user?props.user.permissions:[])
    const [arrPer, setArrPer] = useState([
        'View Subscriptions',
        'Create Subscriptions',
        'Delete Subscriptions',
        'Update Subscriptions',
        'View Movies',
        'Create Movies',
        'Delete Movies',
        'Update Movies',
      ])
      
      const handleChange = (event) =>{
        let permission = event.target.value;
        let temp = userPermissions;
        if(event.target.name === "permissions"){
          const index = userPermissions.findIndex(prod => prod == permission); //use id instead of index
      if (index > -1){ //make sure you found it
        temp.splice(index, 1)
        }else{
          temp.push(permission)
          }
          setUserPermissions(temp)
        }
        else{
          setState(prev=>{return (
            {...prev,[event.target.name]:event.target.value}
          )})
        }
        
      }

      const handleSubmit =(event) =>{
       let UserToUpdate = {state, userPermissions}
        props.handleUpdateUser(UserToUpdate)
        event.preventDefault();
        
      }

  return (
    <div className='form-style-4'>
    {props.user && (
        <form  onSubmit={handleSubmit} >
      <label for="FirstName">
      <span>First Name: </span><input type='text' name="FirstName" onChange={handleChange} defaultValue={props.user.FirstName} /><br/>
      </label>
      <label for="LastName">
      <span>Last Name: </span><input type='text' name="LastName" onChange={handleChange} defaultValue={props.user.LastName}/><br/>
      </label>
      <label for="CreateDate">
      <span>Create Date: </span><input type='text' name="CreateDate" onChange={handleChange}  defaultValue={props.fixDate(props.user.CreateDate)} readOnly/><br/>
      </label>
      <label for="UserName">
      <span>UserName: </span><input type='text' name="UserName" onChange={handleChange} defaultValue={ props.user.username}/><br/>
      </label>
      <label for="SessionTimeOut">
      <span>Session Time Out: </span><input type='text' name="SessionTimeOut" onChange={handleChange} defaultValue={props.user.SessionTimeOut} /><br/>
      </label>
      <label>
      <span>Permissions: </span><br/> {arrPer.map(per=>
      
          props.user.permissions.filter(y => y === per).length!=0?
          <>
          <label for={per}>{per}
           <input type='checkbox' name="permissions" defaultChecked onChange={(e)=>handleChange(e)} value={per}/>
            </label><br/></>
          :
          <>
          <label for={per}>{per}
            <input type='checkbox' name="permissions" onChange={(e)=>handleChange(e)} value={per} />
             </label><br/></>
            
       )}
       <label>
       <span> </span><input className='AddUserButton' type="submit" value="UPDATE" />
       </label>
       </label>
      </form>)}
      
      {!props.user && (
        <form onSubmit={handleSubmit}>
        <label for="FirstName">
      <span>First Name: </span><input type='text' name="FirstName" onChange={handleChange} /><br/>
      </label>
      <label for="FirstName">
      <span>Last Name: </span><input type='text' name="LastName" onChange={handleChange}/><br/>
      </label>
      <label for="FirstName">
      <span>UserName: </span><input type='text' name="UserName" onChange={handleChange} /><br/>
      </label>
      <label for="FirstName">
      <span>Session Time Out(minutes): </span><input type='text' name="SessionTimeOut" onChange={handleChange} /><br/>
      </label>
      <label for="FirstName">
      <span>Permissions: </span><br/> {arrPer.map(per=>
      <>
      <label for={per}> {per}
      <input type='checkbox' name="permissions" onChange={(e)=>handleChange(e)} value={per} />
      </label><br/>
      
      </>
      
 )}
 </label>
 <label>
 <span> </span><input className='AddUserButton' type="submit" value="Add" />
 </label>
      </form>)}
      </div>
  )
}

export default AddOrEditUser