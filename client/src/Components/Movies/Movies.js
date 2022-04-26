import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import AddOrEditMovie from './AddOrEditMovie'
import Movie from './Movie'
import Axios from 'axios'

function Movies() {

  const navigate = useNavigate()

  const [showMovies, setShowMovies] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [movies, setMovies] = useState([])
  const [newMovies, setNewMovies] = useState([])
  const [movie, setMovie] = useState()

  const fixDate = (e)=>{
    let year = new Date(e).getFullYear();
    let month = new Date(e).getMonth();
    let day = new Date(e).getDate()
    return (year+ "/" + month + "/" + day)
  }

  const addOrShow =(index) =>{
    if(index == "show"){
      setShowMovies(true)
      setShowAdd(false)
    }else{
      if(localStorage.getItem("permissions").includes("Create Movies")){
      setShowMovies(false)
      setShowAdd(true)
      setMovie(null)
      }
      else{
        alert("You do not have permission to add movie")
      }
    }
  }

  const editMovie = (movie) =>{
    if(localStorage.getItem("permissions").includes("Create Movies")){
    setMovie(movie)
    setShowMovies(false)
    setShowAdd(true)
    }
    else{
      alert("You do not have permission to update movie")
    }
  }

  const deleteMovie = async (movie) =>{
    if(localStorage.getItem("permissions").includes("Delete Movies")){
      setMovie(movie)
      movie.subscribe.forEach(async element => {
          let res = await Axios.get(`http://localhost:8000/api/subscriptions/${element.subId}`)
          let newMoviesArr = res.data.Movies.filter(x=>{
            if(x.movieId !== movie._id)
            return x
       })
    
       let result = await Axios.post(`http://localhost:8000/api/subscriptions/deleteMovieInSub/${element.subId}`,
       {movieArr: newMoviesArr})
      })
      
      let result2 = await Axios.delete(`http://localhost:8000/api/movies/${movie._id}`)
      if(result2.data == "deleted"){
        window.location.reload();
      }
      else{
        alert("there was a problem")
      }
    }else{
      alert("You do not have permission to delete a movie")
    }
    
   
  }
  
  const handleUpdateMovie = async (e) =>{
    if(movie!=null){
      let result = await Axios.post(`http://localhost:8000/api/movies/updateMovie/${movie._id}`,{movie:e.state})
    if(result.data == 'update'){
      window.location.reload();
    }
    else{
      alert("there was a problem")
    }
    }
    else{
      let result = await Axios.post("http://localhost:8000/api/movies/add",{movie:e.state})
      if(result.data == 'added'){
        window.location.reload();
      }
      else{
        alert("there was a problem")
      }
    }
    
  }

  useEffect( async() =>{
    if(localStorage.getItem("permissions").includes("View Movies")){
      let result = await Axios.get("http://localhost:8000/api/movies",{
        headers: {
          "access-token":
            localStorage.getItem("access-token")}})
      let result2 = await Axios.get("http://localhost:8000/api/subscriptions",{
        headers: {
          "access-token":
            localStorage.getItem("access-token")}});
      let Movies = result.data
      let Subscriptions = result2.data

      await Promise.all(Movies.map(async x =>{
         Object.assign(x,{subscribe:[]})
        await Promise.all(Subscriptions.map(async sub =>{
          let data = sub.Movies.map(m => m.movieId )
          if(data.includes(x._id)){
            let member = await Axios.get(`http://localhost:8000/api/members/${sub.MemberId}`)
            if(member.data != null){
              let memberWatchDate = sub.Movies.filter(y => y.movieId === x._id)
             let obj ={
                Name: member.data.Name,
                MemberId: member.data._id,
                date:new Date(memberWatchDate[0].date),
                subId: sub._id
              }
              x.subscribe.push(obj)
            }
            
          }
        }))
    }))
      
    setMovies(Movies)
    setNewMovies(Movies)
    }
    else{
      ;
    }
  },[])

  return (
    <div className='UserMan_container'>
    <div className="allUsers_container">
      <h2 className='h2'>Movies</h2>
    <button onClick={()=>addOrShow("show")}>All Movies</button>
      <button onClick={()=>addOrShow("add")}>Add Movie</button>
      Find Movie:<input style={{padding: "5px", margin:"5px"}}  type="text" onChange={ e => {setNewMovies(
               movies.filter((movie) =>{
               if(movie.Name.includes(e.target.value))
               return movie }) )}} />

    {showMovies === true && (
      <div >

      {newMovies.map(x =>
          <Movie 
          movie={x}
          editMovie={editMovie}
          deleteMovie={deleteMovie}
          fixDate={fixDate}
          />
          )}
            
          
            </div>
      
    )}

{showAdd === true && (
      <AddOrEditMovie
      movie={movie}
      handleUpdateMovie={handleUpdateMovie}
      fixDate={fixDate} 
      />  
    )}
    </div>
  </div>
  )
}

export default Movies