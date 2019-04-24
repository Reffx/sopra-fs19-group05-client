import React from "react";
import "./GamePlay.css";

const level = 1;
function getLevel(){
        if (box1 == null){
                return "level1";
        } else {
                return "level2";
        }

}

const box1 = "sdfds";
const box2 = null;

const board = (
    <div class="mainHorizontally">
    <div class="left"> left </div>
    <div class="playField">
            <ul className="gamePlay-ul">
                <div className="box white" id={getLevel()}>{level}</div>
                <div className="box black" id={getLevel()} >{level}</div>
                <div className="box-11 box white"></div>
                <div className="box-16 box black"></div>
                <div className="box-21 box white"></div>
            </ul>
            <ul className="gamePlay-ul">
                    <div className="box-2 box black"></div>
                    <div className="box-7 box white"></div>
                    <div className="box-12 box black"></div>
                    <div className="box-17 box white"></div>
                    <div className="box-22 box black"></div>
            </ul>
            <ul className="gamePlay-ul">

                    <div className="box-3 box white"></div>
                    <div className="box-8 box black"></div>
                    <div className="box-13 box white"></div>
                    <div className="box-18 box black"></div>
                    <div className="box-23 box white"></div>
            </ul>
            <ul className="gamePlay-ul">

                    <div className="box-4 box black"></div>
                    <div className="box-9 box white"></div>
                    <div className="box-14 box black"></div>
                    <div className="box-19 box white"></div>
                    <div className="box-24 box black"></div>
            </ul>
            <ul className="gamePlay-ul">
                    <li className="box-5 box white"></li>
                    <li className="box-10 box black"></li>
                    <li className="box-15 box white"></li>
                    <li className="box-20 box black"></li>
                    <li className="box-25 box white"></li>
            </ul>
    </div>
            <div className="right">right</div>
    </div>
);


class GamePlay extends React.Component {

    constructor() {
        super();
        this.state = {
            alertText: "This is a message."
        };
    }

    componentDidMount() {}
    alertMessage(){
        return this.state.alertText
    }


    render() {
        return (
            <div class="fixedPixels-div">
            <div className="message-div">{this.alertMessage()}</div>
                {board}
            </div>
     )

    }
}

export default GamePlay;
