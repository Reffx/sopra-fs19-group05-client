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
            card1: "apollo",
            card2: "artemis",
            card3: "athena",
            card4: "atlas",
            card5: "demeter",
            card6: "hephaestus",
            card7: "hermes",
            card8: "minotaur",
            card9: "pan",
            card10: "prometheus",
            player_is_choosing: null,
            player_is_not_choosing: null,
        };
    }


    componentDidMount() {
        this.get_game();
        this.set_beginner();
        this.alertText();
    }

    alertText() {
        setInterval(() => {
                this.setState({alertText: this.getUserNameChoosing() + " can choose a Card!"})
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
                    this.state.player_is_choosing = this.state.game.player2
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
        alert(this.state.player_is_choosing.username + " gets the card " + card);
    }

    setGodCard(godCard) {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${this.state.player_is_choosing.playerId}/GodCard`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                godCard
            })
        })
            .then(response => response.json())
            .then(myResponse => {
                if (myResponse.status === 404 || myResponse.status === 500) {
                    //  has to be modified for game
                    console.log(myResponse)
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
                    <div class="godCard1" onClick={() => {
                        this.choose_card(this.state.card1)
                    }}></div>
                    <div class="godCard2" onClick={() => {
                        this.choose_card(this.state.card2)
                    }}></div>
                    <div class="godCard3" onClick={() => {
                        this.choose_card(this.state.card3)
                    }}></div>
                    <div class="godCard4" onClick={() => {
                        this.choose_card(this.state.card4)
                    }}></div>
                    <div class="godCard5" onClick={() => {
                        this.choose_card(this.state.card5)
                    }}></div>
                </div>
                <div className="second-row">
                    <div class="godCard6" onClick={() => {
                        this.choose_card(this.state.card6)
                    }}></div>
                    <div class="godCard7" onClick={() => {
                        this.choose_card(this.state.card7)
                    }}></div>
                    <div class="godCard8" onClick={() => {
                        this.choose_card(this.state.card8)
                    }}></div>
                    <div class="godCard9" onClick={() => {
                        this.choose_card(this.state.card9)
                    }}></div>
                    <div class="godCard10" onClick={() => {
                        this.choose_card(this.state.card10)
                    }}></div>
                </div>
            </div>
        )
    }
}

export default withRouter(ChooseGodCard);