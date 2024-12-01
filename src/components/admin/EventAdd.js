import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import SeatsPicker from "../seatsLogic/SeatsPicker";
import CategoriesTable from "../seatsLogic/CategoriesTable";

function EventAdd(){

    const { navigate } = useNavigate();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [seats, setSeats] = useState('')
    const [id, setId] = useState(0)
    const [groups, setGroups] = useState([]);
    const [selectedColor, setSelectedColor] = useState();
    let commitedSeats = [];

    document.title = 'Создание мероприятия'

    const handelSeatClick = (row, index) => {
        //console.log(`Место ${row} ${index}`)
        const cell = document.querySelector(`[data-row="${row}"][data-index="${index}"]`);
        groups.map((group) => {if(group.color === selectedColor) group.totalSeats++});
        cell.style.backgroundColor = selectedColor;
    }

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
                    {seats}
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
            navigate(`/events`);
        })
        .catch((err) => {
            console.error('Error creating event:', err.message);
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(description)
        //addEventToApi(name, description, eventDate, seats);
    }

    return (
        <div class="create-event-container">
            <form class="form-container" onSubmit={handleSubmit}>
                <h1>Создание мероприятия</h1>
                <div class="col-input">
                    <input 
                        placeholder="Название мероприятия"
                        type="text"
                        id="add-new-event-name"
                        name="name"
                        autoComplete="off"
                        value={name}
                        required
                        onChange={(event) => {setName(event.target.value)}}
                    />
                </div>
                <div class="col-textarea">
                    <textarea 
                    id="add-new-event-desctiption"
                    name="description"
                    placeholder="Описание"
                    rows={5}
                    cols={25}
                    autoComplete="off"
                    required
                    onChange={(event) => {setDescription(event.target.value)}}
                    />
                </div>
                <div class="col-input">
                <input 
                        type="datetime-local"
                        id="add-new-event-date"
                        name="eventDate"
                        required
                        autoComplete="off"
                        value={eventDate}
                        onChange={(event) => {setEventDate(event.target.value)}}
                    />
                </div>
                <button class="form-button" type="submit">
                    Добавить
                </button>
            </form>
            <CategoriesTable setGroupsArray={setGroups} setSelectedColor={setSelectedColor} groupsArray={groups}/>
            <SeatsPicker handelSeatClick={handelSeatClick}/>
        </div>
            
    )
}

export default EventAdd;