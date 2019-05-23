import React from "react";
import "./chooseGodCard.css"
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {Button_1} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import GameModel from "../shared/models/GameModel";
import Player from "../shared/models/Player";
import User from "../shared/models/User";

const ButtonContainer = styled.div`
  display: row;
  justify-content: center;
  margin-top: 20px;
`;

class ChooseGodCard extends React.Component {

    constructor() {
        super();
        this.state = {
            game: null,
            gameStatus: null,
            chosenCardPlayer1: null,
            chosenCardPlayer2: null,
            alertText: "",
            player1: null,
            player2: null,
            card1: "Apollo",
            card1Inactive: "NONE",
            card2: "Artemis",
            card2Inactive: "InactiveArtemis",
            card3: "Athena",
            card3Inactive: "InactiveAthena",
            card4: "Atlas",
            card4Inactive: "InactiveAtlas",
            card5: "Demeter",
            card5Inactive: "InactiveDemeter",
            card6: "Hephaestus",
            card6Inactive: "InactiveHephaestus",
            card7: "Hermes",
            card7Inactive: "InactiveHermes",
            card8: "Minotaur",
            card8Inactive: "NONE",
            card9: "Pan",
            card9Inactive: "NONE",
            card10: "Prometheus",
            card10Inactive: "InactivePrometheus",
            player_is_choosing: null,
            player_is_not_choosing: null,
        };
    }


    componentDidMount() {
        sessionStorage.setItem("GodCardPlayer1", null);
        sessionStorage.setItem("GodCardPlayer2", null);
        setInterval(() => {
            if (this.state.gameStatus === "Start" || this.state.gameStatus === null) {
                this.get_game();
            }
        }, 1000)
    }

    return_active_card(inactiveCard) {
        if (inactiveCard === "Apollo") {
            return "Apollo"
        } else if (inactiveCard === "InactiveArtemis") {
            return "Artemis"
        } else if (inactiveCard === "Athena") {
            return "Athena"
        } else if (inactiveCard === "InactiveAtlas") {
            return "Atlas"
        } else if (inactiveCard === "InactiveDemeter") {
            return "Demeter"
        } else if (inactiveCard === "InactiveHephaestus") {
            return "Hephaestus"
        } else if (inactiveCard === "InactiveHermes") {
            return "Hermes"
        } else if (inactiveCard === "Minotaur") {
            return "Minotaur"
        } else if (inactiveCard === "Pan") {
            return "Pan"
        } else if (inactiveCard === "InactivePrometheus") {
            return "Prometheus"
        }
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

                    const Player1 = new Player();
                    const Player2 = new Player();
                    const Game = new GameModel(response);
                    this.setState(Game);
                    this.setState({
                        player1: response.player1,
                        player2: response.player2,
                        player_is_playing: response.player1,
                        game: Game,
                        gameStatus: response.gameStatus,
                        chosenCardPlayer1: response.player1.worker1.godCard,
                        chosenCardPlayer2: response.player2.worker1.godCard,
                    });
                    if (this.state.player2.worker1.godCard === "None") {
                        this.setState({alertText: "Player1 can choose 2 GodCards as selection!"})
                    }
                    if (this.state.player2.worker1.godCard !== "None") {
                        this.setState({player_is_playing: this.state.player2});
                        this.setState({alertText: "Player2 can choose one of the two GodCards!"})
                    }
                    if (this.state.gameStatus !== "Start") {
                        this.setState({alertText: this.state.player1.username + " has " + this.return_active_card(this.state.player1.worker1.godCard) + ", " + this.state.player2.username + " has " + this.return_active_card(this.state.player2.worker1.godCard)})
                    }
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
    }

