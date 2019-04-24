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
                <li className="gamePlay-li white" className={getLevel()} >{level}</li>
                <li className="gamePlay-li black" className={getLevel()} >{level}</li>
                <li className="gamePlay-li box-11 box white"></li>
                <li className="gamePlay-li box-16 box black"></li>
                <li className="gamePlay-li box-21 box white"></li>
            </ul>
            <ul className="gamePlay-ul">
                    <li className="gamePlay-li box-2 box black"></li>
                    <li className="gamePlay-li box-7 box white"></li>
                    <li className="gamePlay-li box-12 box black"></li>
                    <li className="gamePlay-li box-17 box white"></li>
                    <li className="gamePlay-li box-22 box black"></li>
            </ul>
            <ul className="gamePlay-ul">

                    <li className="gamePlay-li box-3 box white"></li>
                    <li className="gamePlay-li box-8 box black"></li>
                    <li className="gamePlay-li box-13 box white"></li>
                    <li className="gamePlay-li box-18 box black"></li>
                    <li className="gamePlay-li box-23 box white"></li>
            </ul>
            <ul className="gamePlay-ul">

                    <li className="gamePlay-li box-4 box black"></li>
                    <li className="gamePlay-li box-9 box white"></li>
                    <li className="gamePlay-li box-14 box black"></li>
                    <li className="gamePlay-li box-19 box white"></li>
                    <li className="gamePlay-li box-24 box black"></li>
            </ul>
            <ul className="gamePlay-ul">
                    <li className="gamePlay-li box-5 box white"></li>
                    <li className="gamePlay-li box-10 box black"></li>
                    <li className="gamePlay-li box-15 box white"></li>
                    <li className="gamePlay-li box-20 box black"></li>
                    <li className="gamePlay-li box-25 box white"></li>
            </ul>
    </div>
            <div className="right">right</div>
    </div>
);

class GamePlay extends React.Component {


    render() {
        return (
            board
     )

    }
}

export default GamePlay;
