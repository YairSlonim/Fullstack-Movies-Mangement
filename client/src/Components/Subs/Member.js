import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import  Axios  from 'axios'

function Member(props) {

  const [subNewMovie, setSubNewMovie] = useState(false)
  const [chosenMovie, setChosenMovie] = useState()
  

  const handleChange = async (e) =>{
     setChosenMovie(e.target.value)
  }

  const handleNewSub =async (e) =>{
    let addNewSub = await Axios.post(`http://localhost:8000/api/subscriptions/updateSub/${props.member._id}`,
    {MovieId:chosenMovie, date: new Date()})
    if(addNewSub.data == 'update'){
      window.location.reload();
    }
    else{
      alert("there was a problem")
    }
    
  }
  useEffect(()=>{
    
  },[])
  return (
    <ul className='userUl'>
        <h3>Name: {props.member.Name}</h3>
        <li>Email: {props.member.Email}</li>
        <li>City: {props.member.City }</li>
        <button onClick={() => props.editMember(props.member)}>Edit</button>
        <button onClick={() =>props.deleteMember(props.member) }>Delete</button><br/>
        <div style={{display:"inline-block",border:"3px solid white",padding:" 10px", alignItems:"flex-start"}}>
          {!subNewMovie ? (
            <ul> 
        <button onClick={() => setSubNewMovie(true)}>Subscribe to new movie</button>
          <h4>Movies watched:</h4>
          
            {props.member.Movies.length>0 ? props.member.Movies.map(movie=>
              //{movie.Name} , {props.fixDate(movie.Premiered)}
              <li>
              <Link className="Link" to={`/Movies/${movie.Name}`}>
							<h3
								className="navbar_links animate__animated animate__zoomIn">
								{movie.Name}
							</h3>
						</Link></li>
              
            ):
            <h3>He has not yet made a sub for any movie</h3>}
        </ul>
          ):
          (
            <form onSubmit={handleNewSub}>
              <h4>Add a new movie</h4>
              <select name="movieName" required onChange={handleChange}>
                      {
                        props.moviesNames.map(v =>
                          <option value={v.id}>{v.Name}</option>) 
                      }
                  </select> 
      <label>
      <span> </span><input className='AddUserButton' type="submit" value="Subscribe" />
      </label>
          </form>)}
          
          
        
        </div>
    </ul>
  )
}

export default Member