    set_beginner() {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/beginner`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async beginnerId => {
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
    }


    choose_card(card, inactiveCard) {
        if (String(this.state.player_is_playing.id) === sessionStorage.getItem("userID")) {
            console.log(card, inactiveCard);
            if (this.state.player_is_playing === this.state.player1) {
                if (this.state.player1.worker1.godCard === "None") {
                    console.log(card, inactiveCard, "a");
                    this.setGodCard(card, this.state.player1.id, inactiveCard)
                } else if (this.state.player1.worker1.godCard !== "None" && this.return_active_card(this.state.player1.worker1.godCard) !== card) {
                    this.setGodCard(card, this.state.player2.id, inactiveCard)
                }
            }
            if (this.state.player_is_playing === this.state.player2) {
                if (this.state.player1.worker1.godCard === card || this.state.player1.worker1.godCard === inactiveCard) {
                    this.setGodCard(this.return_active_card(this.state.player2.worker1.godCard), this.state.player1.id, this.state.player2.worker1.godCard);//not working like that
                    this.setGodCard(card, this.state.player2.id, inactiveCard);
                    this.set_beginner()
                } else if (this.state.player2.worker1.godCard === card || this.state.player2.worker1.godCard === inactiveCard) {
                    this.set_beginner()
                }
            }
        }
    }

    setGodCard(godCard, id, inactiveGodCard) {
        console.log(sessionStorage.getItem("userID"));
        var tempCard;
        if (inactiveGodCard === "NONE") {
            tempCard = godCard;
        } else {
            tempCard = inactiveGodCard;
        }
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${id}/GodCard`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: (
                tempCard.toString()
            )
        })
            .then(response => response)
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

    getBorderSelected(card) {
        if (this.state.chosenCardPlayer1 === card || this.state.chosenCardPlayer2 === card ) {
            return "godCard-border"
        }
        else if (this.return_active_card(this.state.chosenCardPlayer1)=== card || this.return_active_card(this.state.chosenCardPlayer2)=== card){
            return "godCard-border"
        }
    }

    setSessionStorageCard(godCard, id) {
        if ((godCard === this.state.card1 || godCard === this.state.card1Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card1Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card1);
        }
        if ((godCard === this.state.card2 || godCard === this.state.card2Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card2Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card2);
        }
        if (((godCard === this.state.card3) || (godCard === "InactiveAthena")) && (id === this.state.player1.id)) {
            sessionStorage.setItem("GodCardPlayer1Inactive", "NONE");
            sessionStorage.setItem("GodCardPlayer1", this.state.card3);
        }
        if ((godCard === this.state.card4 || godCard === this.state.card4Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card4Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card4);
        }
        if ((godCard === this.state.card5 || godCard === this.state.card5Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card5Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card5);
        }
        if ((godCard === this.state.card6 || godCard === this.state.card6Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card6Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card6);
        }
        if ((godCard === this.state.card7 || godCard === this.state.card7Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card7Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card7);
        }
        if ((godCard === this.state.card8 || godCard === this.state.card8Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card8Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card8);
        }
        if ((godCard === this.state.card9 || godCard === this.state.card9Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card9Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card9);
        }
        if ((godCard === this.state.card10 || godCard === this.state.card10Inactive) && id === this.state.player1.id) {
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card10Inactive);
            sessionStorage.setItem("GodCardPlayer1", this.state.card10);
        }
        if ((godCard === this.state.card1 || godCard === this.state.card1Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card1Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card1);
        }
        if ((godCard === this.state.card2 || godCard === this.state.card2Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card2Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card2);
        }
        if ((godCard === this.state.card3 || (godCard === "InactiveAthena")) && (id === this.state.player2.id)) {
            sessionStorage.setItem("GodCardPlayer2Inactive", "NONE");
            sessionStorage.setItem("GodCardPlayer2", this.state.card3);
        }
        if ((godCard === this.state.card4 || godCard === this.state.card4Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card4Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card4);
        }
        if ((godCard === this.state.card5 || godCard === this.state.card5Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card5Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card5);
        }
        if ((godCard === this.state.card6 || godCard === this.state.card6Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card6Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card6);
        }
        if ((godCard === this.state.card7 || godCard === this.state.card7Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card7Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card7);
        }
        if ((godCard === this.state.card8 || godCard === this.state.card8Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card8Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card8);
        }
        if ((godCard === this.state.card9 || godCard === this.state.card9Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card9Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card9);
        }
        if ((godCard === this.state.card10 || godCard === this.state.card10Inactive) && id === this.state.player2.id) {
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card10Inactive);
            sessionStorage.setItem("GodCardPlayer2", this.state.card10);
        }

    }

    darkenGodCard(n, card) {
        if ((this.state.chosenCardPlayer1 === (null || "None") || this.state.chosenCardPlayer2 === (null || "None"))) {
            return ("godCard" + n.toString());
        } else if ((this.state.chosenCardPlayer1 === card) || (this.state.chosenCardPlayer2 === card)) {
            return "godCard" + n.toString();
        }
        else if (this.return_active_card(this.state.chosenCardPlayer1)=== card || this.return_active_card(this.state.chosenCardPlayer2)=== card){
            return "godCard" + n.toString();
        }else {
            return "godCard" + n.toString() + "-dark";
    }
    }


    render() {
        return (
            <div>
                <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
                </link>
                <h1 className="chooseGodCard-h1">{this.state.alertText}</h1>
                <div className="first-row">
                    <div class={this.darkenGodCard(1, "Apollo")} id={this.getBorderSelected("Apollo")}
                         onClick={() => {
                             this.choose_card(this.state.card1, this.state.card1Inactive)
                         }}></div>
                    <div class={this.darkenGodCard(2, this.state.card2Inactive)}
                         id={this.getBorderSelected(this.state.card2Inactive)} onClick={() => {
                        this.choose_card(this.state.card2, this.state.card2Inactive)
                    }}></div>
                    <div class={this.darkenGodCard(3, "Athena")}
                         id={this.getBorderSelected("Athena")} onClick={() => {
                        this.choose_card(this.state.card3, this.state.card3Inactive)
                    }}></div>
                    <div class={this.darkenGodCard(4, this.state.card4Inactive)}
                         id={this.getBorderSelected(this.state.card4Inactive)} onClick={() => {
                        this.choose_card(this.state.card4, this.state.card4Inactive)
                    }}></div>
                    <div class={this.darkenGodCard(5, this.state.card5Inactive)}
                         id={this.getBorderSelected(this.state.card5Inactive)} onClick={() => {
                        this.choose_card(this.state.card5, this.state.card5Inactive)
                    }}></div>
                </div>
                <div className="second-row">
                    <div class={this.darkenGodCard(6, this.state.card6Inactive)}
                         id={this.getBorderSelected(this.state.card6Inactive)} onClick={() => {
                        this.choose_card(this.state.card6, this.state.card6Inactive)
                    }}></div>
                    <div class={this.darkenGodCard(7, this.state.card7Inactive)}
                         id={this.getBorderSelected(this.state.card7Inactive)} onClick={() => {
                        this.choose_card(this.state.card7, this.state.card7Inactive)
                    }}></div>
                    <div class={this.darkenGodCard(8, this.state.card8)}
                         id={this.getBorderSelected(this.state.card8)} onClick={() => {
                        this.choose_card(this.state.card8, this.state.card8Inactive)
                    }}></div>
                    <div class={this.darkenGodCard(9, this.state.card9)}
                         id={this.getBorderSelected(this.state.card9)} onClick={() => {
                        this.choose_card(this.state.card9, this.state.card9Inactive)
                    }}></div>
                    <div class={this.darkenGodCard(10, this.state.card10Inactive)}
                         id={this.getBorderSelected(this.state.card10Inactive)} onClick={() => {
                        this.choose_card(this.state.card10, this.state.card10Inactive)
                    }}
                    ></div>
                </div>
                <div className="centerTheButton">
                    <ButtonContainer/>
                    <Button_1 className="rock_godCard-button"
                              disabled={this.state.gameStatus === "Start" || this.state.gameStatus === null}
                              width="30%"
                              onClick={() => {
                                  this.setSessionStorageCard(this.state.player1.worker1.godCard, this.state.player1.id);
                                  this.setSessionStorageCard(this.state.player2.worker1.godCard, this.state.player2.id);
                                  this.props.history.push(`/game/${sessionStorage.getItem("gameID")}/gamePlay/GodMode`);
                              }}
                    >
                        Go to Playground
                    </Button_1>
                    <ButtonContainer/>
                </div>
            </div>
        )
    }
}

export default withRouter(ChooseGodCard);