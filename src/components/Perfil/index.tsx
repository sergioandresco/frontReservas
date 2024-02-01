import React, { useState, useEffect } from "react";
import { useAuth } from '../../Context/index.tsx';
import './Perfil.css'

function Perfil(){
    const [reservaciones, setReservaciones] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [reservacionIds, setReservacionIds] = useState([]); // Estado local para almacenar los IDs de las reservaciones
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
    
            const ids = dataReservaciones.map(reservacion => reservacion.id);
            setReservacionIds(ids);
        });
    }, []);
    

    console.log("User ID en Reservas:", userId);
    console.log("reserva IDDD:", reservacionIds);
    
    
    const reservacionesConEvento = reservaciones.filter(reservacion => {
        // Valida que reservacion.user sea igual a userId
        console.log("Este es el user de la reservacion",reservacion.user === parseInt(userId))
        console.log("Tipo de datos de reservacion.user:", typeof reservacion.user);
        console.log("Tipo de datos de userId:", typeof userId);

        return reservacion.user === parseInt(userId) && eventos.some(evento => evento.id === reservacion.event);
    });

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };
    console.log('token ARRR', accessToken)
    const updateReservationState = (reservationId) => {
        fetch(`http://localhost:8000/update-reserv-state/${reservationId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Asegúrate de incluir tu token de autenticación aquí si es necesario
                'Authorization': `sessionid ${accessToken}`
            },
            body: JSON.stringify({
                state: selectedState
            })
        })
        .then(response => response.json())
        .then(data => {
            // Haz algo con los datos devueltos por la API
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    

    return(
        <div className="container-responsive-perfil">
            <h2 className="tittle-reservaciones">TUS RESERVARCIONES</h2>

            <div className="container-cards-events container-cards-events-responsive">

                {reservacionesConEvento.map(reservacion => (
                    <div key={reservacion.id}>
                        <div className="card">
                            <div className="content">
                                <div className="back">
                                <div className="back-content">
                                    {eventos.map(evento => {
                                        if (evento.id === reservacion.event) {
                                            return (
                                                <div key={evento.id}>
                                                    <strong className="name-event">{evento.name}</strong>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                    
                                </div>
                                </div>
                                <div className="front">
                                
                                <div className="img">
                                    <div className="circle">
                                    </div>
                                    <div className="circle" id="right">
                                    </div>
                                    <div className="circle" id="bottom">
                                    </div>
                                </div>

                                <div className="front-content">
                                    <small className="badge">{reservacion.state}</small>

                                    <select className="select-opt" value={selectedState} onChange={(event) => {
                                        setSelectedState(event.target.value);
                                        updateReservationState(reservacion.id);
                                    }}>
                                        <option value="activa">Activa</option>
                                        <option value="cancelada">Cancelada</option>
                                    </select>
                                    
                                    <button className="button-opt" onClick={() => updateReservationState(reservacion.id)}>Cambiar</button>

                                    <div className="description">
                                        <div className="title">
                                            <p className="title">
                                            <strong>Places Reserv: {reservacion.places_reserv}</strong>
                                            </p>
                                            <svg fill-rule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlns="http://www.w3.org/2000/svg"><g text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>


                        

                    </div>
                ))}

            </div>

        </div>
    );
}

export { Perfil };
