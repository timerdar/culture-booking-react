import { useEffect, useState } from "react";
import SeatsPicker from "../../seatsLogic/SeatsPicker";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Utils from "../../../Utils";

function SelectSeat(){
    const location = useLocation();
    const visitor = location.state;
    const event_id = useParams();
    const navigate = useNavigate();
    
    document.title = 'Выбор места'



    function seatsFilter(input_category){
        

        fetch(`/api/events/${event_id.id}/seats?`+ new URLSearchParams({
                sector: input_category
                }))
                .then((response) => {
                    if (!response.ok){
                        throw new Error(`Server error: ${response.st}`)    
                    }
                    return response.json();
                })
                .then((data) => {
                    data.forEach(sector => {
                        let color = sector.color;
                        sector.seats.forEach(seat => {
                            let seat_row = seat.seat.split('-')[0]
                            let seat_index = seat.seat.split('-')[1]
                            let cell = document.querySelector('td[data-row="' + seat_row + '"][data-index="' + seat_index + '"]')
                            if (seat.status === "свободно"){
                                cell.style.backgroundColor = color;                            
                            }
                        })
                    });

                })
                .catch((err) => {
                    Error(err);
                });
    };

    seatsFilter(visitor.user.category);
    //seatsFilter("all")

    
    const handelSeatClick = (row, index) => {
        createTicket(parseInt(visitor.user.id), parseInt(event_id.id), `${row}-${index}`)
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