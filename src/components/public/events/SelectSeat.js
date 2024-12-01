import SeatsPicker from "../../seatsLogic/SeatsPicker";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function SelectSeat(){
    const location = useLocation();
    const visitor_id = location.state;
    const event_id = useParams();
    const navigate = useNavigate();

    document.title = 'Выбор места'

    const handelSeatClick = (index, row) => {

        createTicket(parseInt(visitor_id.userId), parseInt(event_id.id), `${index}-${row}`)
    }

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


    return (<div class="select-seat-container">
        <SeatsPicker handelSeatClick={handelSeatClick}/>
    </div>);
}

export default SelectSeat;