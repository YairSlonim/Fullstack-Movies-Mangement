import React from 'react'
import { Link } from 'react-router-dom'

function Movie(props) {
  return (
      <ul className='userUl'>
        <h3><Link className="Link" to={`/movies/${props.movie.Name}`}>
								{props.movie.Name}
							
						</Link> {props.fixDate(props.movie.Premiered)}</h3>
        <li>Genres: {props.movie.Genres}</li>
        
        <img  src={props.movie.Image } style={{width:"60px",height:"107px",marginBottom:"-25px",marginLeft:"-15px"}}/>
        <div style={{display:"inline-block",border:"3px solid black",padding:" 20px"}}>
        <ul >
              Subscriptions Watched:
              {props.movie.subscribe.map(sub =>
              <li>
              <Link className="Link" to="/Subscriptions"
                 state= {{ MemberId: sub.MemberId }}>
								{sub.Name + " " + props.fixDate(sub.date)}
						</Link></li>
                  )}
        </ul>
        </div><br/>
        
        <button onClick={() => props.editMovie(props.movie)}>Edit</button>
        <button onClick={() =>props.deleteMovie(props.movie) }>Delete</button>
    </ul>
    
  )
}

export default Movie