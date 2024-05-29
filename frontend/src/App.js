import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './userContext';
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Home from "./components/Home";
import History from './components/History';


function App() {

  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="CyberBoxTech smart mailbox"></Header>
          <Routes>
            <Route path='/' exact element={<Home/>}></Route>
            <Route path='/login' exact element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/logout' element={<Logout/>}></Route>
            <Route path='/history' element={<History/>}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
