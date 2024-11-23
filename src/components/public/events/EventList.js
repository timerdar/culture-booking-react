import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EventList() {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    document.title = "Мероприятия";

    useEffect(() => {
        fetch("/api/events")
            .then((response) => {
                if (!response.ok){
                    throw new Error(`Server error: ${response.st}`)    
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


    if(loading) return <p>Загрузка...</p>;

    return (
        <div>
            <h1>Мероприятия</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}><Link to={`/events/${event.id}`}>{event.name} - {event.eventDate}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default EventList;