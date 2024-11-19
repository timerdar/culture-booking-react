import { useState } from "react";

function EventAdd(){

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [eventDate, setEventDate] = useState('')
    const [seats, setSeats] = useState('')
    const [id, setId] = useState(0)

    function addEventToApi(name, description, eventDate, seats){
        fetch("/api/events", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                'name':name,
                'description':description,
                'eventDate':eventDate,
                'seats':
                    {"IT": seats}
                })
        })
        .then((response) => {
            if (!response.ok){
                throw new Error(`Http error! status: ${response.status}`)
            }
            return response.json();
        })
        .then((data) => {
            console.log('Event created: ', data);
            setId(data.id);
            window.location.assign(`/events`);
        })
        .catch((err) => {
            console.error('Error creating event:', err.message);
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        addEventToApi(name, description, eventDate, seats);
    }

    return (
        <div className="add-new-event">
            <h1>Создание мероприятия</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название мероприятия</label>
                    <input 
                        type="text"
                        id="add-new-event-name"
                        name="name"
                        autoComplete="off"
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                </div>
                <div>
                    <label>Описание</label>
                    <input 
                        type="text"
                        id="add-new-event-description"
                        name="description"
                        autoComplete="off"
                        value={description}
                        onChange={(event) => {setDescription(event.target.value)}}
                    />
                </div>
                <div>
                <label>Дата</label>
                <input 
                        type="text"
                        id="add-new-event-date"
                        name="eventDate"
                        autoComplete="off"
                        value={eventDate}
                        onChange={(event) => {setEventDate(event.target.value)}}
                    />
                </div>
                <div>
                    <label>Распределение мест</label>
                    <input 
                        type="text"
                        id="add-new-event-seats"
                        name="seats"
                        autoComplete="off"
                        value={seats}
                        onChange={(event) => {setSeats(event.target.value)}}
                    />
                </div>
                <button type="submit">
                    Добавить
                </button>
            </form>
        </div>
            
    )
}

export default EventAdd;