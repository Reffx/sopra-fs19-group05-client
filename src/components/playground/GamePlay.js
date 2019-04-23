import React from "react";
import {Route, withRouter} from "react-router-dom";
import GameRouter from "../shared/routers/GameRouter";
import "./GamePlay.css";

const board = (
    <div class="playField">
        <div className="box-1 box black">hey</div>
        <div className="box-2 box white"></div>
        <div className="box-3 box black"></div>
        <div className="box-4 box white"></div>
        <div className="box-5 box black"></div>
        <div className="box-6 box white"></div>
        <div className="box-7 box black"></div>
        <div className="box-8 box white"></div>
        <div className="box-9 box black"></div>
        <div className="box-10 box white"></div>
        <div className="box-11 box black"></div>
        <div className="box-12 box white"></div>
        <div className="box-13 box black"></div>
        <div className="box-14 box white"></div>
        <div className="box-15 box black"></div>
        <div className="box-16 box white"></div>
        <div className="box-17 box black"></div>
        <div className="box-18 box white"></div>
        <div className="box-19 box black"></div>
        <div className="box-20 box white"></div>
        <div className="box-21 box black"></div>
        <div className="box-22 box white"></div>
        <div className="box-23 box black"></div>
        <div className="box-24 box white"></div>
        <div className="box-25 box black"></div>
    </div>
);

class GamePlay extends React.Component {


    render() {
        return (
            <div>my game</div>,
            board
     )

    }
}

export default GamePlay;
