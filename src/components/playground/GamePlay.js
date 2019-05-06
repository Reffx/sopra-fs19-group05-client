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
import State from "../shared/models/State.js";
import GameModel from "../shared/models/GameModel";


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

const gameState = new State();


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
            player_is_playing: Player,
            playing_step: null,
            myPlayField: PlayField,
            player1: Player,
            p1w1: Worker,
            p1w2: Worker,
            p2w1: Worker,
            p2w2: Worker,
            player2: Player,
            game: GameModel,
            alertText: "This is a message.",
            players_turn: null,
            selected_worker: null,
            highlightedFields: null,
            visibleLevels: false,
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
       this.checkStart()
    }

    alertMessage() {
        return this.state.alertText
    }


    checkStart() {
        console.log(this.state.p1w1);
        /*  if (this.state.game.player1.worker1.position === -1 && this.state.game.player1.worker2.position === -1 && this.state.game.player2.worker1.position === -1 && this.state.game.player2.worker2.position === -1) {
              this.set_beginner();
               alert("hello");
          }*/
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
                this.setState({players_turn: beginnerId});
                // console.log(this.state.beginnerId);
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
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
                    // console.log(localStorage.getItem("userID"));
                    const Player1 = new Player(response);
                    const Game = new GameModel(response);
                    const Player1Worker1 = new Worker();
                    const Player1Worker2 = new Worker();
                    const Player2Worker1 = new Worker();
                    const Player2Worker2 = new Worker();
                    Player1.id = response.player1.id;
                    Player1.gameId = response.player1.id;
                    Player1.username = response.player1.username;
                    Player1.color = response.player1.color;
                    Player1.status = response.player1.status;
                    Player1Worker1.workerId = response.player1.worker1.workerId;
                    Player1Worker1.playerId = response.player1.worker1.playerId;
                    Player1Worker1.position = response.player1.worker1.position;
                    Player1Worker1.next = response.player1.worker1.next;
                    Player1Worker1.winner = response.player1.worker1.winner;
                    Player1Worker2.workerId = response.player1.worker2.workerId;
                    Player1Worker2.playerId = response.player1.worker2.playerId;
                    Player1Worker2.position = response.player1.worker2.position;
                    Player1Worker2.next = response.player1.worker2.next;
                    Player1Worker2.winner = response.player1.worker2.winner;
                    // console.log("Player1 of GET games/{gameID}", Player1);
                    console.log(Player1Worker1);
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
                        game: Game,
                        p1w1: Player1Worker1,
                        p1w2: Player1Worker2,
                    });
                    //     console.log(this.state.game.status);
                    //console.log(this.state.player1.worker1.color);
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            })
    }

    build(box) {
        this.setState({alertText: this.state.player_is_playing.username + " on turn to build."});
        if (this.state.highlightedFields === null) {
            if (box.occupier != null) {
                if (box.occupier.workerId === this.state.player_is_playing.worker1.workerId) { // this.state.player2.worker1.workerId only placeholder
                    //  console.log(this.state.player_is_playing.worker1.workerId);
                    this.setState({selected_worker: this.state.player_is_playing.worker1.workerId});
                    this.highLightBuild(box);
                }
                if (box.occupier.workerId === this.state.player_is_playing.worker2.workerId) {
                    this.setState({selected_worker: this.state.player_is_playing.worker2.workerId});
                    this.highLightBuild(box);
                }
            }
        } else if (this.state.highlightedFields != null) {
            var placeable = false;
            var i;
            for (i = 0; i < this.state.highlightedFields.length; i++) {
                if (box.fieldNum === this.state.highlightedFields[i]) {
                    placeable = true
                }
                ;
            }
            console.log(placeable);
            if (placeable === true) {
                fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${box.fieldNum}/build`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => {
                        this.setState({highlightedFields: null});
                        this.create_field();
                    })
                    .catch(err => {
                        if (err.message.match(/Failed to fetch/)) {
                            alert("The server cannot be reached. Did you start it?");
                        } else {
                            alert(`Something went wrong during the creation: ${err.message}`);
                        }
                    });
            } else {
                this.setState({highlightedFields: null});
            }
        }
    }

    move(box) {
        this.setState({alertText: this.state.player_is_playing.username + " on turn to move."});
        if (this.state.highlightedFields === null) {
            if (box.occupier != null) {
                if (box.occupier.workerId === this.state.player_is_playing.worker1.workerId) { // this.state.player2.worker1.workerId only placeholder
                    console.log(this.state.player_is_playing.worker1.workerId);
                    this.setState({selected_worker: this.state.player_is_playing.worker1.workerId});
                    this.highLightMove(box);
                }
                if (box.occupier.workerId === this.state.player_is_playing.worker2.workerId) {
                    this.setState({selected_worker: this.state.player_is_playing.worker2.workerId});
                    this.highLightMove(box);
                }
            }
        } else if (this.state.highlightedFields != null) {
            var placeable = false;
            var i;
            for (i = 0; i < this.state.highlightedFields.length; i++) {
                if (box.fieldNum === this.state.highlightedFields[i]) {
                    placeable = true
                }
                ;
            }
            console.log(placeable);
            if (placeable === true) {
                fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${box.fieldNum}/${this.state.selected_worker}/move`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => {
                        this.setState({highlightedFields: null});
                        this.create_field();
                    })
                    .catch(err => {
                        if (err.message.match(/Failed to fetch/)) {
                            alert("The server cannot be reached. Did you start it?");
                        } else {
                            alert(`Something went wrong during the creation: ${err.message}`);
                        }
                    });
            } else {
                this.setState({highlightedFields: null});
            }
        }
    }


    change_players_turn() {
        if (this.state.player1.id === this.state.players_turn) {
            this.state.players_turn = this.state.player2.id
        } else {
            this.state.players_turn = this.state.player1.id
        }
    }

    setStateMovePlayer1() {
        this.setState({
            playing_step: "movePlayer1",
        });
        this.state.player_is_playing = this.state.player1;
    }

    setStateBuildPlayer1() {
        this.setState({
            playing_step: "buildPlayer1",
        });
        this.state.player_is_playing = this.state.player1;
    }

    get_action(box) {
        this.create_field();
        /*    if(Number(localStorage.getItem("userID")) === this.state.players_turn) {
                if (this.state.playing_step === "place_worker") {
                    this.set_worker(box);
                    this.change_players_turn();
                    this.state.alertText = "Player with UserID " + JSON.stringify(this.state.players_turn) + " can set worker";
                }
            } */
        //   this.setStateMovePlayer1();
        if (this.state.playing_step === "movePlayer1") {
            this.move(box);

        }
        this.setStateBuildPlayer1()
        if (this.state.playing_step === "buildPlayer1") {
            this.build(box);
        }
    }

    select_worker() {
        if (this.state.player1.id === this.state.players_turn) {
            if (this.state.player1.worker1.position === 0) {
                this.state.selected_worker = this.state.player1.worker1.workerId
            } else {
                this.state.selected_worker = this.state.player1.worker2.workerId
            }
        } else {
            if (this.state.player2.worker1.position === 0) {
                // console.log(this.state.player2.worker1.workerId);
                this.state.selected_worker = this.state.player2.worker1.workerId
            } else {
                this.state.selected_worker = this.state.player2.worker2.workerId
            }
        }
    }

    highLightMove(box) {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${box.fieldNum}/highlight/move`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(returnedFields => {
                    this.setState({highlightedFields: returnedFields});
                    //         console.log(this.state.highlightedFields);
                }
            )
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the creation: ${err.message}`);
                }
            });
    }

    highLightBuild(box) {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${box.fieldNum}/highlight/build`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(returnedFields => {
                    this.setState({highlightedFields: returnedFields});
                    //         console.log(this.state.highlightedFields);
                }
            )
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the creation: ${err.message}`);
                }
            });
    }

    set_worker(box) {
        this.select_worker();
        fetch(`${getDomain()}/games/${localStorage.getItem("gameID")}/${box.fieldNum}/${this.state.selected_worker}/place`, {
            method: "PUT",
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
        this.get_game();
        if (this.state.player1.worker1.position !== 0 && this.state.player1.worker2.position !== 0 && this.state.player2.worker1.position !== 0 && this.state.player2.worker2.position !== 0) {
            this.state.playing_step = "moving"
        }
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
                        //console.log(this.state.box13);
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
        singleField.height = tempField[i].height;
        singleField.occupier = tempField[i].occupier;
        singleField.x_coordinate = tempField[i].x_coordinate;
        singleField.y_coordinate = tempField[i].y_coordinate;
    }


    getBorder(box) {
        if (this.state.highlightedFields != null) {
            var i;
            for (i = 0; i < this.state.highlightedFields.length; i++) {
                if (box.fieldNum === this.state.highlightedFields[i])
                    return "border";
            }
        }
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
        if (box.occupier === null && box.height === 0) {
            return ("text");
        } else if (box.occupier === null && box.height === 1) {
            return "text1";
        } else if (box.occupier === null && box.height === 2) {
            return "text2";
        } else if (box.occupier === null && box.height === 3) {
            return "text3";
        } else if (box.height === 0 && box.occupier != null) {
            return ("player-div-lvl-0-" + this.getPlayerColor(box)) + " text";
        } else if (box.height === 1 && box.occupier != null) {
            return ("player-div-lvl-1-" + this.getPlayerColor(box));
        } else if (box.height === 2 && box.occupier != null) {
            return ("player-div-lvl-2-" + this.getPlayerColor(box));
        } else if (box.height === 3 && box.occupier != null) {
            return ("player-div-lvl-3-" + this.getPlayerColor(box));
        }
    }

    heightLayout(box) {
        if (box.height === 1) {
            return "level1";
        } else if (box.height === 2) {
            return "level2";
        } else if (box.height === 3) {
            return "level3";
        } else if (box.height === 4) {
            return "level4";
        } else if (box.height === 0 && box.occupier != null) {
            return ("player-div-lvl-0-" + this.getPlayerColor(box));
        } else if (box.height === 1 && box.occupier != null) {
            return ("player-div-lvl-1-" + this.getPlayerColor(box));
        } else if (box.height === 2 && box.occupier != null) {
            return ("player-div-lvl-2-" + this.getPlayerColor(box));
        } else if (box.height === 3 && box.occupier != null) {
            return ("player-div-lvl-3-" + this.getPlayerColor(box));
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
                            <div className="box0 black box" id={this.getBorder(this.state.box0)} onClick={() => {
                                this.get_action(this.state.box0)
                            }}>
                                <div id={this.heightLayout(this.state.box0)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box0)}>{this.state.box0.height}</div>
                                </div>
                            </div>
                            <div className="box1 white box" id={this.getBorder(this.state.box1)}
                                 onClick={() => {
                                     this.get_action(this.state.box1)
                                 }}>
                                <div id={this.heightLayout(this.state.box1)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box1)}>{this.state.box1.height}</div>
                                </div>
                            </div>
                            <div className="box2 black box" id={this.getBorder(this.state.box2)} onClick={() => {
                                this.get_action(this.state.box2)
                            }}>
                                <div id={this.heightLayout(this.state.box2)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box2)}>{this.state.box2.height}</div>
                                </div>
                            </div>
                            <div className="box3 white box" id={this.getBorder(this.state.box3)} onClick={() => {
                                this.get_action(this.state.box3)
                            }}>
                                <div id={this.heightLayout(this.state.box3)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box3)}>{this.state.box3.height}</div>
                                </div>
                            </div>
                            <div className="box4 black box" id={this.getBorder(this.state.box4)} onClick={() => {
                                this.get_action(this.state.box4)
                            }}>
                                <div id={this.heightLayout(this.state.box4)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box4)}>{this.state.box4.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box5 white box" id={this.getBorder(this.state.box5)} onClick={() => {
                                this.get_action(this.state.box5)
                            }}>
                                <div id={this.heightLayout(this.state.box5)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box5)}>{this.state.box5.height}</div>
                                </div>
                            </div>
                            <div className="box6 black box" id={this.getBorder(this.state.box6)} onClick={() => {
                                this.get_action(this.state.box6)
                            }}>
                                <div id={this.heightLayout(this.state.box6)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box6)}>{this.state.box6.height}</div>
                                </div>
                            </div>
                            <div className="box7 white box" id={this.getBorder(this.state.box7)} onClick={() => {
                                this.get_action(this.state.box7)
                            }}>
                                <div id={this.heightLayout(this.state.box7)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box7)}>{this.state.box7.height}</div>
                                </div>
                            </div>
                            <div className="box8 black box" id={this.getBorder(this.state.box8)} onClick={() => {
                                this.get_action(this.state.box8)
                            }}>
                                <div id={this.heightLayout(this.state.box8)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box8)}>{this.state.box8.height}</div>
                                </div>
                            </div>
                            <div className="box9 white box" id={this.getBorder(this.state.box9)} onClick={() => {
                                this.get_action(this.state.box9)
                            }}>
                                <div id={this.heightLayout(this.state.box9)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box9)}>{this.state.box9.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box10 black box" id={this.getBorder(this.state.box10)} onClick={() => {
                                this.get_action(this.state.box10)
                            }}>
                                <div id={this.heightLayout(this.state.box10)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box10)}>{this.state.box10.height}</div>
                                </div>
                            </div>
                            <div className="box11 white box" id={this.getBorder(this.state.box11)} onClick={() => {
                                this.get_action(this.state.box11)
                            }}>
                                <div id={this.heightLayout(this.state.box11)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box11)}>{this.state.box11.height}</div>
                                </div>
                            </div>
                            <div className="box12 black box" id={this.getBorder(this.state.box12)} onClick={() => {
                                this.get_action(this.state.box12)
                            }}>
                                <div id={this.heightLayout(this.state.box12)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box12)}>{this.state.box12.height}</div>
                                </div>
                            </div>
                            <div className="box13 white box" id={this.getBorder(this.state.box13)} onClick={() => {
                                this.get_action(this.state.box13)
                            }}>
                                <div id={this.heightLayout(this.state.box13)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box13)}>{this.state.box13.height}</div>
                                </div>
                            </div>
                            <div className="box14 black box" id={this.getBorder(this.state.box14)} onClick={() => {
                                this.get_action(this.state.box14)
                            }}>
                                <div id={this.heightLayout(this.state.box14)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box14)}>{this.state.box14.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box15 white box" id={this.getBorder(this.state.box15)} onClick={() => {
                                this.get_action(this.state.box15)
                            }}>
                                <div id={this.heightLayout(this.state.box15)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box15)}>{this.state.box15.height}</div>
                                </div>
                            </div>
                            <div className="box16 black box" id={this.getBorder(this.state.box16)} onClick={() => {
                                this.get_action(this.state.box16)
                            }}>
                                <div id={this.heightLayout(this.state.box16)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box16)}>{this.state.box16.height}</div>
                                </div>
                            </div>
                            <div className="box17 white box" id={this.getBorder(this.state.box17)} onClick={() => {
                                this.get_action(this.state.box17)
                            }}>
                                <div id={this.heightLayout(this.state.box17)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box17)}>{this.state.box17.height}</div>
                                </div>
                            </div>
                            <div className="box18 black box" id={this.getBorder(this.state.box18)} onClick={() => {
                                this.get_action(this.state.box18)
                            }}>
                                <div id={this.heightLayout(this.state.box18)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box18)}>{this.state.box18.height}</div>
                                </div>
                            </div>
                            <div className="box19 white box" id={this.getBorder(this.state.box19)} onClick={() => {
                                this.get_action(this.state.box19)
                            }}>
                                <div id={this.heightLayout(this.state.box19)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box19)}>{this.state.box19.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box20 black box" id={this.getBorder(this.state.box20)} onClick={() => {
                                this.get_action(this.state.box20)
                            }}>
                                <div id={this.heightLayout(this.state.box20)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box20)}>{this.state.box20.height}</div>
                                </div>
                            </div>
                            <div className="box21 white box" id={this.getBorder(this.state.box21)} onClick={() => {
                                this.get_action(this.state.box21)
                            }}>
                                <div id={this.heightLayout(this.state.box21)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box21)}>{this.state.box21.height}</div>
                                </div>
                            </div>
                            <div className="box22 black box" id={this.getBorder(this.state.box22)} onClick={() => {
                                this.get_action(this.state.box22)
                            }}>
                                <div id={this.heightLayout(this.state.box22)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box22)}>{this.state.box22.height}</div>
                                </div>
                            </div>
                            <div className="box23 white box" id={this.getBorder(this.state.box23)} onClick={() => {
                                this.get_action(this.state.box23)
                            }}>
                                <div id={this.heightLayout(this.state.box23)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box23)}>{this.state.box23.height}</div>
                                </div>
                            </div>
                            <div className="box24 black box" id={this.getBorder(this.state.box24)} onClick={() => {
                                this.get_action(this.state.box24)
                            }}>
                                <div id={this.heightLayout(this.state.box24)}>
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
