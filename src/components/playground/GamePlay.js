import React from "react";
import "./GamePlay.css";
import "./PlayerColor.css";
import styled from "styled-components";
import Worker from "../shared/models/Worker";
import Field from "../shared/models/Field";
import {getDomain} from "../../helpers/getDomain";
import PlayField from "../shared/models/PlayField";
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

const field0 = new Field();
const field1 = new Field();
const field2 = new Field();
const field3 = new Field();
const field4 = new Field();
const field5 = new Field();
const field6 = new Field();
const field7 = new Field();
const field8 = new Field();
const field9 = new Field();
const field10 = new Field();
const field11 = new Field();
const field12 = new Field();
const field13 = new Field();
const field14 = new Field();
const field15 = new Field();
const field16 = new Field();
const field17 = new Field();
const field18 = new Field();
const field19 = new Field();
const field20 = new Field();
const field21 = new Field();
const field22 = new Field();
const field23 = new Field();
const field24 = new Field();

field0.gameId = localStorage.getItem("gameId");
field1.gameId = localStorage.getItem("gameId");
field2.gameId = localStorage.getItem("gameId");
field3.gameId = localStorage.getItem("gameId");
field4.gameId = localStorage.getItem("gameId");
field5.gameId = localStorage.getItem("gameId");
field6.gameId = localStorage.getItem("gameId");
field7.gameId = localStorage.getItem("gameId");
field8.gameId = localStorage.getItem("gameId");
field9.gameId = localStorage.getItem("gameId");
field10.gameId = localStorage.getItem("gameId");
field11.gameId = localStorage.getItem("gameId");
field12.gameId = localStorage.getItem("gameId");
field13.gameId = localStorage.getItem("gameId");
field14.gameId = localStorage.getItem("gameId");
field15.gameId = localStorage.getItem("gameId");
field16.gameId = localStorage.getItem("gameId");
field17.gameId = localStorage.getItem("gameId");
field18.gameId = localStorage.getItem("gameId");
field19.gameId = localStorage.getItem("gameId");
field20.gameId = localStorage.getItem("gameId");
field21.gameId = localStorage.getItem("gameId");
field22.gameId = localStorage.getItem("gameId");
field23.gameId = localStorage.getItem("gameId");
field24.gameId = localStorage.getItem("gameId");


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
            myPlayField: PlayField,
            player1: Player,
            player2: Player,
            alertText: "This is a message.",
            beginnerId: null,
            selected_worker: null,
            box0: Field,
            box1: Field,
            box2: Field,
            box3: Field,
            box4: Field,
            box5: Field,
            box6: Field,
            box7: Field,
            box8: Field,
            box9: Field,
            box10: Field,
            box11: Field,
            box12: Field,
            box13: Field,
            box14: Field,
            box15: Field,
            box16: Field,
            box17: Field,
            box18: Field,
            box19: Field,
            box20: Field,
            box21: Field,
            box22: Field,
            box23: Field,
            box24: Field,

        };
    }


    componentDidMount() {
        this.get_game();
        this.create_field();
    }

    alertMessage() {
        return this.state.alertText
    }


    get_game() {
        // this.setBeginner();
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
                    Player1.username = response.player1.username;
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
                    // console.log("Player1 of GET games/{gameID}", Player1);
                    const Player2 = new Player();
                    Player2.id = response.player2.id;
                    Player2.gameId = response.player2.id;
                    Player2.username = response.player2.username;
                    Player2.color = response.player2.color;
                    Player2.status = response.player2.status;
                    Player2.worker1.workerId = response.player2.worker1.workerId;
                    //console.log(Player2.worker1.workerId);
                    //console.log(response.player2.worker1.workerId);
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
                    // console.log(field1);
                    //console.log(this.state.player1.worker1.color);
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            })
    }

 /*   setBeginner() {
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
                if (this.state.beginnerId === this.state.player1.id) {
                    this.state.player_is_playing = this.state.player1;
                    alert(this.state.player_is_playing.id)//just for testing
                } else {
                    this.state.player_is_playing = this.state.player2;
                    alert(this.state.player_is_playing.id)//just for testing
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
    } */

  /*  change_player_is_playing() {
        if (this.state.player_is_playing.id === this.state.player1.id) {
            this.state.player_is_playing = this.state.player2
        } else {
            this.state.player_is_playing = this.state.player1
        }
    } */

    get_action(box) {
        this.create_field();
        this.set_worker(box);
        
        console.log(this.state.player1.worker1.workerId);


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
        this.setState(box);
        /*
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
        }*/

    }

    set_worker(box) {
       /* if (this.state.player_is_playing.worker1.position === 0) {
            this.state.selected_worker = this.state.player_is_playing.worker1.id
        } else {
            this.state.selected_worker = this.state.player_is_playing.worker2.id
        }*/
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${box.fieldNum}/${this.state.player2.worker1.workerId}/place`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the creation: ${err.message}`);
                }
            });
       // this.get_game()
    }


    create_field() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/board/create`, {
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
                        const playfield = new PlayField(returnedPlayfield);
                        var tempField = playfield.allFields;
                        this.saveField(field0, tempField, 0);
                        this.saveField(field1, tempField, 1);
                        this.saveField(field2, tempField, 2);
                        this.saveField(field3, tempField, 3);
                        this.saveField(field4, tempField, 4);
                        this.saveField(field5, tempField, 5);
                        this.saveField(field6, tempField, 6);
                        this.saveField(field7, tempField, 7);
                        this.saveField(field8, tempField, 8);
                        this.saveField(field9, tempField, 9);
                        this.saveField(field10, tempField, 10);
                        this.saveField(field11, tempField, 11);
                        this.saveField(field12, tempField, 12);
                        this.saveField(field13, tempField, 13);
                        this.saveField(field14, tempField, 14);
                        this.saveField(field15, tempField, 15);
                        this.saveField(field16, tempField, 16);
                        this.saveField(field17, tempField, 17);
                        this.saveField(field18, tempField, 18);
                        this.saveField(field19, tempField, 19);
                        this.saveField(field20, tempField, 20);
                        this.saveField(field21, tempField, 21);
                        this.saveField(field22, tempField, 22);
                        this.saveField(field23, tempField, 23);
                        this.saveField(field24, tempField, 24);

                        this.setState({
                            box0: field0,
                            box1: field1,
                            box2: field2,
                            box3: field3,
                            box4: field4,
                            box5: field5,
                            box6: field6,
                            box7: field7,
                            box8: field8,
                            box9: field9,
                            box10: field10,
                            box11: field11,
                            box12: field12,
                            box13: field13,
                            box14: field14,
                            box15: field15,
                            box16: field16,
                            box17: field17,
                            box18: field18,
                            box19: field19,
                            box20: field20,
                            box21: field21,
                            box22: field22,
                            box23: field23,
                            box24: field24,
                            myPlayField: tempField,
                        });
                        console.log(this.state.box13);
                        //console.log(box13.fieldNum);
                        //console.log(box13.occupation);
                        //console.log(this.state.box1);
                    }
                }
            )
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the creation: ${err.message}`);
                }
            });
        //console.log(this.state.myPlayField[13 -1 ]);
        // this.updateFields(this.state.myPlayField);
        //console.log(this.state.box1);
    }

    saveField(singleField, tempField, i) {
        singleField.id = tempField[i].id;
        singleField.fieldNum = tempField[i].fieldNum;
        singleField.occupier = tempField[i].occupier;
        singleField.x_coordinate = tempField[i].x_coordinate;
        singleField.y_coordinate = tempField[i].y_coordinate;
    }



    getBorder(box) {
        //console.log(box.id);
        //    box.id = 1;
        //  if (box.id === 1)
        //          return "border";
//
    }

    getPlayerColor(box) {
      //  console.log(this.state.player1.id);
        // return this.state.player1.color;
       // console.log(this.state.player1.color);
      //  console.log(box);
         //   console.log(box.occupier.playerId);
            if (box.occupier.playerId === this.state.player1.id) {
                return this.state.player1.color;
            } else if
            (box.occupier.playerId === this.state.player2.id) {
                return this.state.player2.color;
            }
    }


    innerBoxLayout(box) {
        //console.log(box);
        //console.log(box.fieldNum);
       // console.log(box.occupier);

        if (box.occupier != null) {
            return ("player-div-lvl-0-" + this.getPlayerColor(box));
        }
        //console.log(box.id);
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
                            <div className="box0 black box" onClick={() => {
                                this.get_action(this.state.box0)
                            }}>
                                <div id={this.state.box0.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box0)}>{this.state.box0.height}</div>
                                </div>
                            </div>
                            <div className="box1 white box" id={this.getBorder(this.state.box1)}
                                 onClick={() => {
                                     this.get_action(this.state.box1)
                                 }}>
                                <div id={this.state.box1.layout}>
                                    <div className={this.innerBoxLayout(this.state.box1)}>{null}</div>
                                </div>
                            </div>
                            <div className="box2 black box" id={this.getBorder(this.state.box2)} onClick={() => {
                                this.get_action(this.state.box2)
                            }}>
                                <div id={this.state.box2.layout}>
                                    <div className={this.innerBoxLayout(this.state.box2)}>{this.state.box2.height}</div>
                                </div>
                            </div>
                            <div className="box3 white box" onClick={() => {
                                this.get_action(this.state.box3)
                            }}>
                                <div id={this.state.box3.layout}>
                                    <div className={this.innerBoxLayout(this.state.box3)}>{this.state.box3.height}</div>
                                </div>
                            </div>
                            <div className="box4 black box" onClick={() => {
                                this.get_action(this.state.box4)
                            }}>
                                <div id={this.state.box4.layout}>
                                    <div className={this.innerBoxLayout(this.state.box4)}>{this.state.box4.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box5 white box" onClick={() => {
                                this.get_action(this.state.box5)
                            }}>
                                <div id={this.state.box5.layout}>
                                    <div className={this.innerBoxLayout(this.state.box5)}>{this.state.box5.height}</div>
                                </div>
                            </div>
                            <div className="box6 black box" onClick={() => {
                                this.get_action(this.state.box6)
                            }}>
                                <div id={this.state.box6.layout}>
                                    <div className={this.innerBoxLayout(this.state.box6)}>{null}</div>
                                </div>
                            </div>
                            <div className="box7 white box" onClick={() => {
                                this.get_action(this.state.box7)
                            }}>
                                <div id={this.state.box7.layout}>
                                    <div className={this.innerBoxLayout(this.state.box7)}>{this.state.box7.height}</div>
                                </div>
                            </div>
                            <div className="box8 black box" onClick={() => {
                                this.get_action(this.state.box8)
                            }}>
                                <div id={this.state.box8.layout}>
                                    <div className={this.innerBoxLayout(this.state.box8)}>{this.state.box8.height}</div>
                                </div>
                            </div>
                            <div className="box9 white box" onClick={() => {
                                this.get_action(this.state.box9)
                            }}>
                                <div id={this.state.box9.layout}>
                                    <div className={this.innerBoxLayout(this.state.box9)}>{this.state.box9.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box10 black box" onClick={() => {
                                this.get_action(this.state.box10)
                            }}>
                                <div id={this.state.box10.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box10)}>{this.state.box10.height}</div>
                                </div>
                            </div>
                            <div className="box11 white box" onClick={() => {
                                this.get_action(this.state.box11)
                            }}>
                                <div id={this.state.box11.layout}>
                                    <div className={this.innerBoxLayout(this.state.box11)}>{null}</div>
                                </div>
                            </div>
                            <div className="box12 black box" onClick={() => {
                                this.get_action(this.state.box12)
                            }}>
                                <div id={this.state.box12.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box12)}>{this.state.box12.height}</div>
                                </div>
                            </div>
                            <div className="box13 white box" onClick={() => {
                                this.get_action(this.state.box13)
                            }}>
                                <div id={this.state.box13.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box13)}>{this.state.box13.height}</div>
                                </div>
                            </div>
                            <div className="box14 black box" onClick={() => {
                                this.get_action(this.state.box14)
                            }}>
                                <div id={this.state.box14.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box14)}>{this.state.box14.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box15 white box" onClick={() => {
                                this.get_action(this.state.box15)
                            }}>
                                <div id={this.state.box15.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box15)}>{this.state.box15.height}</div>
                                </div>
                            </div>
                            <div className="box16 black box" onClick={() => {
                                this.get_action(this.state.box16)
                            }}>
                                <div id={this.state.box16.layout}>
                                    <div className={this.innerBoxLayout(this.state.box16)}>{null}</div>
                                </div>
                            </div>
                            <div className="box17 white box" onClick={() => {
                                this.get_action(this.state.box17)
                            }}>
                                <div id={this.state.box17.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box17)}>{this.state.box17.height}</div>
                                </div>
                            </div>
                            <div className="box18 black box" onClick={() => {
                                this.get_action(this.state.box18)
                            }}>
                                <div id={this.state.box18.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box18)}>{this.state.box18.height}</div>
                                </div>
                            </div>
                            <div className="box19 white box" onClick={() => {
                                this.get_action(this.state.box19)
                            }}>
                                <div id={this.state.box19.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box19)}>{this.state.box19.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box20 black box" onClick={() => {
                                this.get_action(this.state.box20)
                            }}>
                                <div id={this.state.box20.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box20)}>{this.state.box20.height}</div>
                                </div>
                            </div>
                            <div className="box21 white box" onClick={() => {
                                this.get_action(this.state.box21)
                            }}>
                                <div id={this.state.box21.layout}>
                                    <div className={this.innerBoxLayout(this.state.box21)}>{null}</div>
                                </div>
                            </div>
                            <div className="box22 black box" onClick={() => {
                                this.get_action(this.state.box22)
                            }}>
                                <div id={this.state.box22.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box22)}>{this.state.box22.height}</div>
                                </div>
                            </div>
                            <div className="box23 white box" onClick={() => {
                                this.get_action(this.state.box23)
                            }}>
                                <div id={this.state.box23.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box23)}>{this.state.box23.height}</div>
                                </div>
                            </div>
                            <div className="box24 black box" onClick={() => {
                                this.get_action(this.state.box24)
                            }}>
                                <div id={this.state.box24.layout}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box24)}>{this.state.box24.height}</div>
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
