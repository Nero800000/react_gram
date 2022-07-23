
import './App.css';

// Router
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'

//hooks
import { useAuth } from './hooks/userAuth';


//components 
import Navbar from './components/Navbar';
import Footer from './components/Footer';


// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EditProfile from './pages/EditProfille/EditProfile';
import Profile from './pages/Profile/Profile'




function App() {
 
  const {auth,loading} = useAuth()

  console.log(loading)
    
    if(loading) {
      return <p>Carregando....</p>
    } 
  
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar/>
         <div className='container'>
       <Routes>
         <Route path='/' element={auth ?<Home/>:<Navigate to="/login"/>}/>
         <Route path='/profile' element={auth ?<EditProfile/>:<Navigate to="/login"/>}/>
         <Route path='/users/:id' element={auth ?<Profile/>:<Navigate to="/login"/>}/>
          <Route path='/login' element={!auth ?<Login/>:<Navigate to="/"/>}/>
          <Route path
          ='/register' element={!auth ?<Register/>:<Navigate to="/"/>}/>
         </Routes>     
         </div>
         <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;