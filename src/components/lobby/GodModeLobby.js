import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {withRouter} from "react-router-dom";
import GameModel from "../shared/models/GameModel";

const ButtonContainer = styled.div`
  display: row;
  justify-content: center;
  margin-top: 25px;
`;

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
  margin-top: 250px;
`;
export const Button = styled.button`
  &:hover {
    transform: translateY(-3px);
  }
  padding: 10px;
  width: ${props => props.width || null};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

class GodModeLobby extends React.Component {

    constructor() {
        super();
        this.state = {
            id: null,
            player1: null,
            gameMode: null,
        };
    }


    create_lobby() {
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
                gameMode: "GOD",
            })
        })
            .then(response => response.json())
            .then(returnedGame => {
                if (returnedGame.status === 404 || returnedGame.status === 500) {
                    //  has to be modified for game
                    this.setState({alertText: "Game coudn't be created!"})
                } else {
                    console.log(returnedGame);
                    const Game = new GameModel(returnedGame);
                    sessionStorage.setItem("gameID", Game.id);
                    sessionStorage.removeItem("userID_player1");
                    sessionStorage.removeItem("userID_player2");
                    this.props.history.push({pathname: `/game/${Game.id}`});
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

    render() {
        return (
            <Container>
                <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
                </link>
                <h1_lobby>Choose Option</h1_lobby>
                    <div id="button-div">
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
                                    this.props.history.push("/GodModeDashboard");
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

export default withRouter(GodModeLobby);