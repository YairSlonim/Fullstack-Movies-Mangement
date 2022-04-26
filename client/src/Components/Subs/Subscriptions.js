import  Axios  from 'axios'
import React, { useEffect, useState, useRef} from 'react'
import { useLocation,useNavigate } from "react-router-dom";
import AddOrEditMember from './AddOrEditMember'
import Member from './Member'

function Subscriptions() {

  let location = useLocation();
const navigate = useNavigate();

  const [members, setMembers] =useState([])
  const [member, setMember] = useState({})
  const [showMembers, setShowMembers] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [moviesNames, setMoviesNames] = useState()
  const [index, setIndex] = useState()

  const fixDate = (e)=>{
    let year = new Date(e).getFullYear();
    let month = new Date(e).getMonth();
    let day = new Date(e).getDate()
    return (year+ "/" + month + "/" + day)
  }

  const addOrShow =(index) =>{
    if(index == "show"){
      setShowMembers(true)
      setShowAdd(false)
    }else{
      if(localStorage.getItem("permissions").includes("Create Subscriptions")){
      setShowMembers(false)
      setShowAdd(true)
      setMember(null)
      }else{
        alert("You do not have permission to add subscriptions")
      }
    }
  }

  const editMember = (member) =>{
    if(localStorage.getItem("permissions").includes("Update Subscriptions")){
      setMember(member)
    setShowMembers(false)
    setShowAdd(true)
    }
    else{
      alert("You do not have permission to update subscriptions")
    }
    
  }

  const deleteMember =async (member) =>{
    if(localStorage.getItem("permissions").includes("Delete Subscriptions")){
      let result = await Axios.delete(`http://localhost:8000/api/members/${member._id}`)
    let result2 = await Axios.delete(`http://localhost:8000/api/subscriptions/${member._id}`)
    window.location.reload();
    }
    else{
      alert("You do not have permission to delete subscriptions")
    }
    
  }

  const handleUpdateMember= async (e) =>{
      
    if(member!=null){
      let result = await Axios.post(`http://localhost:8000/api/members/${member._id}`,{member:e})
      if(result.data == "updated"){
        window.location.reload();
        setShowMembers(true)
      setShowAdd(false)
      }
      else{
        alert("there was a problem")
      }
    }
    else{
      let result = await Axios.post(`http://localhost:8000/api/members`,{obj:e})
      let result2 = await Axios.post(`http://localhost:8000/api/subscriptions/addSub/${result.data}`)
      if(result2.data == "Added"){
        window.location.reload();
      }
      else{
        alert("there was a problem")
      }
    }
  }
  useEffect(async ()=>{

    if(location.state!=null) {
      console.log(location.state)
        let { MemberId } = location.state
      let result = await Axios.get(`http://localhost:8000/api/members/${MemberId}`)
       setMember(result.data)
      setShowMembers(false)
      setShowAdd(true)
      navigate(location.pathname, { replace: true });
  }
  },[]);

  useEffect(async()=>{
    if(localStorage.getItem("permissions").includes("View Subscriptions")){
    //console.log(MemberId)
    //need the names of all movies for the dropdown when the member sub to movie 
    let result3 = await Axios.get("http://localhost:8000/api/movies",{
      headers: {
        "access-token":
          localStorage.getItem("access-token")}})
    let result3onlyName = result3.data.map(movie => { return {Name:movie.Name,id: movie._id} } )
    setMoviesNames(result3onlyName)


    let result =await Axios.get("http://localhost:8000/api/members",{
      headers: {
        "access-token":
          localStorage.getItem("access-token")}})
    let result2 = await Axios.get("http://localhost:8000/api/subscriptions",{
      headers: {
        "access-token":
          localStorage.getItem("access-token")}});
    let Members = result.data
    let Subscriptions = result2.data
     
    // for each sub why create member details and movie details then put them together into one json.
    let members = await  Promise.all( Subscriptions.map(async x =>{

      //get the member details from all member by id
      let member_details = Members.find(mem => mem._id == x.MemberId)

      if(member_details!=null){  
         //for each movie that this member sub we get the movie details 
        let movie_details =await  Promise.all(x.Movies.map(async movie =>{  

          let data  = await Axios.get(`http://localhost:8000/api/movies/${movie.movieId}`)

          if(data.data != null)

          return {Name:data.data.Name, Premiered: data.data.Premiered, id: movie.movieId}
        })) 
        if(movie_details != null)
        
        return Object.assign(member_details,{Movies:movie_details}) 
        
      }else{
        return ;
      }
      
      }))
     setMembers(members);
    }else{
      navigate("../")
      alert("You do not have permission to view subscriptions")
    }
  },[]);
  

  return (

    <div className='UserMan_container'>
      <div className="allUsers_container">
      <button onClick={()=>addOrShow("show")}>All Members</button>
      <button onClick={()=>addOrShow("add")}>Add Member</button>

      {showMembers === true && (//default
        <div>
        
          {members.map(x =>
            <Member 
            member={x} 
            editMember={editMember}
            deleteMember={deleteMember}
            fixDate={fixDate}
            moviesNames={moviesNames}
            />
          )}
        
        </div>
      )}

{showAdd === true && (
        <AddOrEditMember
        member={member}
        handleUpdateMember={handleUpdateMember}
        //fixDate={fixDate} 
        
        />  
      )}
      </div>
      </div>
  )
}

export default Subscriptions