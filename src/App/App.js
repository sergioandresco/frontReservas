import React, { useState } from 'react';
import '../App/App.css'
import { NavBar } from '../components/NavBar/index.tsx'
import { FormCreateEvent } from '../components/FormCreateEvent/index.tsx'

function App() {

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      
      <NavBar setShowForm={setShowForm} />

      <div>
        {showForm && <FormCreateEvent />}
      </div>
      

    </div>
  );
}

export { App };
