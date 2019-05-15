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
                        gameStatus: response.gameStatus
                    });
                    if(this.state.player2.worker1.godCard === null){
                        this.setState({alertText: "Player1 can choose 2 GodCards as selection!"})
                    }
                    if(this.state.player2.worker1.godCard !== null){
                        this.setState({player_is_playing: this.state.player2});
                        this.setState({alertText: "Player2 can choose one of the two GodCards!"})
                    }
                    if(this.state.gameStatus !== "Start"){
                        this.setState({alertText: "GodCards are given, may the better win!"})
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
        if( String(this.state.player_is_playing.id) === sessionStorage.getItem("userID")){
            if(this.state.player_is_playing === this.state.player1){
                if(this.state.player1.worker1.godCard === null){
                    this.setGodCard(card, this.state.player1.id)
                }
                else{
                    this.setGodCard(card, this.state.player2.id)
                }
            }
            if(this.state.player_is_playing === this.state.player2){
                if(this.state.player1.worker1.godCard === card){
                    this.setGodCard(this.state.player2.worker1.godCard, this.state.player1.id);
                    this.setGodCard(card, this.state.player2.id);
                    this.set_beginner()
                }
                else{
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


    render() {
        return (
            <div>
                <h1 className="chooseGodCard-h1">{this.state.alertText}</h1>
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