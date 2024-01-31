import React, { useState } from 'react';
import '../App/App.css';
import { NavBar } from '../components/NavBar/index.tsx'
import { FormCreateEvent } from '../components/FormCreateEvent/index.tsx'
import { ListEvent } from '../components/ListEvent/index.tsx'
import { Home } from '../components/Home/index.tsx'

function App() {

  const [showForm, setShowForm] = useState(false);
  const [showListEvent, setShowListEvent] = useState(false);
  const [showHome, setShowHome] = useState(true);

  return (
    <div className="App">
      
      <NavBar 
        setShowForm={setShowForm} 
        setShowListEvent={setShowListEvent}
        setShowHome={setShowHome}
      />

      <div>
        {showHome && <Home />}

        {showForm && <FormCreateEvent />}

        {showListEvent && <ListEvent />}
      </div>
      

    </div>
  );
}

export { App };
