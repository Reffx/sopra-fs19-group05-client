import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import "../game/choose_mode.css";

import {withRouter} from "react-router-dom";
import GameModel from "../shared/models/GameModel";


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
  margin-top: 250px;
`;

class NormalModeLobby extends React.Component {

    constructor() {
        super();
        this.state = {
            id: null,
            player1: null,
            gameMode: null,
        };
    }


    create_lobby() {
        if (sessionStorage.getItem("gameID") != null){
            this.leave_lobby();
        }
        fetch(`${getDomain()}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                player1: {
                    id: sessionStorage.getItem("userID"),
                    username: sessionStorage.getItem("username"),
                },
                gameMode: "NORMAL",
                isPlaying: false,
            })
        })
            .then(response => response.json())
            .then(returnedGame => {
                if (returnedGame.status === 404 || returnedGame.status === 500) {
                    //  has to be modified for game
                    this.setState({alertText: "Game coudn't be created!"})
                } else {
                    const Game = new GameModel(returnedGame);
                    console.log(Game);
                    sessionStorage.setItem("gameID", Game.id);
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

    leave_lobby() {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${sessionStorage.getItem("userID")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(returnedGame => {
                if (returnedGame.status === 404 || returnedGame.status === 500) {
                    //  has to be modified for game
                    this.setState({alertText: "You could not leave the lobby"})
                } else {
                    sessionStorage.removeItem("gameID");
                    console.log(sessionStorage.getItem("gameID"));
                    this.props.history.push("/NormalModeLobby");
                    sessionStorage.removeItem("gameID");
                    console.log(sessionStorage.getItem("gameID"));
                    this.props.history.push("/chooseMode");
                }
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during leaving the lobby: ${err.message}`);
                }
            });
    }


    render() {
        return (
            <Container>
                <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
                </link>
                <h1_lobby>Choose Option</h1_lobby>
                <p></p>
                    <div>
                        <Button className="rock-button"
                                width="50%"
                                onClick={() => {
                                    this.create_lobby();
                                }}
                        >
                            Create Lobby
                        </Button>
                    </div>
                    <div id="button-div">
                        <Button className="rock-button"
                                width="50%"
                                onClick={() => {
                                    this.props.history.push("/NormalModeDashboard");
                                }}
                        >
                            Join Lobby
                        </Button>
                    </div>
                    <div id="button-div">
                        <Button className="rock-button"
                                width="50%"
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

export default withRouter(NormalModeLobby);