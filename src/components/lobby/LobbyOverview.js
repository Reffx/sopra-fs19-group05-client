
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
            color: null,
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
//created for every color a function in order to set the state to the clicked color --> needs an update (not the best way to do it)
redCircleClick(){
        this.setState({color:"Red"});
        alert("color set to red")
}

blueCircleClick(){
        this.setState({color:"Blue"});
        alert("color set to blue")

}
yellowCircleClick(){
        this.setState({color: "Yellow"});
        alert("color set to yellow")
}
pinkCircleClick(){
        this.setState({color:"Pink"})
        alert("color set to pink")
}
//the render method also needs an update, disabled the circles in the right box but in the future we need to do a check with the player id not with the token (since it is saved locally)
    render() {
        return (
            <div class="Lobby">
                <div class="first-box">

                    <p>Choose Your Color:</p>
                    <button  class="circle_red" onClick={this.redCircleClick.bind(this)}></button>
                    <button  class="circle_blue" onClick={this.blueCircleClick.bind(this)}></button>
                    <button class="circle_yellow" onClick={this.yellowCircleClick.bind(this)}></button>
                    <button class="circle_pink" onClick={this.pinkCircleClick.bind(this)}></button>
                </div>
                <div class="second-box">
                    <p>Choose Your Color:</p>
                    <button disabled={!(localStorage.getItem("token")===this.state.token)} class="circle_red" onClick={this.redCircleClick.bind(this)}></button>
                    <button disabled={!(localStorage.getItem("token")===this.state.token)} class="circle_blue" onClick={this.blueCircleClick.bind(this)}></button>
                    <button disabled={!(localStorage.getItem("token")===this.state.token)} class="circle_yellow" onClick={this.yellowCircleClick.bind(this)}></button>
                    <button disabled={!(localStorage.getItem("token")===this.state.token)} class="circle_pink" onClick={this.pinkCircleClick.bind(this)}></button>
                </div>
            </div>
        );

    }
}

export default withRouter(LobbyOverview);
