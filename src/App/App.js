import React, { useState } from 'react';
import '../App/App.css'
import { NavBar } from '../components/NavBar/index.tsx'
import { FormCreateEvent } from '../components/FormCreateEvent/index.tsx'
import { ListEvent } from '../components/ListEvent/index.tsx'

function App() {

  const [showForm, setShowForm] = useState(false);
  const [showListEvent, setShowListEvent] = useState(false);

  return (
    <div className="App">
      
      <NavBar 
        setShowForm={setShowForm} 
        setShowListEvent={setShowListEvent}
      />

      <div>
        {showForm && <FormCreateEvent />}

        {showListEvent && <ListEvent />}
      </div>
      

    </div>
  );
}

export { App };
