import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Style/Navbar.css'
import Champiz from '../Images/Champiz.svg'
function Navbar() {

  const [showNav, setShowNav] = useState(false)
   const navigate = useNavigate();
  const ChosenPageStyle = {
    color: "#4e8494",
    backgroundColor: "#fffbbd",
    borderRadius: "15px",
    padding: "5px",
  };

const logOut =() =>{
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("Admin")
    localStorage.removeItem("username")
    window.location.reload();
}



  useEffect(()=>{
    if(!(localStorage.getItem("loggedIn")))
    {
      navigate("/")
    }else{
      setShowNav(true)
    }
    
  },[])
  return (
    <>
    <div className="space_div navbar"></div>
      
      <div className='NavBar_container'>
      <Link to={"/"}>
					<img className="Champiz_logo" src={Champiz} alt="Champiz" />
				</Link>
        {showNav &&(
      <div className="links_container">
      <p className='p'>User Name: {localStorage.getItem("username")}</p>
      <Link className="Link" to={"/movies"}>
							<h3
								className="navbar_links animate__animated animate__zoomIn"
                style={ChosenPageStyle}>
								Movies
							</h3>
						</Link>
            
            <Link className="Link" to={"/subscriptions"}>
							<h3
								className="navbar_links animate__animated animate__zoomIn"
                style={ChosenPageStyle}>
								Subscriptions
							</h3>
						</Link>
            {(localStorage.getItem("Admin")) =="true" && (
            <Link className="Link" to={"/usersManagment"}>
							<h3
								className="navbar_links animate__animated animate__zoomIn"
                style={ChosenPageStyle}>
								Users Managment
							</h3>
						</Link>
             )}
            <Link className="Link" to="/" onClick={logOut}>
							<h3
                
								className="navbar_links animate__animated animate__zoomIn"
                style={ChosenPageStyle}>
								Log Out
							</h3>
						</Link>
            </div>
            ) }
            </div>
            </>
    
  )
}

export default Navbar