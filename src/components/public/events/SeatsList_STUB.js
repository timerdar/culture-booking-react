import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function SeatsList(){
    const [seat, setSeat]  = useState();
    const location = useLocation();
    const visitor_id = location.state;
    const event_id = useParams();
    const navigate = useNavigate();
    
    function createTicket(visitor_id, event_id, seat){
        fetch('/api/tickets', 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'visitorId' : visitor_id,
                    'eventId': event_id,
                    'seat': seat
                })
            }
        )
        .then((response) => {
            if (!response.ok){
                throw new Error(`HTTP error: ${response.status}`)
            }
            return response.json();
        })
        .then((data) => {
            navigate(`/tickets/${data.uuid}`);
        })
        .catch((err) => {
            alert(err);
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        createTicket(parseInt(visitor_id.userId), parseInt(event_id.id), seat);
    }

    return (
        <div>
            <h1>Выберите место</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="select-seat"
                    name="seat"
                    autoComplete="off"
                    value={seat}
                    onChange={(event) => {setSeat(event.target.value)}}
                />
                <button type="submit">Получить билет</button>
            </form>
        </div>
    );
};

export default SeatsList;