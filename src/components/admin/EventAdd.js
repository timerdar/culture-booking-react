import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import SeatsPicker from "../seatsLogic/SeatsPicker";
import CategoriesTable from "../seatsLogic/CategoriesTable";
import Utils from "../../Utils";

function EventAdd(){

    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [groups, setGroups] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    var prevColor = ''

    document.title = 'Создание мероприятия'

    const handelSeatClick = (row, index) => {
        const cell = document.querySelector(`[data-row="${row}"][data-index="${index}"]`);
        if (selectedColor !== ''){
            prevColor = (cell.style.backgroundColor === ""?'#949494':Utils.rgbStringToHex(cell.style.backgroundColor));

            const s = groups;
            if (selectedColor !== prevColor){
                s.foreach((group) => {
                    if (group.color === prevColor){
                        let item_index = group.seatsArray.indexOf(`${row}-${index}`)
                        console.log(item_index, group.seatsArray[item_index]);
                        
                        if (item_index > -1){
                            group.seatsArray.splice(item_index, 1);
                        }
                    }else if(group.color === selectedColor){
                        group.seatsArray.push(`${row}-${index}`)
                    }
                })
            }
            setGroups(s);
            cell.style.backgroundColor = selectedColor;
        }
        
    }

    function addEventToApi(name, description, eventDate, groups){
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
                'seats': groups
                })
        })
        .then((response) => {
            if (!response.ok){
                throw new Error(`Http error! status: ${response.status}`)
            }
            return response.json();
        })
        .then((data) => {
            alert(`Мероприятие "${data.name}" создано`)
            navigate(`/events`);
        })
        .catch((err) => {
            console.error('Error creating event:', err.message);
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        var formattedGroups = [];
        groups.foreach((group) => {
            var seats = [];
            group.seatsArray.foreach((seat) => {
                seats.push({
                    seat: `${seat}`,
                    status: 'свободно'
                })
            })
            if (seats.length !== 0){
                formattedGroups.push(
                    {
                        "name": group.name,
                        "color": group.color,
                        "seats" : seats
                    }
                )
            }
        })
        if(formattedGroups.length === 0){
            alert("Добавьте хотя бы одну группу");
        }else{
            addEventToApi(name, description, eventDate, formattedGroups);
        }
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
            <div className="column1">
                <CategoriesTable setGroupsArray={setGroups} setSelectedColor={setSelectedColor} selectedColor={selectedColor} groupsArray={groups}/>
                <SeatsPicker handelSeatClick={handelSeatClick}/>
            </div>
        </div>
            
    )
}

export default EventAdd;