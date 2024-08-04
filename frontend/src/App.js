import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import LandingPage from './components/homepage';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/User/Home';
import InterviewPage from './components/User/InterviewPage';
import Profile from './components/User/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}>
        </Route>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='/signup' element={<Signup/>}>
        </Route>
        <Route path='/user/home' element={<Home/>}>
        </Route>
        <Route path='/user/interview' element={<InterviewPage/>}>
        </Route>
        <Route path='/user/profile' element={<Profile/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
