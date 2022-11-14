import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { deleteEvent, getEvents, joinEvent, leaveEvent } from '../../managers/EventManager'



export const EventList = (props) => {

    const [events, setEvents] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (

        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event_game">{event.game}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">{event.date}</div>
                        <div className="event__time">{event.time}</div>
                        <button className="update-button" onClick={() => navigate(`/events/${event.id}/edit`)}>Update Event</button>
                        <button className="delete-button" onClick={() => deleteEvent(event.id).then(() => { window.location.reload() })}>Delete Event</button>
                        {
                            event.joined ?
                                // TODO: create the Leave button
                                <button className="leave" onClick={() => leaveEvent(event.id).then(() => { window.location.reload() })}>Leave</button>
                                :
                                // TODO: create the Join button
                                <button className="join" onClick={() => joinEvent(event.id).then(() => { window.location.reload() })}>Join</button>


                        }


                    </section>
                })
            }
        </article>
    )
}

