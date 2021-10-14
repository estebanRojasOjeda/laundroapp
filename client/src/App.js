import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useState } from 'react';
import UserContext from './context/UserContext';
import Landing from './components/landing/Landing';
import MainContainer from "./components/layout/MainContainer";

function App() {
  
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
        <React.StrictMode>
          <Route exact path="/">
            <Landing></Landing>
          </Route>
          <Route path="/main">
            <MainContainer></MainContainer>
          </Route>
          </React.StrictMode>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
