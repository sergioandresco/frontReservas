import React, { useState } from "react";

function Reserv({ selectedEventId, selectedEventPlaces }){

    const [quantity, setQuantity] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    console.log(selectedEventId)

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    
    //     const response = await fetch('http://localhost:8000/create-reserv/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             places_reserv: quantity,
    //             event: selectedEventId,
    //             user: 1,
    //         }),
    //     });
    
    //     if (!response.ok) {
    //         console.error('Error:', response.statusText);
    //     } else {
    //         console.log('Reserva realizada con éxito');
    //     }
    // };    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (quantity > selectedEventPlaces) {
            setErrorMessage('No hay suficientes lugares disponibles');
            return;
        }
    
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
            setSuccessMessage('Reserva realizada con éxito');
        }
    };    

    return(
        <form onSubmit={handleSubmit}>
            <h1>{selectedEventId}</h1>
            <h1>{selectedEventPlaces}</h1>
            <label htmlFor="">Cantidad de lugares a reservar: </label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
            <button>Reservar</button>
        </form>
    )
}

export {Reserv};