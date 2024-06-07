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
import AddOwner from './components/AddOwner';


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
          <div className="container">
            <Routes>
              <Route path='/' exact element={<Home/>}></Route>
              <Route path='/login' exact element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/logout' element={<Logout/>}></Route>
              <Route path='/history' element={<History/>}></Route>
              <Route path="/add-owner" element={<AddOwner/>}></Route>
            </Routes>
          </div>
          <footer className="footer">
            <p>Contact: +386 04 111 222</p>
            <p>E-mail: info@cyberboxtech.com</p>
            <p>All rights reserved&reg;</p>
          </footer>
        </div>
      </UserContext.Provider>

    </BrowserRouter>
    
  );
}

export default App;
