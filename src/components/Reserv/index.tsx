import React, { useState } from "react";

function Reserv({ selectedEventId }){

    const [quantity, setQuantity] = useState(0);

    console.log(selectedEventId)

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch('http://localhost:8000/create-reserv/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                places_reserv: quantity,
                event: selectedEventId,
                user: 1,
            }),
        });
    
        if (!response.ok) {
            console.error('Error:', response.statusText);
        } else {
            console.log('Reserva realizada con éxito');
        }
    };    

    return(
        <form onSubmit={handleSubmit}>
            <h1>{selectedEventId}</h1>
            <label htmlFor="">Cantidad de lugares a reservar: </label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <button>Reservar</button>
        </form>
    )
}

export {Reserv};