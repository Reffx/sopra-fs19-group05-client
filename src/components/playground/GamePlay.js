import React from "react";
import "./GamePlay.css";
import "./PlayerColor.css";
import styled from "styled-components";
import Worker from "../shared/models/Worker";
import Field from "../shared/models/Field";
import {getDomain} from "../../helpers/getDomain";
import Playfield from "../shared/models/Playfield";
import {BaseContainer} from "../../helpers/layout";
import {Button} from "../../views/design/Button";
import Player from "../shared/models/Player";


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


const box1 = new Field();
box1.gameId = localStorage.getItem("gameId");
const box2 = new Field();
box2.gameId = localStorage.getItem("gameId");
const box3 = new Field();
box3.gameId = localStorage.getItem("gameId");
const box4 = new Field();
box4.gameId = localStorage.getItem("gameId");
const box5 = new Field();
box5.gameId = localStorage.getItem("gameId");
const box6 = new Field();
box6.gameId = localStorage.getItem("gameId");
const box7 = new Field();
box7.gameId = localStorage.getItem("gameId");
const box8 = new Field();
box8.gameId = localStorage.getItem("gameId");
const box9 = new Field();
box9.gameId = localStorage.getItem("gameId");
const box10 = new Field();
box10.gameId = localStorage.getItem("gameId");
const box11 = new Field();
box11.gameId = localStorage.getItem("gameId");
const box12 = new Field();
box12.gameId = localStorage.getItem("gameId");
const box13 = new Field();
box13.gameId = localStorage.getItem("gameId");
const box14 = new Field();
box14.gameId = localStorage.getItem("gameId");
const box15 = new Field();
box15.gameId = localStorage.getItem("gameId");
const box16 = new Field();
box16.gameId = localStorage.getItem("gameId");
const box17 = new Field();
box17.gameId = localStorage.getItem("gameId");
const box18 = new Field();
box18.gameId = localStorage.getItem("gameId");
const box19 = new Field();
box19.gameId = localStorage.getItem("gameId");
const box20 = new Field();
box20.gameId = localStorage.getItem("gameId");
const box21 = new Field();
box21.gameId = localStorage.getItem("gameId");
const box22 = new Field();
box22.gameId = localStorage.getItem("gameId");
const box23 = new Field();
box23.gameId = localStorage.getItem("gameId");
const box24 = new Field();
box24.gameId = localStorage.getItem("gameId");
const box25 = new Field();
box25.gameId = localStorage.getItem("gameId");

const worker1p1 = new Worker();
worker1p1.gameId = localStorage.getItem("gameId");
worker1p1.workerId = 1;
const worker2p1 = new Worker();
worker2p1.gameId = localStorage.getItem("gameId");
worker2p1.workerId = 2;


