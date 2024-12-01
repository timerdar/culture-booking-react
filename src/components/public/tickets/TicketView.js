import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Utils from "../../../Utils";

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

    }, [])

    if(loading) return <div>Loading</div>

    return (
        <div class="ticket-main">
            <div class="ticket-row">
                <label>Посетитель: <span>{`${ticket.visitor.surname} ${ticket.visitor.name} ${ticket.visitor.fathername}`}</span></label>
            </div>
            <div class="ticket-row">
                <label>Мероприятие: <span>{`${ticket.event.name}`}</span></label>
            </div>
            <div class="ticket-row">
                <label>Дата: <span>{`${Utils.formatDate(ticket.event.eventDate)}`}</span></label>
            </div>
            <div class="ticket-row">
                <label>Место: <span>{`${ticket.seat}`}</span></label>
            </div>
            <img class="qr-code-img" src={qr} alt="ticket_qr"/>
        </div>
    );
}

export default TicketView;