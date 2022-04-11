import React,{useEffect, useState} from 'react'

function AddOrEditMember(props) {
    const [state, setState] = useState({Name:props.member?props.member.Name:"", 
    Email:props.member?props.member.Email:"", City:props.member?props.member.City:""})
      
      const handleChange = (event) =>{
          setState(prev=>{return (
            {...prev,[event.target.name]:event.target.value}
          )})
      }
  
      const handleSubmit =(event) =>{
       let MemberToUpdate = state
        props.handleUpdateMember(MemberToUpdate)
        event.preventDefault();
        
      }
      useEffect(()=>{
        console.log(props)
      },[])
  return (
    <div className='form-style-4'>
    {props.member && (
        <form  onSubmit={handleSubmit} >
      <label for="Name">
      <span>Name: </span><input type='text' name="Name" onChange={handleChange} defaultValue={props.member.Name} /><br/>
      </label>
      <label for="Email">
      <span>Email: </span><input type='text' name="Email" onChange={handleChange}  defaultValue={props.member.Email}/><br/>
      </label>
      <label for="City">
      <span>City: </span><input type='text' name="City" onChange={handleChange} defaultValue={ props.member.City}/><br/>
      </label>
      
       <label>
       <span> </span><input className='AddUserButton' type="submit" value="UPDATE" />
       </label>
       
      </form>)}
      
      {!props.member && (
        <form onSubmit={handleSubmit}>
        <label for="Name">
      <span>Name: </span><input type='text' name="Name" onChange={handleChange} /><br/>
      </label>
      <label for="Email">
      <span>Email: </span><input type='text' name="Email" onChange={handleChange}/><br/>
      </label>
      <label for="City">
      <span>City: </span><input type='text' name="City" onChange={handleChange} /><br/>
      </label>
      
  <label>
  <span> </span><input className='AddUserButton' type="submit" value="Add" />
  </label>
      </form>)}
      </div>
  )
  
  }

export default AddOrEditMember