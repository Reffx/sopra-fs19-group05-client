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
            card2Inactive: "NONE",
            card3: "Athena",
            card3Inactive: "NONE",
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
        }, 2000)
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
                        this.setState({alertText: this.state.player1.username + " has " + this.state.player1.worker1.godCard + ", " + this.state.player2.username + " has " + this.state.player2.worker1.godCard})
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


    choose_card(card) {
        if (String(this.state.player_is_playing.id) === sessionStorage.getItem("userID")) {
            if (this.state.player_is_playing === this.state.player1) {
                if (this.state.player1.worker1.godCard === "None") {
                    this.setGodCard(card, this.state.player1.id)
                } else {
                    this.setGodCard(card, this.state.player2.id)
                }
            }
            if (this.state.player_is_playing === this.state.player2) {
                if (this.state.player1.worker1.godCard === card) {
                    this.setGodCard(this.state.player2.worker1.godCard, this.state.player1.id);
                    this.setGodCard(card, this.state.player2.id);
                    this.set_beginner()
                } else {
                    this.set_beginner()
                }
            }
        }
    }

    setGodCard(godCard, id) {
        console.log(sessionStorage.getItem("userID"));
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${id}/GodCard`, {
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
        if (this.state.chosenCardPlayer1 === card || this.state.chosenCardPlayer2 === card) {
            return "godCard-border"
        }
    }

    setSessionStorageInactiveCard(godCard, id){
        if (godCard === this.state.card1 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card1Inactive);
        }
        if (godCard === this.state.card2 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card2Inactive);
        }
        if (((godCard === this.state.card3) || (godCard === "InactiveAthena")) && (id === this.state.player1.id)){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card3Inactive);
        }
        if (godCard === this.state.card4 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card4Inactive);
        }
        if (godCard === this.state.card5 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card5Inactive);
        }
        if (godCard === this.state.card6 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card6Inactive);
        }
        if (godCard === this.state.card7 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card7Inactive);
        }
        if (godCard === this.state.card8 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card8Inactive);
        }
        if (godCard === this.state.card9 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card9Inactive);
        }
        if (godCard === this.state.card10 && id === this.state.player1.id){
            sessionStorage.setItem("GodCardPlayer1Inactive", this.state.card10Inactive);
        }
        if (godCard === this.state.card1 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card1Inactive);
        }
        if (godCard === this.state.card2 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card2Inactive);
        }
        if ((godCard === this.state.card3 || (godCard === "InactiveAthena")) && (id === this.state.player2.id)){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card3Inactive);
        }
        if (godCard === this.state.card4 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card4Inactive);
        }
        if (godCard === this.state.card5 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card5Inactive);
        }
        if (godCard === this.state.card6 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card6Inactive);
        }
        if (godCard === this.state.card7 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card7Inactive);
        }
        if (godCard === this.state.card8 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card8Inactive);
        }
        if (godCard === this.state.card9 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card9Inactive);
        }
        if (godCard === this.state.card10 && id === this.state.player2.id){
            sessionStorage.setItem("GodCardPlayer2Inactive", this.state.card10Inactive);
        }

    }


    render() {
        return (
            <div>
                <h1 className="chooseGodCard-h1">{this.state.alertText}</h1>
                <div className="first-row">
                    <div class="godCard1" id={this.getBorderSelected(this.state.card1)} onClick={() => {
                        this.choose_card(this.state.card1)
                    }}></div>
                    <div class="godCard2" id={this.getBorderSelected(this.state.card2)} onClick={() => {
                        this.choose_card(this.state.card2)
                    }}></div>
                    <div class="godCard3" id={this.getBorderSelected("InactiveAthena")} onClick={() => {
                        this.choose_card(this.state.card3)
                    }}></div>
                    <div class="godCard4" id={this.getBorderSelected(this.state.card4)} onClick={() => {
                        this.choose_card(this.state.card4)
                    }}></div>
                    <div class="godCard5" id={this.getBorderSelected(this.state.card5)} onClick={() => {
                        this.choose_card(this.state.card5)
                    }}></div>
                </div>
                <div className="second-row">
                    <div class="godCard6" id={this.getBorderSelected(this.state.card6)} onClick={() => {
                        this.choose_card(this.state.card6)
                    }}></div>
                    <div class="godCard7" id={this.getBorderSelected(this.state.card7)} onClick={() => {
                        this.choose_card(this.state.card7)
                    }}></div>
                    <div class="godCard8" id={this.getBorderSelected(this.state.card8)} onClick={() => {
                        this.choose_card(this.state.card8)
                    }}></div>
                    <div class="godCard9" id={this.getBorderSelected(this.state.card9)} onClick={() => {
                        this.choose_card(this.state.card9)
                    }}></div>
                    <div class="godCard10" id={this.getBorderSelected(this.state.card10)} onClick={() => {
                        this.choose_card(this.state.card10)
                    }}
                    ></div>
                </div>
                <div className="centerTheButton">
                    <ButtonContainer/>
                    <Button
                        disabled={this.state.gameStatus === "Start" || this.state.gameStatus === null}
                        width="30%"
                        onClick={() => {
                            sessionStorage.setItem("GodCardPlayer1", this.state.player1.worker1.godCard);
                            sessionStorage.setItem("GodCardPlayer2", this.state.player2.worker1.godCard);
                            this.setSessionStorageInactiveCard(sessionStorage.getItem("GodCardPlayer1"), this.state.player1.id);
                            this.setSessionStorageInactiveCard(sessionStorage.getItem("GodCardPlayer2"), this.state.player2.id);
                            this.props.history.push(`/game/${sessionStorage.getItem("gameID")}/gamePlay/GodMode`);
                        }}
                    >
                        Go to Playground
                    </Button>
                    <ButtonContainer/>
                </div>
            </div>
        )
    }
}

export default withRouter(ChooseGodCard);