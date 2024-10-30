// import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './App.css'
import LoginPage from "./pages/loginPage.tsx";
import ProfilePage from "./pages/profilePage.tsx";


function App() {

  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />}/>
          </Routes>
      </Router>
  )
}

export default App
