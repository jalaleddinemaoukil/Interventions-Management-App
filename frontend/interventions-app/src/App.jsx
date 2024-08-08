import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import AddClient from './pages/addClient.jsx';
import EditClient from './pages/editClient.jsx';
// import {AddIntervention} from './pages/addIntervention.jsx';
import EditIntervention from './pages/editIntervention.jsx';
import Profile from './pages/profile.jsx';
import Client from './pages/Client.jsx';
import Intervention from './pages/Intervention.jsx';
import AddIntervention from './pages/addIntervention.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/clients' element={<Client />} />
        <Route path='/client/add' element={<AddClient />} />
        <Route path='/client/edit/:id' element={<EditClient />} />
        <Route path='/interventions' element={<Intervention />} />
        <Route path='/intervention/add' element={<AddIntervention />} />
        <Route path='/intervention/edit/:id' element={<EditIntervention />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
