import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import '../../../App.css';
import Utils from "../../../Utils";

function EventList() {

    const navigate = useNavigate()
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
        <div class="events-container">
            <h1>Мероприятия</h1>
            <p>Ниже представлен список мероприятий, на которые можно записаться. Для регистрации выберите мероприятие.</p>
            <table class="events-table">
                <thead>
                    <tr>
                        <th>Название мероприятия</th>
                        <th>Дата и время проведения</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr onClick={()=> navigate(`/events/${event.id}`)}>
                            <td class="event-name">{event.name}</td>
                            <td class="event-date">{Utils.formatDate(event.eventDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EventList;