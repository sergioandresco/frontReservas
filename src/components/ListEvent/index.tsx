import React, { useState, useEffect } from "react";

function ListEvent() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/all-events/')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {events.map((event, index) => (
                <div key={index}>
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <p>{event.date_event}</p>
                    <p>{event.number_of_places}</p>
                    <p>{event.number_of_places_available}</p>
                </div>
            ))}
        </div>
    )
}

export { ListEvent }
