import { useEffect, useState} from "react";
import { useNavigate, useParams  } from "react-router-dom";
import '../../../App.css';

function VisitorAdd(){
    const navigate = useNavigate(); 
    const { id } = useParams();
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [fathername, setFathername] = useState('')
    const [category, setCategory] = useState('')
    const [userId, setUserId] = useState();

    document.title = "Регистрация";

    function addVisitor(name, surname, fathername, category){
        fetch(`/api/visitors`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'name':name,
                        'surname':surname,
                        'fathername':fathername,
                        'category':category
                    }
                )
            }
        )
        .then((response) => {
            if(!response.ok){
                throw new Error(`Error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then((data) => {
            setUserId(data.id);
            console.log(data);
            navigate(`/events/${id}/seats`, {state: {user: data}});
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        addVisitor(name, surname, fathername, category);
    }

    useEffect( () => {
        fetch(`/api/events/${id}/categories`)
        .then((response) => {
            if (!response.ok){
                if (response.status === 400){
                    throw new Error(response.body.message);
                }else if(response.status === 404){
                    throw new Error("Возникла ошибка, проверьте список мероприятий!")
                }
            }
            return response.json();
        })
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => {
            alert(err);
        })
    }, []);
        

    return (
        <div class="container">
            <form onSubmit={handleSubmit} class="form-container">
                <h1>Введите свои данные</h1>
                <div class="row">
                    <div class="col-input">
                        <input 
                            type="text"
                            id="add-consumer-surname"
                            name="surname"
                            autoComplete="off"
                            required
                            placeholder="Фамилия"
                            value={surname}
                            onChange={(event) => {setSurname(event.target.value)}}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-input">
                        <input 
                            type="text"
                            id="add-consumer-name"
                            name="name"
                            autoComplete="off"
                            required
                            placeholder="Имя"
                            value={name}
                            onChange={(event) => {setName(event.target.value)}}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-input">
                        <input
                            type="text"
                            id="add-consumer-fathername"
                            name="fatherName"
                            autoComplete="off"
                            required
                            placeholder="Отчество"
                            value={fathername}
                            onChange={(event) => {setFathername(event.target.value)}}
                        />
                    </div>
                </div>
                <div class="row">
                    <label>
                        Выберите сектор:
                    </label>
                </div>
                <div class="row-radio">
                    {categories.map((cat, index) => (
                        <div key={index} class="input-radio-row">
                            <div class="input-radio">
                                <input 
                                    type="radio"
                                    name="category"
                                    value={cat}
                                    onChange={(event) => setCategory(event.target.value)}
                                />
                                <label>{cat}</label>
                            </div>
                        </div>
                    ))}
                </div>
                <button class="form-button" type="submit">
                    Выбрать место
                </button>
            </form>
        </div>
    );

}

export default VisitorAdd;