import React from "react";
import "./GamePlay.css";
import Worker from "../shared/models/Worker";
import Field from "../shared/models/Field";
import {getDomain} from "../../helpers/getDomain";
import Playfield from "../shared/models/Playfield";


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

            alertText: "This is a message.",
        };
    }


    componentDidMount() {
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


    create_field() {
        fetch(`${getDomain()}/games/${localStorage.getItem("gameId")}/playfield/create`, {
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
                    console.log(box13.id);
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
        this.create_field();
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

    innerBoxLayout(box) {
        box.occupation = true;
        console.log(box.occupation);
        if (box.occupation === false && box.height === "1") {
            return "text1";
        } else if (box.occupation === false && box.height === "2") {
            return "text2";
        } else if (box.occupation === false && box.height === "3") {
            return "text3";
        } else if (box.height === "1" && box.occupation === true) {
            return "player1-div-lvl-1"
        } else if (box.height === "2" && box.occupation === true) {
            return "player1-div-lvl-2"
        } else if (box.height === "3" && box.occupation === true) {
            return "player1-div-lvl-3"
        }
    }


    render() {
        return (
            <div className="fixedPixels-div">
                <div className="message-div">{this.alertMessage()}</div>
                <div className="mainHorizontally">
                    <div className="left"> left</div>
                    <div className="playField">
                        <div className="playField-row">
                            <div className="box1 white box" onClick={() => {
                                this.changeLvl(box1)
                            }}>
                                <div id={box1.layout}>
                                    <div className={this.innerBoxLayout(box1)}>{box1.height}</div>
                                </div>
                            </div>
                            <div className="box2 black box" onClick={() => {
                                this.changeLvl(box2)
                            }}>
                                <div id={box2.layout}>
                                    <div className={this.innerBoxLayout(box2)}>{box2.height}</div>
                                </div>
                            </div>
                            <div className="box3 white box" onClick={() => {
                                this.changeLvl(box3)
                            }}>
                                <div id={box3.layout}>
                                    <div className={this.innerBoxLayout(box3)}>{box3.height}</div>
                                </div>
                            </div>
                            <div className="box4 black box" onClick={() => {
                                this.changeLvl(box4)
                            }}>
                                <div id={box4.layout}>
                                    <div className={this.innerBoxLayout(box4)}>{box4.height}</div>
                                </div>
                            </div>
                            <div className="box5 white box" onClick={() => {
                                this.changeLvl(box5)
                            }}>
                                <div id={box5.layout}>
                                    <div className={this.innerBoxLayout(box5)}>{box5.height}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="box-2 box black"></div>
                            <div className="box-7 box white"></div>
                            <div className="box-12 box black"></div>
                            <div className="box-17 box white"></div>
                            <div className="box-22 box black"></div>
                        </div>
                        <div>

                            <div className="box-3 box white"></div>
                            <div className="box-8 box black"></div>
                            <div className="box-13 box white"></div>
                            <div className="box-18 box black"></div>
                            <div className="box-23 box white"></div>
                        </div>
                        <div>

                            <div className="box-4 box black"></div>
                            <div className="box-9 box white"></div>
                            <div className="box-14 box black"></div>
                            <div className="box-19 box white"></div>
                            <div className="box-24 box black"></div>
                        </div>
                        <div>
                            <li className="box-5 box white"></li>
                            <li className="box-10 box black"></li>
                            <li className="box-15 box white"></li>
                            <li className="box-20 box black"></li>
                            <li className="box-25 box white"></li>
                        </div>
                    </div>
                    <div className="right">right</div>
                </div>
            </div>
        )

    }
}

export default GamePlay;
