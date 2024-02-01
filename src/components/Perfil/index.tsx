import React, { useState, useEffect } from "react";
import { useAuth } from '../../Context/index.tsx';

function Perfil(){
    const [reservaciones, setReservaciones] = useState([]);
    const [eventos, setEventos] = useState([]);
    const { accessToken, userId } = useAuth();

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8000/all-reserv/'),
            fetch('http://localhost:8000/all-events/')
        ])
        .then(([resReservaciones, resEventos]) => 
            Promise.all([resReservaciones.json(), resEventos.json()])
        )
        .then(([dataReservaciones, dataEventos]) => {
            setReservaciones(dataReservaciones);
            setEventos(dataEventos);
        });
    }, []);

    console.log("User ID en Reservas:", userId);
    console.log("User TOKEN:", accessToken);
    
    
    const reservacionesConEvento = reservaciones.filter(reservacion => {
        // Valida que reservacion.user sea igual a userId
        console.log("Este es el user de la reservacion",reservacion.user === parseInt(userId))
        console.log("Tipo de datos de reservacion.user:", typeof reservacion.user);
        console.log("Tipo de datos de userId:", typeof userId);

        return reservacion.user === parseInt(userId) && eventos.some(evento => evento.id === reservacion.event);
    });

    return(
        <div>
            <h2>Reservaciones con Evento Correspondiente:</h2>
            <ul>
                {reservacionesConEvento.map(reservacion => (
                    <li key={reservacion.id}>
                        <p>Places Reserv: {reservacion.places_reserv}</p>
                        {eventos.map(evento => {
                            if (evento.id === reservacion.event) {
                                return (
                                    <div key={evento.id}>
                                        <p>Event: {evento.name}</p>
                                        <p>Event Description: {evento.description}</p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { Perfil };
