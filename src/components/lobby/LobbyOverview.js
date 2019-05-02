import React from "react";
import {withRouter} from "react-router-dom";
import "./player_colors.css"
import "./lobby_rectangles.css"
import {getDomain} from "../../helpers/getDomain";
import GameModel from "../shared/models/GameModel";
import {Button} from "../../views/design/Button";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";

const ButtonContainer = styled.div`
  display: row;
  justify-content: center;
  margin-top: 20px;
`;
const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  display: row;
`;


class LobbyOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player1_username: null,
            player1_id: null,
            player1_status: null,
            player1_color: null,
            player1_gameID: null,
            player2_username: null,
            player2_id: null,
            player2_status: null,
            player2_color: null,
            player2_gameID: null,
        };
    }

    leave_lobby() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${localStorage.getItem("userID")}`, {
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
                    localStorage.removeItem("gameID");
                    console.log(localStorage.getItem("gameID"));
                    this.componentDidMount(LobbyOverview);
                    this.props.history.push("/NormalModeLobby");

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

    ready() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${localStorage.getItem("userID")}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(returnedGame => {
                if (returnedGame.status === 404 || returnedGame.status === 500) {
                    //  has to be modified for game
                    this.setState({alertText: "Game coudn't be created!"})
                }
                    this.componentDidMount(LobbyOverview);

            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the creation: ${err.message}`);
                }
            });
    }

    componentDidMount() {
        // if game gets deleted in backend and frontend still tries to fetch a deleted game
        //fetch method threw error, wrong end of json input, changed localstorage.getitem to read window location last index which is the current game Id
           setInterval(()=>{ if(localStorage.getItem("gameID") == null){
               return;
           }
           else{
               fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}`, {
                   method: "GET",
                   headers: {
                       "Content-Type": "application/json"
                   }
               })
                   .then(response => response.json())
                   .then(async response => {
                       if (response.status !== 404 || response.player1 !== null) {
                           //console.log(localStorage.getItem("userID"));

                           this.setState({
                               player1_username: response.player1.username,
                               player1_id: response.player1.id,
                               player1_status: response.player1.status,
                               player1_color: response.player1.color,
                               player1_gameID: response.player1.gameId,
                           });
                           //console.log(("player1ID: "+this.state.player1_id));
                           if(response.player2 != null) {
                               this.setState({
                                   player2_username: response.player2.username,
                                   player2_id: response.player2.id,
                                   player2_status: response.player2.status,
                                   player2_color: response.player2.color,
                                   player2_gameID: response.player2.gameId,})
                           }
                       }

                       await new Promise(resolve => setTimeout(resolve, 2000));
                   })
                   .catch(err => {
                       console.log(err);
                       alert("Something went wrong fetching the games: " + err);
                   });
           }}, 1000)
    }

//created for every color a function in order to set the state to the clicked color --> needs an update (not the best way to do it)
    redCircleClick() {
        localStorage.setItem("color", "RED");
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${localStorage.getItem("userID")}/color`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                localStorage.getItem("color")
            )
        })
            .then(response => {
                if (response.status === 404 || response.status === 500) {
                    this.setState({alertText: "Server couldn't respond correctly!"})
                }
                if(response.status === 409){
                    alert("Color is already in use! Please select another one!")
                }
                else {
                    this.componentDidMount(LobbyOverview);
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

    blueCircleClick() {
        localStorage.setItem("color", "BLUE");
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${localStorage.getItem("userID")}/color`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                localStorage.getItem("color")
            )
        })
            .then(response => {
                if (response.status === 404 || response.status === 500) {
                    this.setState({alertText: "Server couldn't respond correctly!"})
                }
                if(response.status === 409){
                    alert("Color is already in use! Please select another one!")
                }
                else {
                    this.componentDidMount(LobbyOverview);
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

    yellowCircleClick() {
        localStorage.setItem("color", "YELLOW");
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${localStorage.getItem("userID")}/color`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                localStorage.getItem("color")
            )
        })
            .then(response => {
                if (response.status === 404 || response.status === 500) {
                    this.setState({alertText: "Server couldn't respond correctly!"})
                }
                if(response.status === 409){
                    alert("Color is already in use! Please select another one!")
                }
                else {
                    this.componentDidMount(LobbyOverview);
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

    pinkCircleClick() {
        localStorage.setItem("color", "PINK");
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${localStorage.getItem("userID")}/color`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                localStorage.getItem("color")
            )
        })
            .then(response => {
                if (response.status === 404 || response.status === 500) {
                    this.setState({alertText: "Server couldn't respond correctly!"})
                }
                if(response.status === 409){
                    alert("Color is already in use! Please select another one!")
                }
                else {
                    this.componentDidMount(LobbyOverview);
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
            <div>
                <Container>
                    <ButtonContainer/>
                    <Button
                        width="30%"
                        onClick={() => {
                            this.leave_lobby();
                        }}
                    >
                        Leave Lobby
                    </Button>
                    <ButtonContainer/>
                </Container>
                <div class="Lobby-div">
                    <div class="first-box">
                        <div class="player-box">
                            <p>Username: {this.state.player1_username}</p>
                            <p>Your Color: {this.state.player1_color}</p>
                            <button disabled={!(localStorage.getItem("username") === this.state.player1_username)} className="circle_red" onClick={this.redCircleClick.bind(this)}></button>
                            <button disabled={!(localStorage.getItem("username") === this.state.player1_username)} className="circle_blue" onClick={this.blueCircleClick.bind(this)}></button>
                            <button disabled={!(localStorage.getItem("username") === this.state.player1_username)} className="circle_yellow" onClick={this.yellowCircleClick.bind(this)}></button>
                            <button disabled={!(localStorage.getItem("username") === this.state.player1_username)} className="circle_pink" onClick={this.pinkCircleClick.bind(this)}></button>
                            <p> Ready: {`${this.state.player1_status}`} </p>

                        </div>
                    </div>
                    <div class="second-box">
                        <div className="player-box">
                            <p>Username: {this.state.player2_username} </p>
                            <p>Your Color: {this.state.player2_color}</p>
                            <button disabled={!(localStorage.getItem("username") === this.state.player2_username)} className="circle_red" onClick={this.redCircleClick.bind(this)}></button>
                            <button disabled={!(localStorage.getItem("username") === this.state.player2_username)} className="circle_blue" onClick={this.blueCircleClick.bind(this)}></button>
                            <button disabled={!(localStorage.getItem("username") === this.state.player2_username)} className="circle_yellow" onClick={this.yellowCircleClick.bind(this)}></button>
                            <button disabled={!(localStorage.getItem("username") === this.state.player2_username)} className="circle_pink" onClick={this.pinkCircleClick.bind(this)}></button>
                            <p> Ready: {`${this.state.player2_status}`} </p>

                        </div>
                    </div>
                </div>
                <Container>
                    <ButtonContainer/>
                        <Button
                            width="30%"
                            onClick={() => {
                                this.ready()
                            }}
                        >
                            Ready to Play
                        </Button>
                        <ButtonContainer/>
                        <ButtonContainer/>
                        <Button
                            disabled={(this.state.player1_status === false) || (this.state.player2_status === false)}
                            width="30%"
                            onClick={() => {
                                this.props.history.push(`/game/${localStorage.getItem("gameID")}/gamePlay`)
                            }}
                        >
                            Go to the Playground
                        </Button>
                    <ButtonContainer/>
                </Container>
            </div>
        );

    }
}

export default withRouter(LobbyOverview);