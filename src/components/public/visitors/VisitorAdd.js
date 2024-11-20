import { useEffect, useState} from "react";
import { useNavigate, useParams  } from "react-router-dom";

function VisitorAdd(){
    const navigate = useNavigate(); 
    const { id } = useParams();
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [fathername, setFathername] = useState('')
    const [category, setCategory] = useState('')
    var userId;

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
            userId = response.json().id;
            navigate(`/events/${id}/seats`, {state: {userId}});
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        addVisitor(name, surname, fathername, category)
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
    }, [id]);
        

    return (
        <div>
            <h1>Введите свои данные</h1>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>Имя</label>
                    <input 
                        type="text"
                        id="add-consumer-name"
                        name="name"
                        autoComplete="off"
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                </div>
                <div>
                    <label>Фамилия</label>
                    <input 
                        type="text"
                        id="add-consumer-surname"
                        name="surname"
                        autoComplete="off"
                        value={surname}
                        onChange={(event) => {setSurname(event.target.value)}}
                    />
                </div>
                <div>
                <label>Отчество</label>
                <input 
                        type="text"
                        id="add-consumer-fathername"
                        name="fatherName"
                        autoComplete="off"
                        value={fathername}
                        onChange={(event) => {setFathername(event.target.value)}}
                    />
                </div>
                <div>
                    {categories.map((cat, index) => (
                        <div key={index}>
                            <input 
                                type="radio"
                                name="category"
                                value={cat}
                                onChange={(event) => setCategory(event.target.value)}
                            />
                            <label>{cat}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">
                    Выбрать место
                </button>
            </form>
        </div>
    );

}

export default VisitorAdd;