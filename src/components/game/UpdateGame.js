import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById, getGameTypes, saveEditedGame } from "../../managers/GameManager";

export const UpdateGame = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()


    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({
        id: 0,
        skill_level: 0,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(setGameTypes)
    }, [])

    useEffect(() => {
        getGameById(gameId).then(setCurrentGame)
    },

        [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentGame }
        const propertyToModify = domEvent.target.id
        copy[propertyToModify] = domEvent.target.value
        setCurrentGame(copy)
    }





    return (
        <form className="gameForm">
            <h2>Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" id="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" id="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" id="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type:</label>
                    <select id="game_type" className="drop_down" value={currentGame.game_type}
                        onChange={changeGameState}>

                        <option value={0}>Select Game Type</option>
                        {
                            gameTypes?.map((type) => {
                                return <option value={`${type.id}`} key={`type--${type.id}`}>{type.label}</option>
                            }

                            )

                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    saveEditedGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
