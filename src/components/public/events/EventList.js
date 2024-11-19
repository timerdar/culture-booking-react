import { useState, useEffect } from "react";

function EventList() {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/events")
            .then((response) => {
                if (!response.ok){
                    console.error(`Error. Code: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);


    if(loading) return <p>loading...</p>;

    return (
        <div>
            <h1>Мероприятия</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>{event.name} - {event.eventDate}</li>
                ))}
            </ul>
        </div>
    )
}

export default EventList;