import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function TicketView(){

    const { uuid } = useParams();
    const [ticket, setTicket] = useState();
    const [loading, setLoading] = useState(true);
    const [qr, setQr] = useState();

    document.title = "Билет";

    useEffect(() => {
        fetch(`/api/tickets/${uuid}`)
        .then((response) => {
            if(!response.ok){
                if (response.status === 404){
                    throw new Error("Билет не найден")
                }else{
                    throw new Error(`Ошибка: ${response.body}`)
                }
            }
            return response.json()
        })
        .then((data) => {
            setTicket(data);
            setLoading(false);
        })
        .catch((err) => {
            alert(err)
        })

        fetch(`/api/tickets/generate/qr/${uuid}`)
        .then((response) => {
            if(!response.ok){
                throw new Error("Ошибка")
            }
            return response.blob();
        })
        .then((blob) => {
            setQr(URL.createObjectURL(blob));
        })
        .catch((err) => {
            alert(err);
        })

    }, [uuid])

    if(loading) return <div>Loading</div>

    return (
        <div>
            <div>
                <label>Посетитель: {`${ticket.visitor.surname} ${ticket.visitor.name} ${ticket.visitor.fathername}`}</label>
            </div>
            <div>
                <label>Мероприятие: {`${ticket.event.name}`}</label>
            </div>
            <div>
                <label>Дата: {`${ticket.event.eventDate}`}</label>
            </div>
            <img src={qr} alt="ticket_qr"/>
        </div>
    );
}

export default TicketView;