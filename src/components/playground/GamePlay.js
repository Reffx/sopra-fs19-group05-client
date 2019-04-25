import React from "react";
import "./GamePlay.css";
import Field from "../shared/models/Field";

const box1 =  new Field();
const box2 =  new Field();
const box3 =  new Field();

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

    alertMessage(){
        return this.state.alertText
    }

    changeLvl(box){
        box.layout = "level2";
        box.level = "2";
        this.setState(box);
        //this.setState({level: "1"});
      //  alert(this.state.clicked.layout);
     //   alert(this.state.clicked.layout);
      //  this.setState({clicked: box1});
       // box1.layout = "level1";
        // this.setState({level: "1"})
       // box1.level = this.state.level;
       // this.state.layout = "level1";
        }


    render() {
        return (
            <div class="fixedPixels-div">
            <div className="message-div">{this.alertMessage()}</div>
                <div className="mainHorizontally">
                    <div className="left"> left</div>
                    <div className="playField">
                        <div>
                            <div className="box white" id={box1.layout} onClick={() =>  { this.changeLvl(box1)}}>{box1.level}</div>
                            <div className="box black" id={box2.layout} onClick={() => { this.changeLvl(box2)}}>{box2.level}</div>
                            <div className="box white" id={box3.layout} onClick={() => { this.changeLvl(box3)}}>{box3.level}</div>
                            <div className="box black"></div>
                            <div className="box white"></div>
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
