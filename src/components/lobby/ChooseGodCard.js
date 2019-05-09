import React from "react";
import "./chooseGodCard.css"
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import GameModel from "../shared/models/GameModel";
import Player from "../shared/models/Player";
import User from "../shared/models/User";

class ChooseGodCard extends React.Component {

    constructor() {
        super();
        this.state = {
            game: null,
            gameStatus: null,
            chosenCardPlayer1: null,
            chosenCardPlayer2: null,
            alertText: "",
            player1: Player,
            player2: Player,
            card1: "Apollo",
            card2: "Artemis",
            card3: "Athena",
            card4: "Atlas",
            card5: "Demeter",
            card6: "Hephaestus",
            card7: "Hermes",
            card8: "Minotaur",
            card9: "Pan",
            card10: "Prometheus",
            player_is_choosing: null,
            player_is_not_choosing: null,
        };
    }


    componentDidMount() {
        setInterval(() => {
            if (this.state.chosenCardPlayer1 !== null && this.state.chosenCardPlayer2 !== null) {
                this.alertText();
            } else {
                this.get_game();
                this.alertText()
            }
        }, 1000)
    }

    alertText() {
        setInterval(() => {
                if (this.state.game.player1.worker1.godCard !== null && this.state.game.player2.worker1.godCard !== null) {
                    this.setState({alertText: "Both players have chosen their God Cards!"})
                } else {
                    this.setState({alertText: this.getUserNameChoosing() + " can choose a Card!"})
                }
            }, 1000
        );
    }

    get_game() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async response => {
                if (response.status !== 404 || response.player1 !== null) {

                    const Player1 = new Player();
                    const Player2 = new Player();
                    const Game = new GameModel(response);
                    this.setState(Game);
                    this.setState({
                        player1: response.player1,
                        player2: response.player2,
                        player_is_playing: response.player1,
                        game: Game,
                        gameStatus: response.gameStatus
                    });
                    if (this.state.game.gameStatus === "Start") {
                        this.set_beginner()
                    } else if (this.state.game.gameStatus === "Move1") {
                        this.state.player_is_choosing = this.state.game.player1;
                    } else if (this.state.game.gameStatus === "Move2") {
                        this.state.player_is_choosing = this.state.game.player2;
                    }
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            })

    }

    set_beginner() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/beginner`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async beginnerId => {
                if (beginnerId === this.state.player1.id) {
                    this.state.player_is_choosing = this.state.game.player1;
                    this.state.player_is_not_choosing = this.state.game.player2;
                } else {
                    this.state.player_is_choosing = this.state.game.player2;
                    this.state.player_is_not_choosing = this.state.game.player1;
                }
                console.log(beginnerId);
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
    }

    getUserNameChoosing() {
        var username;
        if (this.state.player_is_choosing === this.state.player1.id) {
            username = this.state.player1.username;
        } else {
            username = this.state.player2.username
        }
        return username;
    }

    choose_card(card) {
        console.log(this.state.player_is_choosing);
        if (String(this.state.player_is_choosing.id) === localStorage.getItem("userID")) {
            this.setGodCard(card)
        }
    }

    setGodCard(godCard) {

        localStorage.getItem("gameID");
        console.log(localStorage.getItem("userID"));
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${localStorage.getItem("userID")}/GodCard`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: (
                godCard.toString()
            )
        })
            .then(response => response)
            .then(myResponse => {
                alert(this.state.player_is_choosing.username + " gets the card " + godCard);
                if (myResponse.status === 404 || myResponse.status === 500) {
                    //  has to be modified for game
                    console.log(myResponse)
                }
                console.log(godCard);
                console.log(this.state.player_is_choosing.username);
                console.log(this.state.player1.username);
                if (this.state.player_is_choosing.username === this.state.player1.username) {
                    localStorage.setItem("GodCardPlayer1", godCard);
                    this.state.player_is_choosing = this.state.player2;
                    this.state.player_is_not_choosing = this.state.player1;
                    this.alertText()
                } else if (this.state.player_is_choosing.username === this.state.player2.username) {
                    this.state.player_is_choosing = this.state.player1;
                    localStorage.setItem("GodCardPlayer2", godCard);
                    this.state.player_is_not_choosing = this.state.player2;
                    this.alertText()
                }
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the putting of the GodCard: ${err.message}`);
                }
            });
    }


    render() {
        return (
            <div>
                <h1>{this.state.alertText}</h1>
                <div className="first-row">
                    <div class="godCard1"><p className="godCard-p">Not available yet!</p></div>
                    <div class="godCard2" onClick={() => {
                        this.choose_card(this.state.card2)
                    }}></div>
                    <div class="godCard3" ><p className="godCard-p">Not available yet!</p></div>
                    <div class="godCard4" ><p className="godCard-p">Not available yet!</p></div>
                    <div class="godCard5" onClick={() => {
                        this.choose_card(this.state.card5)
                    }} ></div>
                </div>
                <div className="second-row">
                    <div class="godCard6" ><p className="godCard-p">Not available yet!</p></div>
                    <div class="godCard7" ><p className="godCard-p">Not available yet!</p></div>
                    <div class="godCard8" ><p className="godCard-p">Not available yet!</p></div>
                    <div class="godCard9" onClick={() => {
                        this.choose_card(this.state.card9)
                    }}></div>
                    <div class="godCard10"
                    ><p className="godCard-p">Not available yet!</p></div>
                </div>
            </div>
        )
    }
}

export default withRouter(ChooseGodCard);