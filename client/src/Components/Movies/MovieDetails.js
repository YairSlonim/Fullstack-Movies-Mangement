import Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import '../../Style/Movies.css'

function MovieDetails() {

    const [movie, setMovie] = useState({})

    let navigate = useNavigate();
    let { name } = useParams();

    const fixDate = (e)=>{
        let year = new Date(e).getFullYear();
        let month = new Date(e).getMonth();
        let day = new Date(e).getDate()
        return (year+ "/" + month + "/" + day)
      }

    useEffect(async () =>{
        
        
        let movie = await Axios.post("http://localhost:8000/api/movies/getMovieByName",{name})
        setMovie(movie.data)
    },[])

  return (
    
    <ul className='movie_page'>
    
    <img  src={movie.Image } style={{width:"60px",height:"107px"}}/>
    
        <li>Name: {movie.Name}</li>
        <li>Premiered: {fixDate(movie.Premiered)}</li>
        <li>Genres: {movie.Genres}</li>
        <button style={{width:"150px"}} title="Go back" onClick={() => navigate("../")}>Go Back</button>
    </ul>
    
  )
}

export default MovieDetails