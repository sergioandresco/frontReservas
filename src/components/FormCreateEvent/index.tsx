import React from "react";

function FormCreateEvent() {

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:8000/create-event/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="eventName">Name</label>
            <input type="text" id="eventName" name="name" />

            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" />

            <label htmlFor="dateEvent">Date Event</label>
            <input type="date" id="dateEvent" name="date_event" />

            <label htmlFor="numSeats">Number of seats to reserve</label>
            <input type="number" id="numSeats" name="number_of_places" min="1" />

            <button type="submit">Submit</button>

        </form>
    )
}

export { FormCreateEvent }
