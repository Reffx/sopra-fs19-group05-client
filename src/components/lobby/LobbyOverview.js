
import React from "react";
import { withRouter } from "react-router-dom";
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
`;


class LobbyOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player1_username: null,
            player1_status: null,
            player2_username: null,
            player2_status: null,
        };
    }
    leave_lobby() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameId")}/player2`, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(returnedGame => {
                if (returnedGame.status === 404 || returnedGame.status === 500) {
                    //  has to be modified for game
                    this.setState({alertText: "You could not leave the lobby"})
                }
                else{
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

    ready(){
        fetch(`${getDomain()}/games/${localStorage.getItem("gameId")}/${localStorage.getItem("userID")}/status`, {
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
        fetch(`${getDomain()}/games/${localStorage.getItem("gameId")}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async response => {
                if(response.status !== 404) {
                    const Game = new GameModel(response);
                    this.setState({
                        player1_username: Game.player1.username,
                        player1_status: Game.player1.status,
                        player2_username: Game.player2.username,
                        player2_status: Game.player2.status,
                    });
                }
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
        this.setState({color:"Pink"});
        alert("color set to pink")
}
//the render method also needs an update, disabled the circles in the right box but in the future we need to do a check with the player id not with the token (since it is saved locally)
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
                <div class ="Lobby-div">
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
                <Container>
                <ButtonContainer>
                <Button
                    width="30%"
                    onClick={() => {
                        this.ready()
                    }}
                >
                    Ready to Play
                </Button>
                </ButtonContainer>
                </Container>
            </div>
        );

    }
}

export default withRouter(LobbyOverview);
