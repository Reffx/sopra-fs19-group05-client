
import React from "react";
import { withRouter } from "react-router-dom";
import "./player_colors.css"
import "./lobby_rectangles.css"
import {getDomain} from "../../helpers/getDomain";
import GameModel from "../shared/models/GameModel";





class LobbyOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myGame: null,
            usernamePlayer1:  localStorage.getItem("usernamePlayer1"),
        };
    }

    componentDidMount() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameId")}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async games => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 800));
                const game = new GameModel(games);
                alert(localStorage.getItem("gameId"));

                localStorage.setItem("usernamePlayer1", game.player1.username);
                this.setState({usernamePlayer1: game.player1.username});
                alert(this.usernamePlayer1);
                this.setState({myGame: game});
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
    }



    render() {
        return (
            <div class="Lobby">
                <div class="first-box">
                    <div>Playername: {localStorage.getItem("usernamePlayer1")} </div>
                    <p>Choose your color:</p>
                    <div class="circle_red"></div>
                    <div class="circle_blue"></div>
                    <div class="circle_yellow"></div>
                    <div class="circle_pink"></div>
                </div>
                <div class="second-box">
                    <p>Choose your color:</p>
                    <div class="circle_red"></div>
                    <div class="circle_blue"></div>
                    <div class="circle_yellow"></div>
                    <div class="circle_pink"></div>
                </div>
            </div>
        );

    }
}

export default withRouter(LobbyOverview);
