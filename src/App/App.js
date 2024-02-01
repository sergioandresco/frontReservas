import React, { useState } from 'react';
import '../App/App.css';
import { NavBar } from '../components/NavBar/index.tsx'
import { FormCreateEvent } from '../components/FormCreateEvent/index.tsx'
import { ListEvent } from '../components/ListEvent/index.tsx'
import { Home } from '../components/Home/index.tsx'
import LoginRegister from '../components/LoginRegister/index.tsx'
import { Perfil } from '../components/Perfil/index.tsx'
import { Reserv } from '../components/Reserv/index.tsx'
import { AuthProvider } from '../Context/index.tsx';

function App() {

  const [showForm, setShowForm] = useState(false);
  const [showListEvent, setShowListEvent] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);
  const [showReserv, setShowReserv] = useState(false);


  return (
    <div className="App container">
      
      <AuthProvider>

        <NavBar 
          setShowForm={setShowForm} 
          setShowListEvent={setShowListEvent}
          setShowHome={setShowHome}
          setShowLogin={setShowLogin}
          setShowPerfil={setShowPerfil}
        />

      </AuthProvider>
      

      <div className=''>
        {showHome && <Home />}

        {showForm && <FormCreateEvent />}

        <AuthProvider>
          {showListEvent && <ListEvent />}
          {showLogin && <LoginRegister />}
          
        </AuthProvider>
        
        <AuthProvider>
          {showPerfil && <Perfil />}
        </AuthProvider>
        
        <AuthProvider>
          {showReserv && <Reserv />}
        </AuthProvider>

      </div>
      

    </div>
  );
}

export { App };
