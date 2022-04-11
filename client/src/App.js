import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Movies from './Components/Movies/Movies';
import Subscriptions from './Components/Subs/Subscriptions';
import UsersManagment from './Components/Users/UsersManagment';
import MovieDetails from './Components/Movies/MovieDetails';
import AddOrEditMember from './Components/Subs/AddOrEditMember';

function App() {
  return (
    <div className='app'>
   <Router>
       <Navbar />
     <Routes>
     <Route path="/" element={ <Login />}/>
     <Route path="/register" element={ <Register />}/>
     <Route path="/movies" element={ <Movies />}/>
     <Route path="movies/:name" element={ <MovieDetails /> }/>
     <Route path="/subscriptions" element={ <Subscriptions />}/>
     <Route path="/subscriptions/:name" element={ <AddOrEditMember />}/>
     <Route path="/usersManagment" element={ <UsersManagment />}/>
     </Routes>
   </Router> 
   </div>
  );
}

export default App;