class GamePlay extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            player_is_playing: new Player(),
            playing_step: null,
            player1 : Player,
            player2 : Player,
            alertText: "This is a message.",
            beginnerId: null,
            selected_worker: null,
        };
    }


    componentDidMount() {
        this.get_game();
    }

    alertMessage() {
        return this.state.alertText
    }

    saveField(singleField, tempField, i) {
        singleField.id = tempField[i].id;
        singleField.fieldNum = tempField[i].fieldNum;
        singleField.occupation = tempField[i].occupation;
        singleField.reachedMaxHeight = tempField[i].reachedMaxHeight;
        singleField.x_coordinate = tempField[i].x_coordinate;
        singleField.y_coordinate = tempField[i].y_coordinate;
    }

    get_game() {
        this.setBeginner()
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async response => {
                if (response.status !== 404 || response.player1 !== null) {
                    // console.log(localStorage.getItem("userID"));
                    const Player1 = new Player();
                    Player1.id = response.player1.id;
                    Player1.gameId = response.player1.id;
                    Player1.username  = response.player1.username;
                    Player1.color = response.player1.color;
                    Player1.status = response.player1.status;
                    Player1.worker1.workerId = response.player1.worker1.workerId;
                    Player1.worker1.playerId = response.player1.worker1.playerId;
                    Player1.worker1.position = response.player1.worker1.position;
                    Player1.worker1.next = response.player1.worker1.next;
                    Player1.worker1.winner = response.player1.worker1.winner;
                    Player1.worker2.workerId = response.player1.worker2.workerId;
                    Player1.worker2.playerId = response.player1.worker2.playerId;
                    Player1.worker2.position = response.player1.worker2.position;
                    Player1.worker2.next = response.player1.worker2.next;
                    Player1.worker2.winner = response.player1.worker2.winner;
                    console.log("Player1 of GET games/{gameID}", Player1);
                    const Player2 = new Player();
                    Player2.id = response.player2.id;
                    Player2.gameId = response.player2.id;
                    Player2.username  = response.player2.username;
                    Player2.color = response.player2.color;
                    Player2.status = response.player2.status;
                    Player2.worker1.workerId = response.player2.worker1.workerId;
                    Player2.worker1.playerId = response.player2.worker1.playerId;
                    Player2.worker1.position = response.player2.worker1.position;
                    Player2.worker1.next = response.player2.worker1.next;
                    Player2.worker1.winner = response.player2.worker1.winner;
                    Player2.worker2.workerId = response.player2.worker2.workerId;
                    Player2.worker2.playerId = response.player2.worker2.playerId;
                    Player2.worker2.position = response.player2.worker2.position;
                    Player2.worker2.next = response.player2.worker2.next;
                    Player2.worker2.winner = response.player2.worker2.winner;
                    this.setState({
                        player1: Player1,
                        player2: Player2,
                    });

                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            })
    }
    setBeginner() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/beginner`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async beginnerId => {
                this.setState({beginnerId: beginnerId});
                // console.log(this.state.beginnerId);
                this.state.alertText = "Player with UserID " + JSON.stringify(this.state.beginnerId) + " can begin";
                this.state.playing_step = "set_worker";
                if(this.state.beginnerId === this.state.player1.id){
                    this.state.player_is_playing = this.state.player1;
                    alert(this.state.player_is_playing.id)//just for testing
                }
                else{
                    this.state.player_is_playing = this.state.player2;
                    alert(this.state.player_is_playing.id)//just for testing
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
    }
    change_player_is_playing(){
        if(this.state.player_is_playing.id === this.state.player1.id){
            this.state.player_is_playing= this.state.player2
        }
        else{
            this.state.player_is_playing= this.state.player1
        }
    }
    get_action(fieldNumber){
        if(localStorage.getItem("userID") === this.state.player_is_playing.id) {
            alert("hi");
            if (this.state.playing_step === "place_worker") {
                this.set_worker(fieldNumber)
            }
            if (this.state.playing_step === "select_worker_for_moving"){
            }
            if (this.state.playing_step === "select_field_to_move"){
            }
            if (this.state.playing_step === "select_worker_for_building"){
            }
            if (this.state.playing_step === "select_field_to_build"){
            }
        }
    }
    set_worker(fieldNumber) {
        if (this.state.player_is_playing.worker1.position === 0) {
            this.state.selected_worker = this.state.player_is_playing.worker1.id
        }
        else{
            this.state.selected_worker = this.state.player_is_playing.worker2.id
        }
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${fieldNumber}/${this.state.selected_worker}/place`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {

            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the creation: ${err.message}`);
                }
            });
        this.change_player_is_playing();
        this.get_game()
        if(this.state.player1.worker1.position !== 0 && this.state.player1.worker2.position !== 0 && this.state.player2.worker1.position !== 0 && this.state.player2.worker2.position !== 0 ){
            this.state.playing_step= "select_worker_for_moving"
        }
    }

    create_field() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameId")}/board/create`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(returnedPlayfield => {
                if (returnedPlayfield.status === 404 || returnedPlayfield.status === 500) {
                    //  has to be modified for game
                    this.setState({alertText: "Playfield coudn't be created!"})
                } else {
                    const playfield = new Playfield(returnedPlayfield);
                    var tempField = playfield.allFields;
                    this.saveField(box1, tempField, 0);
                    this.saveField(box2, tempField, 1);
                    this.saveField(box3, tempField, 2);
                    this.saveField(box4, tempField, 3);
                    this.saveField(box5, tempField, 4);
                    this.saveField(box6, tempField, 5);
                    this.saveField(box7, tempField, 6);
                    this.saveField(box8, tempField, 7);
                    this.saveField(box9, tempField, 8);
                    this.saveField(box10, tempField, 9);
                    this.saveField(box11, tempField, 10);
                    this.saveField(box12, tempField, 11);
                    this.saveField(box13, tempField, 12);
                    this.saveField(box14, tempField, 13);
                    this.saveField(box15, tempField, 14);
                    this.saveField(box16, tempField, 15);
                    this.saveField(box17, tempField, 16);
                    this.saveField(box18, tempField, 17);
                    this.saveField(box19, tempField, 18);
                    this.saveField(box20, tempField, 19);
                    this.saveField(box21, tempField, 20);
                    this.saveField(box22, tempField, 21);
                    this.saveField(box23, tempField, 22);
                    this.saveField(box24, tempField, 23);
                    this.saveField(box25, tempField, 24);
                    //console.log(box13);
                    //console.log(box13.fieldNum);
                    //console.log(box13.occupation);
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


    changeLvl(box) {

        //   this.create_field();
        if (box.layout === "level2") {
            box.layout = "level3"
        }
        ;
        if (box.layout === "level1") {
            box.layout = "level2"
        }
        ;
        if (box.layout == null) {
            box.layout = "level1"
        }
        ;
        if (box.height === "2") {
            box.height = "3"
        }
        ;
        if (box.height === "1") {
            box.height = "2"
        }
        ;
        if (box.height == null) {
            box.height = "1"
        }
        ;
        box2.workerId = "player1-div";
        this.setState(box);
    }

    getBorder(box) {
        //console.log(box.id);
        box.id = 1;
        if (box.id === 1)
            return "border";
    }

    getPlayerColor() {
        if (localStorage.getItem("userID") === this.state.player1.id.toString()) {
            return this.state.player1.color;
        } else if
        (localStorage.getItem("userID") === this.state.player2.id.toString()) {
            return this.state.player2.color;
        }
    }


    innerBoxLayout(box) {
        box.occupier = true;
        //   console.log(box.occupation);
        if (box.occupier === null && box.height === "1") {
            return "text1";
        } else if (box.occupier === null && box.height === "2") {
            return "text2";
        } else if (box.occupier === null && box.height === "3") {
            return "text3";
        } else if (box.height === "1" && box.occupier === true) {
            return ("player-div-lvl-1-" + this.getPlayerColor());
        } else if (box.height === "2" && box.occupier === true) {
            return ("player-div-lvl-2-" + this.getPlayerColor());
        } else if (box.height === "3" && box.occupier === true) {
            return ("player-div-lvl-3-" + this.getPlayerColor());
        }
    }


    render() {
        return (
            <div className="fixedPixels-div">
                <div className="message-div">{this.alertMessage()}</div>
                <div className="mainHorizontally">
                    <div className="left">
                        <h2>Player 1</h2>
                        <p>UserId: {this.state.player1.id} </p>
                        <p>Username: {this.state.player1.username} </p>
                        <p>Color: {this.state.player1.color}</p>
                        <ButtonContainer/>
                        <Button
                            disabled={(this.state.player_is_playing !== this.state.player1.id)}
                            width="50%"
                            onClick={() => {
                            }}
                        >
                            Finish Action
                        </Button>
                        <ButtonContainer/>
                    </div>
                    <div className="playField">
                        <div>
                            <div className="box1 white box" id={this.getBorder(box1)} onClick={() => {
                                this.get_action(box1)
                            }}>
                                <div id={box1.layout}>
                                    <div className={this.innerBoxLayout(box1)}>{null}</div>
                                </div>
                            </div>
                            <div className="box2 black box" id={this.getBorder(box2)} onClick={() => {
                                this.get_action(box2)
                            }}>
                                <div id={box2.layout}>
                                    <div className={this.innerBoxLayout(box2)}>{box2.height}</div>
                                </div>
                            </div>
                            <div className="box3 white box" onClick={() => {
                                this.get_action(box3)
                            }}>
                                <div id={box3.layout}>
                                    <div className={this.innerBoxLayout(box3)}>{box3.height}</div>
                                </div>
                            </div>
                            <div className="box4 black box" onClick={() => {
                                this.get_action(box4)
                            }}>
                                <div id={box4.layout}>
                                    <div className={this.innerBoxLayout(box4)}>{box4.height}</div>
                                </div>
                            </div>
                            <div className="box5 white box" onClick={() => {
                                this.get_action(box5)
                            }}>
                                <div id={box5.layout}>
                                    <div className={this.innerBoxLayout(box5)}>{box5.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box6 black box" onClick={() => {
                                this.get_action(box6)
                            }}>
                                <div id={box6.layout}>
                                    <div className={this.innerBoxLayout(box6)}>{null}</div>
                                </div>
                            </div>
                            <div className="box7 white box" onClick={() => {
                                this.get_action(box7)
                            }}>
                                <div id={box7.layout}>
                                    <div className={this.innerBoxLayout(box7)}>{box7.height}</div>
                                </div>
                            </div>
                            <div className="box8 black box" onClick={() => {
                                this.get_action(box8)
                            }}>
                                <div id={box8.layout}>
                                    <div className={this.innerBoxLayout(box8)}>{box8.height}</div>
                                </div>
                            </div>
                            <div className="box9 white box" onClick={() => {
                                this.get_action(box9)
                            }}>
                                <div id={box9.layout}>
                                    <div className={this.innerBoxLayout(box9)}>{box9.height}</div>
                                </div>
                            </div>
                            <div className="box10 black box" onClick={() => {
                                this.get_action(box10)
                            }}>
                                <div id={box10.layout}>
                                    <div className={this.innerBoxLayout(box10)}>{box10.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box11 white box" onClick={() => {
                                this.get_action(box11)
                            }}>
                                <div id={box11.layout}>
                                    <div className={this.innerBoxLayout(box11)}>{null}</div>
                                </div>
                            </div>
                            <div className="box12 black box" onClick={() => {
                                this.get_action(box12)
                            }}>
                                <div id={box12.layout}>
                                    <div className={this.innerBoxLayout(box12)}>{box12.height}</div>
                                </div>
                            </div>
                            <div className="box13 white box" onClick={() => {
                                this.get_action(box13)
                            }}>
                                <div id={box13.layout}>
                                    <div className={this.innerBoxLayout(box13)}>{box13.height}</div>
                                </div>
                            </div>
                            <div className="box14 black box" onClick={() => {
                                this.get_action(box14)
                            }}>
                                <div id={box14.layout}>
                                    <div className={this.innerBoxLayout(box14)}>{box14.height}</div>
                                </div>
                            </div>
                            <div className="box15 white box" onClick={() => {
                                this.get_action(box15)
                            }}>
                                <div id={box15.layout}>
                                    <div className={this.innerBoxLayout(box15)}>{box15.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box16 black box" onClick={() => {
                                this.get_action(box16)
                            }}>
                                <div id={box16.layout}>
                                    <div className={this.innerBoxLayout(box16)}>{null}</div>
                                </div>
                            </div>
                            <div className="box17 white box" onClick={() => {
                                this.get_action(box17)
                            }}>
                                <div id={box17.layout}>
                                    <div className={this.innerBoxLayout(box17)}>{box17.height}</div>
                                </div>
                            </div>
                            <div className="box18 black box" onClick={() => {
                                this.get_action(box18)
                            }}>
                                <div id={box18.layout}>
                                    <div className={this.innerBoxLayout(box18)}>{box18.height}</div>
                                </div>
                            </div>
                            <div className="box19 white box" onClick={() => {
                                this.get_action(box19)
                            }}>
                                <div id={box19.layout}>
                                    <div className={this.innerBoxLayout(box19)}>{box19.height}</div>
                                </div>
                            </div>
                            <div className="box20 black box" onClick={() => {
                                this.get_action(box20)
                            }}>
                                <div id={box20.layout}>
                                    <div className={this.innerBoxLayout(box20)}>{box20.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box21 white box" onClick={() => {
                                this.get_action(box21)
                            }}>
                                <div id={box21.layout}>
                                    <div className={this.innerBoxLayout(box21)}>{null}</div>
                                </div>
                            </div>
                            <div className="box22 black box" onClick={() => {
                                this.get_action(box22)
                            }}>
                                <div id={box22.layout}>
                                    <div className={this.innerBoxLayout(box22)}>{box22.height}</div>
                                </div>
                            </div>
                            <div className="box23 white box" onClick={() => {
                                this.get_action(box23)
                            }}>
                                <div id={box23.layout}>
                                    <div className={this.innerBoxLayout(box23)}>{box23.height}</div>
                                </div>
                            </div>
                            <div className="box24 black box" onClick={() => {
                                this.get_action(box24)
                            }}>
                                <div id={box24.layout}>
                                    <div className={this.innerBoxLayout(box24)}>{box24.height}</div>
                                </div>
                            </div>
                            <div className="box25 white box" onClick={() => {
                                this.get_action(box25)
                            }}>
                                <div id={box25.layout}>
                                    <div className={this.innerBoxLayout(box25)}>{box25.height}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <h2>Player 2</h2>
                        <p>UserId: {this.state.player2.id} </p>
                        <p>Username: {this.state.player2.username} </p>
                        <p>Color: {this.state.player2.color}</p>
                        <ButtonContainer/>
                        <Button
                            disabled={(this.state.player_is_playing !== this.state.player2.id)}
                            width="50%"
                            onClick={() => {
                            }}
                        >
                            Finish Action
                        </Button>
                        <ButtonContainer/>
                    </div>
                </div>
            </div>
        )

    }
}

export default GamePlay;
