import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import GameView from "../../views/GameView";
import {Spinner} from "../../views/design/Spinner";
import {withRouter} from "react-router-dom";

import {Button} from "../../views/design/Button";

const ButtonContainer = styled.div`
  display: row;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
  margin-top: 150px;
`;

const Games = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;


class GodModeDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null
        };
    }


    componentDidMount() {
        fetch(`${getDomain()}/games/mode/GOD`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async games => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 800));

                this.setState({games});
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
    }

    join_lobby(size) {
        if(size !== 2) {
            fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/player`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    localStorage.getItem("userID")
                )
            })
                .then(returnedGame => {
                    if (returnedGame.status === 404 || returnedGame.status === 500) {
                        //  has to be modified for game
                        this.setState({alertText: "Game coudn't be created!"})
                    } else if (returnedGame.status === 409) {
                        this.setState({alertText: "Lobby is full!"})
                    } else {
                        this.props.history.push(`/game/${localStorage.getItem("gameID")}`);
                    }
                })
                .catch(err => {
                    if (err.message.match(/Failed to fetch/)) {
                        alert("The server cannot be reached. Did you start it?");
                    } else {
                        alert(`Something went wrong during the creation: ${err.message}`);
                    }
                });
        }
    }

    render() {
        return (
            <Container>

                <h2>Dashboard!</h2>
                <p>Here you see all God Mode Games, click on Game to join:</p>
                <ButtonContainer/>
                <Button
                    width="30%"
                    onClick={() => {
                        this.props.history.push("/godModeLobby");
                    }}
                >
                    Back
                </Button>
                <ButtonContainer/>
                {!this.state.games ? (
                    <Spinner/>
                ) : (
                    <div>
                        <Games>
                            {this.state.games.map(game => {
                                return (
                                    <PlayerContainer key={game.id}
                                                     disabled={!(game.size === 2)}
                                                     onClick={() => (localStorage.setItem("gameID", game.id), this.join_lobby(game.size))}>
                                        <GameView game={game}/>
                                    </PlayerContainer>
                                );
                            })}
                        </Games>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(GodModeDashboard);