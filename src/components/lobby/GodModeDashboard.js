import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import GameView from "../../views/GameView";
import {Spinner} from "../../views/design/Spinner";
import {withRouter} from "react-router-dom";

import "../game/choose_mode.css";

export const Button = styled.button`
  &:hover {
    transform: translateY(-3px);
  }
  padding: 10px;
  width: ${props => props.width || null};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  
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
            fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/player`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    sessionStorage.getItem("userID")
                )
            })
                .then(returnedGame => {
                    if (returnedGame.status === 404 || returnedGame.status === 500) {
                        //  has to be modified for game
                        this.setState({alertText: "Game coudn't be created!"})
                    } else if (returnedGame.status === 409) {
                        this.setState({alertText: "Lobby is full!"})
                    } else {
                        sessionStorage.removeItem("userID_player1");
                        sessionStorage.removeItem("userID_player2");
                        this.props.history.push(`/game/${sessionStorage.getItem("gameID")}`);
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
                <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
                </link>
                <h1_lobby>Dashboard!</h1_lobby>
                <p>Here you see all God Mode Games, click on Game to join:</p>
                {!this.state.games ? (
                    <Spinner/>
                ) : (
                    <div>
                        <Games>
                            {this.state.games.map(game => {
                                return (
                                    <PlayerContainer key={game.id}
                                                     disabled={!(game.size === 2)}
                                                     onClick={() => (sessionStorage.setItem("gameID", game.id), this.join_lobby(game.size))}>
                                        <GameView game={game}/>
                                    </PlayerContainer>
                                );
                            })}
                        </Games>
                    </div>
                )}
                <div>
                    <Button className="rock_dashbord-button"
                            width="60%"
                            onClick={() => {
                                this.props.history.push("/chooseMode");
                            }}
                    >
                        Back
                    </Button>
                </div>
            </Container>
        );
    }
}

export default withRouter(GodModeDashboard);