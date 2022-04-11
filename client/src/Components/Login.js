import React, { useState, useEffect  } from 'react'
import { useNavigate , Link} from 'react-router-dom'
import "../Style/Login.css"

import Axios from 'axios';

function Login() {

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const[errorMessage, setErrorMessage] = useState("")

  const Login = async () =>{
        let res =await Axios.post(`http://localhost:8000/api/users`,{username: username, password:password})
        if(res.data.loggedIn){
          localStorage.setItem("loggedIn", true)
          localStorage.setItem("username", res.data.result.username)
          
          let permissions = await Axios.get(`http://localhost:8000/api/permissions/${res.data.result._id}`) 
          localStorage.setItem("permissions", [permissions.data.permissions])
          let checkAdmin = await Axios.get("http://localhost:8000/api/users/userDetails",
          {headers:{id: res.data.result._id}})
          if(checkAdmin.data.FirstName == "Admin")
          {
            localStorage.setItem("Admin", true)
          }else{
            localStorage.setItem("Admin", false)
          }
          navigate("/movies")
          window.location.reload();
          
        }else{
          setErrorMessage(res.data.message)
        }

  }
  
  useEffect(()=>{
		if(localStorage.getItem("loggedIn")){
      
      navigate("/movies")
      
    }  
	},[])

  return (
    <div className="Login">
    <div className="LoginForm">
    <input type="text"
    placeholder ="username..."
    onChange = {(event) =>{
    setUsername(event.target.value);    
    }}/>
    <input type="text"
    placeholder ="password..."
    onChange = {(event) =>{
    setPassword(event.target.value);    
    }}/>
    </div>
    <button onClick={Login}>Login</button>
    New User?: <Link to={"/register"}><h3>Create Account</h3>	</Link>
    <h1 style={{color: "red"}}>{errorMessage}</h1>
</div>
)
  
}

export default Login