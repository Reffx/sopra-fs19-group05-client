import React from "react";
import {withRouter} from "react-router-dom";
import "./player_colors.css"
import "./lobby_rectangles.css"
import {getDomain} from "../../helpers/getDomain";
import GameModel from "../shared/models/GameModel";
import {Button_1} from "../../views/design/Button";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {nextTick} from "q";

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
            gameMode: null,
            gameStatus: null,
            Player1WaitingMessage: "Waiting for Player",
            countdown: 7,
        };
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

    ready() {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${sessionStorage.getItem("userID")}/status`, {
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
        this.get_game();
        // if game gets deleted in backend and frontend still tries to fetch a deleted game
        //fetch method threw error, wrong end of json input, changed localstorage.getitem to read window location last index which is the current game Id
        var myInterval;
        myInterval = setInterval(() => {
            if (this.state.player1_status === true && this.state.player2_status === true){
                this.setState({countdown: this.state.countdown - 1});
                this.checkWeiterleitung();
                if (this.state.countdown === 0){
                clearInterval(myInterval);}
                console.log(this.state.countdown);
            }
            else if (sessionStorage.getItem("gameID") !== null && this.state.gameStatus === "Start") {
                this.get_game();
                this.changeMessage();
            }
        }, 2300)
    }


    get_game() {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}`, {
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
                    if (response.player2 !== null) {
                        this.setState({
                            player2_username: response.player2.username,
                            player2_id: response.player2.id,
                            player2_status: response.player2.status,
                            player2_color: response.player2.color,
                            player2_gameID: response.player2.gameId,
                        })
                    }
                    //below condition is used when player1 or 2 leaves the lobby  --> otherwise player2_name wont update
                    if (response.player2 === null) {
                        this.setState({
                            player2_username: null,
                            player2_id: null,
                            player2_status: null,
                            player2_color: null,
                            player2_gameID: null,
                        })
                    }
                    //added this if statement to avoid the fetch error after player1 leaves lobby and lobbysize is 1 which means there is no player2
                    if (response.player1 === null) {
                        this.setState({
                            player1_username: null,
                            player1_id: null,
                            player1_status: null,
                            player1_color: null,
                            player1_gameID: null,
                        })
                    }
                    this.setState({
                        gameMode: response.gameMode,
                        gameStatus: response.gameStatus
                    });
                }

                await new Promise(resolve => setTimeout(resolve, 2000));
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games LobbyOverview!!!: " + err);
            });
    }


    redCircleClick() {
        sessionStorage.setItem("color", "RED");
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${sessionStorage.getItem("userID")}/color`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                sessionStorage.getItem("color")
            )
        })
            .then(response => {
                if (response.status === 404 || response.status === 500) {
                    this.setState({alertText: "Server couldn't respond correctly!"})
                }
                if (response.status === 409) {
                    console.log("Color is already in use! Please select another one!");
                } else {
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
        sessionStorage.setItem("color", "BLUE");
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${sessionStorage.getItem("userID")}/color`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                sessionStorage.getItem("color")
            )
        })
            .then(response => {
                if (response.status === 404 || response.status === 500) {
                    this.setState({alertText: "Server couldn't respond correctly!"})
                }
                if (response.status === 409) {
                    console.log("Color is already in use! Please select another one!")
                } else {
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

    setLocalStorageOpponent() {
        if ((this.state.player1_id != null) && (this.state.player2_id != null)) {
            if (sessionStorage.getItem("userID") === this.state.player1_id.toString()) {
                sessionStorage.setItem("userID_player1", this.state.player1_id);
                console.log("MyUserId:" + sessionStorage.getItem("userID"));
                console.log("I am player 1:" + sessionStorage.getItem("userID_player1"));
            }
            if (sessionStorage.getItem("userID") === this.state.player2_id.toString()) {
                sessionStorage.setItem("userID_player2", this.state.player2_id);
                console.log("MyUserId:" + sessionStorage.getItem("userID"));
                console.log("I am player 2:" + sessionStorage.getItem("userID_player2"));
            }
        }
    }

    yellowCircleClick() {
        sessionStorage.setItem("color", "YELLOW");
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${sessionStorage.getItem("userID")}/color`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                sessionStorage.getItem("color")
            )
        })
            .then(response => {
                if (response.status === 404 || response.status === 500) {
                    this.setState({alertText: "Server couldn't respond correctly!"})
                }
                if (response.status === 409) {
                    console.log("Color is already in use! Please select another one!")
                } else {
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
        sessionStorage.setItem("color", "PINK");
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${sessionStorage.getItem("userID")}/color`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                sessionStorage.getItem("color")
            )
        })
            .then(response => {
                if (response.status === 404 || response.status === 500) {
                    this.setState({alertText: "Server couldn't respond correctly!"})
                }
                if (response.status === 409) {
                    console.log("Color is already in use! Please select another one!")
                } else {
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

    checkReadyPlayer1() {
        if (this.state.player1_status === false) {
            return (<div> Ready? <div className="notReady"> ✖ </div></div>);
        }
        if (this.state.player1_status === true) {
            return (<div> Ready? <div className="ready"> ✔ </div></div>);
        }
    }

    checkReadyPlayer2() {
        if (this.state.player2_status === false) {
            return (<div> Ready? <div className="notReady"> ✖ </div></div>);
        }
        if (this.state.player2_status === true) {
            return (<div> Ready? <div className="ready"> ✔ </div></div>);
        }
    }

    changeMessage() {
        console.log(this.state.player2_username);
        if (this.state.player2_username != null) {
            this.setState({
                Player1WaitingMessage: this.state.player2_username
            });
        }
        if (this.state.player2_username === null && this.state.Player1WaitingMessage !== "Waiting for Player" && (this.state.Player1WaitingMessage !== "Waiting for Player.") && (this.state.Player1WaitingMessage !== "Waiting for Player..") && (this.state.Player1WaitingMessage !== "Waiting for Player...")) {
            this.setState({
                Player1WaitingMessage: "Waiting for Player"
            });
        }
        if (this.state.Player1WaitingMessage === "Waiting for Player") {
            setTimeout(() => {
                this.setState({
                    Player1WaitingMessage: "Waiting for Player."
                });
            }, 500);
        } else if (this.state.Player1WaitingMessage === "Waiting for Player.") {
            setTimeout(() => {
                this.setState({
                    Player1WaitingMessage: "Waiting for Player.."
                });
            }, 500);
        } else if (this.state.Player1WaitingMessage === "Waiting for Player..") {
            setTimeout(() => {
                this.setState({
                    Player1WaitingMessage: "Waiting for Player..."
                });
            }, 500);
        } else if (this.state.Player1WaitingMessage === "Waiting for Player...") {
            setTimeout(() => {
                this.setState({
                    Player1WaitingMessage: "Waiting for Player"
                });
            }, 500);
        }
    }

    isColorBoxVisibleP1() {
        if (this.state.player1_username !== sessionStorage.getItem("username")) {
            return "invisible"
        }
    }

    isColorBoxVisibleP2() {
        if (this.state.player2_username !== sessionStorage.getItem("username")) {
            return "invisible"
        }
    }

    getColorOverviewBox(color) {
        if (color === "RED") {
            return "overview-box-red";
        } else if (color === "BLUE") {
            return "overview-box-blue";
        } else if (color === "YELLOW") {
            return "overview-box-yellow";
        } else if (color === "PINK") {
            return "overview-box-pink";
        } else {
            return "overview-box"
        }
    }

    checkWeiterleitung() {
        if (this.state.countdown <= 0 && (this.state.gameMode === "NORMAL")) {
            this.state.gameStatus = "notStart";
            this.props.history.push(`/game/${sessionStorage.getItem("gameID")}/gamePlay`)
        } else if (this.state.countdown <= 0 && (this.state.gameMode === "GOD")) {
            if (this.state.gameMode === "GOD") {
                this.state.gameStatus = "notStart";
                this.props.history.push(`/game/${sessionStorage.getItem("gameID")}/chooseGodCard`)
            }
        }
    }

    under10(number){
        if (number < 7) {return number}
        else return null;
    }



    render() {
        return (
            <div className="lobby-overview-div">
                <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
                </link>
                <h1 className="lobby-overview-h1"> {this.state.player1_username}'s {this.state.gameMode} Mode
                    Lobby </h1>
                <h1 className="countdown-h1"> {this.under10(this.state.countdown)}</h1>
                <div class="flexBox">
                    <div class={this.getColorOverviewBox(this.state.player1_color)}>
                        <div class="player-box">
                            <p>{this.state.player1_username}</p>
                            <div className={this.isColorBoxVisibleP1()}>
                                <p>Choose your Color:</p>
                                <button
                                    disabled={!(sessionStorage.getItem("username") === this.state.player1_username)}
                                    className="circle_red" onClick={this.redCircleClick.bind(this)}></button>
                                <button
                                    disabled={!(sessionStorage.getItem("username") === this.state.player1_username)}
                                    className="circle_blue" onClick={this.blueCircleClick.bind(this)}></button>
                                <button
                                    disabled={!(sessionStorage.getItem("username") === this.state.player1_username)}
                                    className="circle_yellow" onClick={this.yellowCircleClick.bind(this)}></button>
                                <button
                                    disabled={!(sessionStorage.getItem("username") === this.state.player1_username)}
                                    className="circle_pink" onClick={this.pinkCircleClick.bind(this)}></button>
                            </div>
                            <p className="ready-p"> {this.checkReadyPlayer1()}</p>
                        </div>
                    </div>
                    <div className={this.getColorOverviewBox(this.state.player2_color)}>
                        <div className="player-box">
                            <p>{this.state.Player1WaitingMessage} </p>
                            <div className={this.isColorBoxVisibleP2()}>
                                <p>Choose your Color:</p>
                                <button
                                    disabled={!(sessionStorage.getItem("username") === this.state.player2_username)}
                                    className="circle_red" onClick={this.redCircleClick.bind(this)}></button>
                                <button
                                    disabled={!(sessionStorage.getItem("username") === this.state.player2_username)}
                                    className="circle_blue" onClick={this.blueCircleClick.bind(this)}></button>
                                <button
                                    disabled={!(sessionStorage.getItem("username") === this.state.player2_username)}
                                    className="circle_yellow" onClick={this.yellowCircleClick.bind(this)}></button>
                                <button
                                    disabled={!(sessionStorage.getItem("username") === this.state.player2_username)}
                                    className="circle_pink" onClick={this.pinkCircleClick.bind(this)}></button>
                            </div>
                            <p className="ready-p">{this.checkReadyPlayer2()}</p>
                        </div>
                    </div>
                </div>
                <div className="margin-top"></div>
                <Container>
                    <ButtonContainer/>
                    <Button_1 className="rock_lobby_2-button"
                              disabled={(this.state.player1_status === true) && (this.state.player2_status === true) || (this.state.player1_color === null) || (this.state.player2_color === null)}
                              onClick={() => {
                                  this.setLocalStorageOpponent();
                                  this.ready();
                              }}
                    >
                        Ready to Play
                    </Button_1>
                    <ButtonContainer/>
                    <ButtonContainer/>
                    <Button_1
                        disabled={(this.state.player1_status === true) && (this.state.player2_status === true)}
                        className="rock_lobby_1-button"
                              onClick={() => {
                                  this.leave_lobby();
                              }}
                    >
                        Leave Lobby
                    </Button_1>
                    <ButtonContainer/>
                </Container>
            </div>
        );
    }
}

export default withRouter(LobbyOverview);