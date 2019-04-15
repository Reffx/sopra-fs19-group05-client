import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";

const ButtonContainer = styled.div`
  display: row;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
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
class NormalModeLobby extends React.Component {

    logout() {
        let curToken = localStorage.getItem("token");
        fetch(`${getDomain()}/users`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: curToken
            })
        })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }
    goBack(){
        this.props.history.push("/chooseMode");
    }

    create_lobby(){
        fetch(`${getDomain()}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: localStorage.getItem("username"),
                mode: "normalMode",
            })
        })
            .then(response => response.json())
            .then(returnedGame => {
                if (returnedGame.status === 404 || returnedGame.status === 500) {
                    //  has to be modified for game
                    this.setState({alertText: "Game coun't be created!"})
                } else {
                    console.log(returnedGame);
                    const Game = new Game(returnedGame);
                    localStorage.setItem("gameID", Game.id);
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

    render() {
        return (
            <Container>
                <h2>Choose Option</h2>
                <p>Here you see all Lobbys for Normal Mode:</p>

                    <div>
                        <ButtonContainer/>
                        <Button
                            width="30%"
                            onClick={() => {
                                this.props.history.push("/game/lobbyOverview");
                            }}
                        >
                            Create Lobby
                        </Button>
                        <ButtonContainer/>
                        <ButtonContainer/>
                        <Button
                            width="30%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Join Lobby
                        </Button>
                        <ButtonContainer/>
                        <ButtonContainer/>
                        <Button
                            width="30%"
                            onClick={() => {
                                this.goBack();
                            }}
                        >
                            Back
                        </Button>
                        <ButtonContainer/>
                    </div>
            </Container>
        );
    }
}

export default withRouter(NormalModeLobby);