import React from "react";
import {withRouter} from "react-router-dom";
import "./GamePlay.css";
import "./PlayerColor.css";
import styled from "styled-components";
import GameWorker from "../shared/models/GameWorker";
import Field from "../shared/models/Field";
import {getDomain} from "../../helpers/getDomain";
import PlayField from "../shared/models/PlayField";
import {BaseContainer} from "../../helpers/layout";
import {Button} from "../../views/design/Button";
import Player from "../shared/models/Player";
import State from "../shared/models/State.js";
import GameModel from "../shared/models/GameModel";
import "./player_colors_circles.css"


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

const Checkbox = props => (
    <input type="checkbox" {...props} />
)

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

class GamePlay extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            player_is_playing: null,
            playing_step: null,
            gameStatus: null,
            myPlayField: PlayField,
            player1: Player,
            player2: Player,
            game: GameModel,
            alertText: "This is a message.",
            players_turn: null,
            selected_worker: null,
            highlightedFields: null,
            visibleLevels: false,
            checked: false,
            allBoxes: [],
            variateForward: null,
            finished: false,
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
            positionP1W1: null,
            positionP1W2: null,
            positionP2W1: null,
            positionP2W2: null

        };
    }

    updateBoxes() {
        this.state.allBoxes[0] = this.state.box0;
        this.state.allBoxes[1] = this.state.box1;
        this.state.allBoxes[2] = this.state.box2;
        this.state.allBoxes[3] = this.state.box3;
        this.state.allBoxes[4] = this.state.box4;
        this.state.allBoxes[5] = this.state.box5;
        this.state.allBoxes[6] = this.state.box6;
        this.state.allBoxes[7] = this.state.box7;
        this.state.allBoxes[8] = this.state.box8;
        this.state.allBoxes[9] = this.state.box9;
        this.state.allBoxes[10] = this.state.box10;
        this.state.allBoxes[11] = this.state.box11;
        this.state.allBoxes[12] = this.state.box12;
        this.state.allBoxes[13] = this.state.box13;
        this.state.allBoxes[14] = this.state.box14;
        this.state.allBoxes[15] = this.state.box15;
        this.state.allBoxes[16] = this.state.box16;
        this.state.allBoxes[17] = this.state.box17;
        this.state.allBoxes[18] = this.state.box18;
        this.state.allBoxes[19] = this.state.box19;
        this.state.allBoxes[20] = this.state.box20;
        this.state.allBoxes[21] = this.state.box21;
        this.state.allBoxes[22] = this.state.box22;
        this.state.allBoxes[23] = this.state.box23;
        this.state.allBoxes[24] = this.state.box24;
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.game.gameStatus === "Winner1" || this.state.game.gameStatus === "Winner2") {
                // console.log("winner 1 or 2 exists")
                //CLEAR INTERVALL HERE
            } else {
                console.log("abc");
                this.get_game();
                this.create_field();
                this.updateBoxes();
                this.updateLayoutBoxes();
            }
        }, 1000)
    }

    updateLayoutBoxes() {
        if (this.state.checked === true) {
            var i;
            for (i = 0; i < 24; i++) {
                if (this.state.allBoxes[i].height != 0) {
                    this.state.allBoxes[i].layout = this.state.allBoxes[i].height;
                }
            }
        }
        if (this.state.checked === false) {
            var y;
            for (y = 0; y < 24; y++) {
                this.state.allBoxes[y].layout = null;
            }
        }
        this.create_field();
    }

    handleCheckboxChange = event => {
        this.setState({checked: event.target.checked});
        this.updateBoxes();
        this.updateLayoutBoxes();
    }


    alertMessage() {
        if (this.state.game.gameStatus === "Move1") {
            if (this.state.game.player1.worker1.position === -1 || this.state.game.player1.worker2.position === -1) {
                this.state.alertText = this.state.game.player1.username + " can place worker.";
            } else {
                this.state.alertText = this.state.game.player1.username + " can move.";
            }
        }
        if (this.state.game.gameStatus === "Move2") {
            if (this.state.game.player2.worker1.position === -1 || this.state.game.player2.worker2.position === -1) {
                this.state.alertText = this.state.game.player2.username + " can place worker.";
            } else {
                this.state.alertText = this.state.game.player2.username + " can move.";
            }
        }
        if (this.state.game.gameStatus === "Build1") {
            this.state.alertText = this.state.game.player1.username + " can build.";
        }
        if (this.state.game.gameStatus === "Build2") {
            this.state.alertText = this.state.game.player2.username + " can build.";
        }
        if (this.state.game.gameStatus === "Winner1") {
            this.state.alertText = this.state.game.player1.username + " has won."
        }
        if (this.state.game.gameStatus === "Winner2") {
            this.state.alertText = this.state.game.player2.username + " has won."
        }
        return this.state.alertText
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
                if (beginnerId === this.state.player1.id) {
                    this.state.player_is_playing = this.state.game.player1
                } else {
                    this.state.player_is_playing = this.state.game.player2
                }
                // console.log(this.state.beginnerId);
            });
        this.setState({alertText: this.state.player_is_playing.username + " can place worker."})
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the beginner: " + err);
            });
    }


    get_game() {
        if ((this.state.gameStatus !== "Winner1") && (this.state.gameStatus !== "Winner2")) {
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
                            positionP1W1: response.player1.worker1.position,
                            positionP1W2: response.player1.worker2.position,
                            positionP2W1: response.player2.worker1.position,
                            positionP2W2: response.player2.worker2.position
                        });
                        if (this.state.game.gameStatus === "Start") {
                            this.set_beginner()
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    build(box) {
        if (this.state.highlightedFields === null) {
            if (box.occupier != null) {
                if (box.occupier.workerId === this.state.selected_worker) {
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
            if (placeable === true) {
                fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${box.fieldNum}/${this.state.selected_worker}/build`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => {
                        this.setState({highlightedFields: null});
                        this.create_field();
                        this.get_game();
                        this.state.selected_worker = null;
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
        if (this.state.highlightedFields === null) {
            if (box.occupier != null) {
                if (box.occupier.workerId === this.state.player_is_playing.worker1.workerId) {
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
            if (placeable === true) {
                fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${box.fieldNum}/${this.state.selected_worker}/move`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => {
                        this.setState({highlightedFields: null});
                        this.create_field();
                        this.get_game();
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
                this.state.selected_worker = null;
            }
        }
    }

    get_action(box) {
        this.get_game();
        this.alertMessage();
        if (this.state.game.gameStatus === "Move2") {
            this.state.player_is_playing = this.state.player2;
            if (sessionStorage.getItem("userID") === String(this.state.player2.id)) {
                if (this.state.game.player2.worker1.position === -1 || this.state.game.player2.worker2.position === -1) {
                    this.set_worker(box);
                } else {
                    this.move(box);
                }
            }
        }
        if (this.state.game.gameStatus === "Move1") {
            this.state.player_is_playing = this.state.game.player1;
            if (sessionStorage.getItem("userID") === String(this.state.player1.id)) {
                if (this.state.game.player1.worker1.position === -1 || this.state.game.player1.worker2.position === -1) {
                    console.log("cc");
                    this.set_worker(box);
                } else {
                    this.move(box);
                }
            }
        }
        if (this.state.gameStatus === "Build1") {
            if (sessionStorage.getItem("userID") === String(this.state.player1.id)) {
                this.state.player_is_playing = this.state.game.player1;
                this.build(box)
            }
        }

        if (this.state.gameStatus === "Build2") {
            if (sessionStorage.getItem("userID") === String(this.state.player2.id)) {
                this.state.player_is_playing = this.state.game.player2;
                this.build(box)
            }
        }
        this.create_field();
        this.get_game();
    }

    select_worker() {
        if (this.state.player_is_playing.worker1.position === -1) {
            this.state.selected_worker = this.state.player_is_playing.worker1.workerId
        } else {
            this.state.selected_worker = this.state.player_is_playing.worker2.workerId
        }
    }

    highLightMove(box) {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${box.fieldNum}/highlight/move`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(returnedFields => {
                    this.setState({highlightedFields: returnedFields});
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
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${box.fieldNum}/highlight/build`, {
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
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${box.fieldNum}/${this.state.selected_worker}/place`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                console.log(response);
                this.get_game();
                this.create_field();
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the creation: ${err.message}`);
                }
            });
        this.create_field();
        this.state.selected_worker = null;
    }


    create_field() {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/board/create`, {
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
                        this.alertMessage();
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
        if (box.occupier.playerId === this.state.game.player1.id) {
            return this.state.game.player1.color;
        } else if
        (box.occupier.playerId === this.state.game.player2.id) {
            return this.state.game.player2.color;
        }
    }

    isStarted() {
        if (this.state.positionP1W1 === -1 || this.state.positionP1W2 === -1 || this.state.positionP2W1 === -1 || this.state.positionP2W2 === -1) {
            return false;
        }
    }


    innerBoxLayout(box) {
        if ((box.occupier === null && box.height === 0)) {
            return ("text");
        } else if (box.occupier === null && box.height === 1) {
            return "text1";
        } else if (box.occupier === null && box.height === 2) {
            return "text2";
        } else if (box.occupier === null && box.height === 3) {
            return "text3";
        } else if ((this.state.selected_worker != null) && (box.height === 0 && box.occupier.workerId === this.state.selected_worker) && (this.isStarted() === false)) {
            return ("player-div-lvl-0-" + this.getPlayerColor(box)) + " text";
        } else if ((this.state.selected_worker != null) && (box.height === 0 && box.occupier.workerId === this.state.selected_worker)) {
            return ("player-div-lvl-0-active-" + this.getPlayerColor(box)) + " text";
        } else if ((this.state.selected_worker != null) && (box.height === 1 && box.occupier.workerId === this.state.selected_worker)) {
            return ("player-div-lvl-1-active-" + this.getPlayerColor(box));
        } else if ((this.state.selected_worker != null) && (box.height === 2 && box.occupier.workerId === this.state.selected_worker)) {
            return ("player-div-lvl-2-active-" + this.getPlayerColor(box));
        } else if ((this.state.selected_worker != null) && (box.height === 3 && box.occupier.workerId === this.state.selected_worker)) {
            return ("player-div-lvl-3-active-" + this.getPlayerColor(box));
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

    leave_game() {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(returnedGame => {
                if (returnedGame.status === 404 || returnedGame.status === 500) {
                    //  has to be modified for game
                    this.setState({alertText: "You could not leave the lobby"})
                } else {
                    sessionStorage.removeItem("gameID");
                    sessionStorage.removeItem("userID_player1");
                    sessionStorage.removeItem("userID_player2");
                }
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during leaving the lobby: ${err.message}`);
                }
            });
        this.props.history.push("/chooseMode");
    }

    surrender() {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${sessionStorage.getItem("userID")}/surrender`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                this.get_game();
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the creation: ${err.message}`);
                }
            });

    }

    getColorCircle(playerColor) {
        if (playerColor === "BLUE") {
            return "circle_blue-gameplay";
        }
        if (playerColor === "YELLOW") {
            return "circle_yellow-gameplay";
        }
        if (playerColor === "RED") {
            return "circle_red-gameplay";
        }
        if (playerColor === "PINK") {
            return "circle_pink-gameplay";
        }
    }

    isButtonInvisiblePlayer1() {
        if (sessionStorage.getItem("userID") !== (sessionStorage.getItem("userID_player1"))) {
            return "invisible";
        }
    }

    isButtonInvisiblePlayer2() {
        if (sessionStorage.getItem("userID") !== (sessionStorage.getItem("userID_player2"))) {
            return "invisible";
        }
    }

    getColorButton(playerColor) {
        if (playerColor === "BLUE") {
            return "button-blue";
        }
        if (playerColor === "YELLOW") {
            return "button-yellow";
        }
        if (playerColor === "RED") {
            return "button-red";
        }
        if (playerColor === "PINK") {
            return "button-pink";
        }
    }

    getLeftBoxDesign() {
        if (this.state.gameStatus === "Move1" || this.state.gameStatus === "Build1") {
            if (this.state.player1.color === "BLUE") {
                return "active-blue";
            }
            if (this.state.player1.color === "YELLOW") {
                return "active-yellow";
            }
            if (this.state.player1.color === "RED") {
                return "active-red";
            }
            if (this.state.player1.color === "PINK") {
                return "active-pink";
            }
        } else {
            return "player-box-div"
        }
    }

    getRightBoxDesign() {
        if (this.state.gameStatus === "Move2" || this.state.gameStatus === "Build2") {
            if (this.state.player2.color === "BLUE") {
                return "active-blue";
            }
            if (this.state.player2.color === "YELLOW") {
                return "active-yellow";
            }
            if (this.state.player2.color === "RED") {
                return "active-red";
            }
            if (this.state.player2.color === "PINK") {
                return "active-pink";
            }
        } else {
            return "player-box-div"
        }
    }

    getPlayFieldLayout() {
        if (this.state.game.gameStatus === "Winner1" || this.state.game.gameStatus === "Winner2") {
            return "playField-winner";
        } else {
            return "playField";
        }
    }



    render() {

        return (
            <div className="fixedPixels-div">
                <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
                </link>
                <div className="message-div">{this.alertMessage()}</div>
                <div className="mainHorizontally">
                    <div className={this.getLeftBoxDesign()}>
                        <div className="player-box-gameplay">
                            <h2>{this.state.player1.username}</h2>
                            <div className={this.getColorCircle(this.state.player1.color)}></div>
                        </div>
                        <label id={this.isButtonInvisiblePlayer1()}>
                            <span>Show numbers?</span>
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleCheckboxChange}
                            />

                        </label>
                        <ButtonContainer/>
                        <Button className={this.getColorButton(this.state.player1.color) + " button-extras"}
                            id={this.isButtonInvisiblePlayer1()}
                                disabled={(this.state.gameStatus === "Winner1") || (this.state.gameStatus === "Winner2")}
                                width="50%"
                                onClick={() => {
                                    this.surrender()
                                }}
                        >
                            Give Up
                        </Button>
                        <ButtonContainer/>
                        <ButtonContainer/>
                        <Button className={this.getColorButton(this.state.player1.color) + " button-extras"}
                            id={this.isButtonInvisiblePlayer1()}
                                disabled={(this.state.gameStatus !== "Winner1") && (this.state.gameStatus !== "Winner2")}
                                width="50%"
                                onClick={() => {
                                    this.leave_game();
                                    //this.props.history.push('/home')
                                }}
                        >
                            Leave Game
                        </Button>
                        <ButtonContainer/>
                    </div>
                    <div className={this.getPlayFieldLayout()}>
                        <div>
                            <div className="box0 black box" id={this.getBorder(this.state.box0)} onClick={() => {
                                this.get_action(this.state.box0)
                            }}>
                                <div id={this.heightLayout(this.state.box0)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box0)}>{this.state.box0.layout}
                                    </div>
                                </div>
                            </div>
                            <div className="box1 white box" id={this.getBorder(this.state.box1)}
                                 onClick={() => {
                                     this.get_action(this.state.box1)
                                 }}>
                                <div id={this.heightLayout(this.state.box1)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box1)}>{this.state.box1.layout}
                                    </div>
                                </div>
                            </div>
                            <div className="box2 black box" id={this.getBorder(this.state.box2)} onClick={() => {
                                this.get_action(this.state.box2)
                            }}>
                                <div id={this.heightLayout(this.state.box2)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box2)}>{this.state.box2.layout}</div>
                                </div>
                            </div>
                            <div className="box3 white box" id={this.getBorder(this.state.box3)} onClick={() => {
                                this.get_action(this.state.box3)
                            }}>
                                <div id={this.heightLayout(this.state.box3)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box3)}>{this.state.box3.layout}</div>
                                </div>
                            </div>
                            <div className="box4 black box" id={this.getBorder(this.state.box4)} onClick={() => {
                                this.get_action(this.state.box4)
                            }}>
                                <div id={this.heightLayout(this.state.box4)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box4)}>{this.state.box4.layout}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box5 white box" id={this.getBorder(this.state.box5)} onClick={() => {
                                this.get_action(this.state.box5)
                            }}>
                                <div id={this.heightLayout(this.state.box5)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box5)}>{this.state.box5.layout}</div>
                                </div>
                            </div>
                            <div className="box6 black box" id={this.getBorder(this.state.box6)} onClick={() => {
                                this.get_action(this.state.box6)
                            }}>
                                <div id={this.heightLayout(this.state.box6)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box6)}>{this.state.box6.layout}</div>
                                </div>
                            </div>
                            <div className="box7 white box" id={this.getBorder(this.state.box7)} onClick={() => {
                                this.get_action(this.state.box7)
                            }}>
                                <div id={this.heightLayout(this.state.box7)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box7)}>{this.state.box7.layout}</div>
                                </div>
                            </div>
                            <div className="box8 black box" id={this.getBorder(this.state.box8)} onClick={() => {
                                this.get_action(this.state.box8)
                            }}>
                                <div id={this.heightLayout(this.state.box8)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box8)}>{this.state.box8.layout}</div>
                                </div>
                            </div>
                            <div className="box9 white box" id={this.getBorder(this.state.box9)} onClick={() => {
                                this.get_action(this.state.box9)
                            }}>
                                <div id={this.heightLayout(this.state.box9)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box9)}>{this.state.box9.layout}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box10 black box" id={this.getBorder(this.state.box10)} onClick={() => {
                                this.get_action(this.state.box10)
                            }}>
                                <div id={this.heightLayout(this.state.box10)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box10)}>{this.state.box10.layout}</div>
                                </div>
                            </div>
                            <div className="box11 white box" id={this.getBorder(this.state.box11)} onClick={() => {
                                this.get_action(this.state.box11)
                            }}>
                                <div id={this.heightLayout(this.state.box11)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box11)}>{this.state.box11.layout}</div>
                                </div>
                            </div>
                            <div className="box12 black box" id={this.getBorder(this.state.box12)} onClick={() => {
                                this.get_action(this.state.box12)
                            }}>
                                <div id={this.heightLayout(this.state.box12)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box12)}>{this.state.box12.layout}</div>
                                </div>
                            </div>
                            <div className="box13 white box" id={this.getBorder(this.state.box13)} onClick={() => {
                                this.get_action(this.state.box13)
                            }}>
                                <div id={this.heightLayout(this.state.box13)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box13)}>{this.state.box13.layout}</div>
                                </div>
                            </div>
                            <div className="box14 black box" id={this.getBorder(this.state.box14)} onClick={() => {
                                this.get_action(this.state.box14)
                            }}>
                                <div id={this.heightLayout(this.state.box14)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box14)}>{this.state.box14.layout}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box15 white box" id={this.getBorder(this.state.box15)} onClick={() => {
                                this.get_action(this.state.box15)
                            }}>
                                <div id={this.heightLayout(this.state.box15)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box15)}>{this.state.box15.layout}</div>
                                </div>
                            </div>
                            <div className="box16 black box" id={this.getBorder(this.state.box16)} onClick={() => {
                                this.get_action(this.state.box16)
                            }}>
                                <div id={this.heightLayout(this.state.box16)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box16)}>{this.state.box16.layout}</div>
                                </div>
                            </div>
                            <div className="box17 white box" id={this.getBorder(this.state.box17)} onClick={() => {
                                this.get_action(this.state.box17)
                            }}>
                                <div id={this.heightLayout(this.state.box17)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box17)}>{this.state.box17.layout}</div>
                                </div>
                            </div>
                            <div className="box18 black box" id={this.getBorder(this.state.box18)} onClick={() => {
                                this.get_action(this.state.box18)
                            }}>
                                <div id={this.heightLayout(this.state.box18)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box18)}>{this.state.box18.layout}</div>
                                </div>
                            </div>
                            <div className="box19 white box" id={this.getBorder(this.state.box19)} onClick={() => {
                                this.get_action(this.state.box19)
                            }}>
                                <div id={this.heightLayout(this.state.box19)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box19)}>{this.state.box19.layout}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box20 black box" id={this.getBorder(this.state.box20)} onClick={() => {
                                this.get_action(this.state.box20)
                            }}>
                                <div id={this.heightLayout(this.state.box20)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box20)}>{this.state.box20.layout}</div>
                                </div>
                            </div>
                            <div className="box21 white box" id={this.getBorder(this.state.box21)} onClick={() => {
                                this.get_action(this.state.box21)
                            }}>
                                <div id={this.heightLayout(this.state.box21)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box21)}>{this.state.box21.layout}</div>
                                </div>
                            </div>
                            <div className="box22 black box" id={this.getBorder(this.state.box22)} onClick={() => {
                                this.get_action(this.state.box22)
                            }}>
                                <div id={this.heightLayout(this.state.box22)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box22)}>{this.state.box22.layout}</div>
                                </div>
                            </div>
                            <div className="box23 white box" id={this.getBorder(this.state.box23)} onClick={() => {
                                this.get_action(this.state.box23)
                            }}>
                                <div id={this.heightLayout(this.state.box23)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box23)}>{this.state.box23.layout}</div>
                                </div>
                            </div>
                            <div className="box24 black box" id={this.getBorder(this.state.box24)} onClick={() => {
                                this.get_action(this.state.box24)
                            }}>
                                <div id={this.heightLayout(this.state.box24)}>
                                    <div
                                        className={this.innerBoxLayout(this.state.box24)}>{this.state.box24.layout}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.getRightBoxDesign()}>
                        <div className="player-box-gameplay">
                            <h2>{this.state.player2.username}</h2>
                            <div className={this.getColorCircle(this.state.player2.color)}></div>
                        </div>
                        <label id={this.isButtonInvisiblePlayer2()}>
                            <span>Show numbers?</span>
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleCheckboxChange}
                            />

                        </label>
                        <ButtonContainer/>
                        <Button className={this.getColorButton(this.state.player2.color) + " button-extras"}
                            id={this.isButtonInvisiblePlayer2()}
                                disabled={(this.state.gameStatus === "Winner1") || (this.state.gameStatus === "Winner2")}
                                width="50%"
                                onClick={() => {
                                    this.surrender()
                                }}
                        >
                            Give Up
                        </Button>
                        <ButtonContainer/>
                        <ButtonContainer/>
                        <Button className={this.getColorButton(this.state.player2.color) + " button-extras"}
                            id={this.isButtonInvisiblePlayer2()}
                                disabled={(this.state.gameStatus !== "Winner1") && (this.state.gameStatus !== "Winner2")}
                                width="50%"
                                onClick={() => {
                                    this.leave_game();
                                    //this.props.history.push('/home')
                                }}
                        >
                            Leave Game
                        </Button>
                        <ButtonContainer/>
                    </div>
                </div>
                <div className="fastForward">
                    <ButtonContainer/>
                    <Button
                        width="20%"
                        onClick={() => {
                            this.fastForward();
                        }}
                    >
                        Fast-Forward
                    </Button>
                    <ButtonContainer/>
                </div>
            </div>
        )

    }


    fastForward() {
        var i;
        console.log(this.state.variateForward);
        if (this.state.variateForward === null) {
            this.setState({variateForward: 1});
        }
        if (this.state.variateForward === 1) {
            for (i = 0; i < 24; i = i + 3)
                if (this.state.allBoxes[i].occupier === null && this.state.allBoxes[i].height != 4) {
                    this.quickBuild(i);
                    this.get_game();
                    this.create_field();
                }
            for (i = 3; i < 23; i = i + 5)
                if (this.state.allBoxes[i].occupier === null && this.state.allBoxes[i].height != 3 && this.state.allBoxes[i].height != 4) {
                    this.quickBuild(i);
                    this.quickBuild(i);
                    this.get_game();
                    this.create_field();
                }
            for (i = 0; i < 24; i = i + 2) {
                if (this.state.allBoxes[i].occupier != null && this.state.allBoxes[i].height != 2 && this.state.allBoxes[i].height != 3 && this.state.allBoxes[i].height != 4) {
                    this.quickBuild(i);
                    this.get_game();
                    this.create_field();
                }
            }
            this.setState({variateForward: 2});
            ;
        }
        if (this.state.variateForward === 2) {
            for (i = 0; i < 24; i = i + 2)
                if (this.state.allBoxes[i].occupier === null && this.state.allBoxes[i].height != 4) {
                    this.quickBuild(i);
                    this.get_game();
                    this.create_field();
                }
            for (i = 3; i < 23; i = i + 3)
                if (this.state.allBoxes[i].occupier === null && this.state.allBoxes[i].height != 3 && this.state.allBoxes[i].height != 4) {
                    this.quickBuild(i);
                    this.quickBuild(i);
                    this.get_game();
                    this.create_field();
                }
            for (i = 0; i < 24; i = i + 3) {
                if (this.state.allBoxes[i].occupier != null && this.state.allBoxes[i].height != 2 && this.state.allBoxes[i].height != 3 && this.state.allBoxes[i].height != 4) {
                    this.quickBuild(i);
                    this.get_game();
                    this.create_field();
                }
            }
            this.setState({variateForward: 1});
            ;
        }

    }

    quickBuild(fieldNum) {
        fetch(`${getDomain()}/games/${sessionStorage.getItem("gameID")}/${fieldNum}/build`, {
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
    }


}

export default withRouter(GamePlay);
