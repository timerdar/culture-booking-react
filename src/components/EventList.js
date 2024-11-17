function EventList(props) {

    var event1;

    fetch("/api/events/2").then(
        (response) => {
            event1 = response.json()
            console.log(event1)
        }
        );

    return (
        <div>
            <h1>Мероприятия</h1>
            <ul>
                <li key={event1.id}>{event1.name} - {event1.eventDate}</li>
            </ul>
        </div>
    )
}

export default EventList;