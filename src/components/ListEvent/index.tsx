import React, { useState, useEffect } from "react";
import { Reserv } from '../Reserv/index.tsx'
import logo from '../../img/portada-eventos.png';
import './ListEvent.css'
import { useAuth } from '../../Context/index.tsx';

function ListEvent() {
    const [events, setEvents] = useState([]);
    const [showReserv, setShowReserv] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedEventPlaces, setSelectedEventPlaces] = useState(null);

    const { accessToken } = useAuth();

    console.log(accessToken);

    const handleClick = (eventId, eventPlaces) => {
        if (!accessToken) {
            alert("Debe loguearse para reservar");
        } else {
            setSelectedEventId(eventId);
            setSelectedEventPlaces(eventPlaces);
            setShowReserv(true);
        }
    };

    useEffect(() => {
        fetch('http://localhost:8000/all-events/')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="container-cards-events">
            {showReserv ? <Reserv selectedEventId={selectedEventId} selectedEventPlaces={selectedEventPlaces} /> : events.map((event, index) => (
                <div key={index}>

                    <div className="card">
                        <div className="content">
                            <div className="back">
                                <div className="back-content">
                                    <img src={logo} alt="logo-evento" className="logo-event"/>
                                    <strong className="name-event">{event.name}</strong>
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

                                    <small className="badge">{event.date_event}</small>

                                    <button className="button" onClick={() => handleClick(event.id, event.number_of_places_available)}>Ingresar</button>

                                    <div className="description">
                                        <div className="title">
                                            <p className="title">
                                            <strong>{event.description}</strong>
                                            </p>
                                            <svg fill-rule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlns="http://www.w3.org/2000/svg"><g text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg>
                                        </div>
                                        <p className="card-footer">
                                            Total de acientos:{event.number_of_places} &nbsp; | &nbsp; Disponibles: {event.number_of_places_available}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export { ListEvent }
