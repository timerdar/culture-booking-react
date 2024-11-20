import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function SelectedEvent(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState("")
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch(`/events/${id}`)
        .then((response) => {
            if(!response.ok){
                throw new Error(`Server error: ${response.status}`)    
            }
            return response.json();
        })
        .then((data) => {
            setEvent(data);
            setLoading(false);
        })
        .catch((err) => {
            return <h2>Ошибка загрузки мероприятия: {err}</h2>
        })
    }, [id])

    if (loading) return <h1>Загрузка..</h1>

    return(
        <div>
            <h1>{event.name} - {event.eventDate}</h1>
            <p>{event.description}</p>
            <button onClick={() => navigate(`/events/${id}/registration/`)}>Забронировать место</button>
        </div>
    );
}

export default SelectedEvent;