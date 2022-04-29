import React, { useState  } from 'react'
import { useNavigate , Link} from 'react-router-dom'
import  '../Style/Register.css'
import Axios from 'axios';

function Register() {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
    let res = Axios.post("http://localhost:8000/api/users/register",
        {username: username,
        password: password
    })
    
    if(res.data != null){
        console.log(res.data)
        alert("You have successfully registered to the site")
        navigate("/")
          
    }else{
        alert("username dont exist")
    }
    }
   


  return (
    <div className='Register'>
        <div className='RegisterForm'>
            <input type="text"
            placeholder="username..."
            onChange={(event) =>{
                setUsername(event.target.value)
            }}/>
            <input type="text"
            placeholder="password..."
            onChange={(event) =>{
                setPassword(event.target.value)
            }}/>
        </div>
        <button onClick={register}>register</button>
    </div>
  )
}

export default Register