import React from "react";
import "./GamePlay.css";
import Worker from "../shared/models/Worker";
import Field from "../shared/models/Field";



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
const worker2p1 = new Worker();
const worker1p2 = new Worker();
const worker2p2 = new Worker();

var playerLayout = null;


class GamePlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            layout: null,
            level: "",
            clicked: null,
            alertText: "This is a message."
        };
    }


    componentDidMount() {
    }

    alertMessage() {
        return this.state.alertText
    }

    changeLvl(box) {
        if (box.layout == "level2") {box.layout = "level3"};
        if (box.layout == "level1") {box.layout = "level2"};
        if (box.layout == null) {box.layout = "level1"};
        if (box.level == "2") {box.level = "3"};
        if (box.level == "1") {box.level = "2"};
        if (box.level == null) {box.level = "1"};
        playerLayout = "player1-div";
        this.setState(box);
    }


    render() {
        return (
            <div class="fixedPixels-div">
                <div className="message-div">{this.alertMessage()}</div>
                <div className="mainHorizontally">
                    <div className="left"> left</div>
                    <div className="playField">
                        <div>
                            <div className="box1 white box" onClick={() => {
                                this.changeLvl(box1)
                            }}>
                                <div id={box1.layout}>{box1.level}
                                    <div className="player1-div"></div>
                                </div>
                            </div>
                            <div className="box2 black box" onClick={() => {
                                this.changeLvl(box2)
                            }}>
                                <div id={box2.layout}>{box2.level}
                                    <div className={playerLayout}></div>
                                </div>
                            </div>
                            <div className="box3 white box" onClick={() => {
                                this.changeLvl(box3)
                            }}>
                                <div id={box3.layout}>{box3.level}
                                    <div className="player1-div"></div>
                                </div>
                            </div>
                            <div className="box4 black box" onClick={() => {
                                this.changeLvl(box4)
                            }}>
                                <div id={box4.layout}>{box4.level}
                                    <div className="player1-div"></div>
                                </div>
                            </div>
                            <div className="box5 white box" onClick={() => {
                                this.changeLvl(box5)
                            }}>
                                <div id={box5.layout}>{box5.level}
                                    <div className="player1-div"></div>
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
