import React, { useState, useEffect } from "react";
import { Reserv } from '../Reserv/index.tsx'

function ListEvent() {
    const [events, setEvents] = useState([]);
    const [showReserv, setShowReserv] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedEventPlaces, setSelectedEventPlaces] = useState(null);


    const handleClick = (eventId, eventPlaces) => {
        setSelectedEventId(eventId);
        setSelectedEventPlaces(eventPlaces);
        setShowReserv(true);
    };

    useEffect(() => {
        fetch('http://localhost:8000/all-events/')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {showReserv ? <Reserv selectedEventId={selectedEventId} selectedEventPlaces={selectedEventPlaces} /> : events.map((event, index) => (
                <div key={index}>
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <p>{event.date_event}</p>
                    <p>{event.number_of_places}</p>
                    <p>{event.number_of_places_available}</p>
                    <button onClick={() => handleClick(event.id, event.number_of_places_available)}>Ingresar</button>
                </div>
            ))}
        </div>
    )
}

export { ListEvent }
