import React from "react";
import {Route, withRouter} from "react-router-dom";
import GameRouter from "../shared/routers/GameRouter";
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
            <ul>
                <li className="white" className={getLevel()} >{level}</li>
                <li className="black" className={getLevel()} >{level}</li>
                <li className="box-11 box white"></li>
                <li className="box-16 box black"></li>
                <li className="box-21 box white"></li>
            </ul>
            <ul>
                    <li className="box-2 box black"></li>
                    <li className="box-7 box white"></li>
                    <li className="box-12 box black"></li>
                    <li className="box-17 box white"></li>
                    <li className="box-22 box black"></li>
            </ul>
            <ul>

                    <li className="box-3 box white"></li>
                    <li className="box-8 box black"></li>
                    <li className="box-13 box white"></li>
                    <li className="box-18 box black"></li>
                    <li className="box-23 box white"></li>
            </ul>
            <ul>

                    <li className="box-4 box black"></li>
                    <li className="box-9 box white"></li>
                    <li className="box-14 box black"></li>
                    <li className="box-19 box white"></li>
                    <li className="box-24 box black"></li>
            </ul>
            <ul>

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


    render() {
        return (
            board
     )

    }
}

export default GamePlay;
