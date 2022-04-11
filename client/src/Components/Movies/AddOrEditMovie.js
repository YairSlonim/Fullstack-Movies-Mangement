import React, { useEffect, useState } from 'react'


function AddOrEditMovie(props) {
  const [state, setState] = useState({Name:props.movie?props.movie.Name:"", 
  Premiered:props.movie?props.movie.Premiered:"", Genres:props.movie?props.movie.Genres:"",
  Image:props.movie?props.movie.Image:""})
    
    const handleChange = (event) =>{
        setState(prev=>{return (
          {...prev,[event.target.name]:event.target.value}
        )})
    }

    const handleSubmit =(event) =>{
     let MovieToUpdate = {state}
      props.handleUpdateMovie(MovieToUpdate)
      event.preventDefault();
      
    }
    useEffect(()=>{
      
        console.log(props)
      
    },[])
return (
  <div className='form-style-4'>
  {props.movie && (
      <form  onSubmit={handleSubmit} >
    <label for="Name">
    <span>Name: </span><input type='text' name="Name" onChange={handleChange} defaultValue={props.movie.Name} /><br/>
    </label>
    <label for="Premiered">
    <span>Premiered: </span><input type='text' name="Premiered" onChange={handleChange}  defaultValue={props.fixDate(props.movie.Premiered)} readOnly/><br/>
    </label>
    <label for="Genres">
    <span>Genres: </span><input type='text' name="Genres" onChange={handleChange} defaultValue={ props.movie.Genres}/><br/>
    </label>
    <label for="Image">
    <span>Image Url: </span><input type='text' name="Image" onChange={handleChange} defaultValue={props.movie.Image} /><br/>
    </label>
    
     <label>
     <span> </span><input className='AddUserButton' type="submit" value="UPDATE" />
     </label>
     
    </form>)}
    
    {!props.movie && (
      <form onSubmit={handleSubmit}>
      <label for="Name">
    <span>Name: </span><input type='text' name="Name" onChange={handleChange} /><br/>
    </label>
    <label for="Premiered">
    <span>Premierd: </span><input type='date' name="Premiered" onChange={handleChange}/><br/>
    </label>
    <label for="Genres">
    <span>Genres: </span><input type='text' name="Genres" onChange={handleChange} /><br/>
    </label>
    <label for="Image">
    <span>Image Url: </span><input type='text' name="Image" onChange={handleChange} /><br/>
    </label>
<label>
<span> </span><input className='AddUserButton' type="submit" value="Add" />
</label>
    </form>)}
    </div>
)

}

export default AddOrEditMovie