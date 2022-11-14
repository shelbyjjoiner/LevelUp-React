import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, saveEditedEvent } from "../../managers/EventManager";
import { getGames } from "../../managers/GameManager";



export const UpdateEvent = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()

    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        id: 0,
        game: 0,
        description: "",
        date: "",
        time: "",
        organizer: 0
    })

    useEffect(() => {
        getGames().then(setGames)
    },

        [])


    useEffect(() => {
        getEventById(eventId).then(setCurrentEvent)
    },

        [])


    const changeEventState = (evt) => {
        // TODO: Complete the onChange function
        const copy = { ...currentEvent }
        const propertyToModify = evt.target.id
        copy[propertyToModify] = evt.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Games:</label>
                    <select id="game" className="drop_down" value={currentEvent.game}
                        onChange={changeEventState}>

                        <option value={0}>Select Game</option>
                        {
                            games.map((game) => {
                                return <option value={`${game.id}`} key={`game--${game.id}`}>{game.title}</option>
                            }

                            )

                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" id="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" id="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        id: currentEvent.id,
                        game: parseInt(currentEvent.game),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        organizer: parseInt(currentEvent.organizer)
                    }

                    // Send POST request to your API
                    saveEditedEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
