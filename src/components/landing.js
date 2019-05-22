import React from "react";
import {withRouter} from "react-router-dom";
import Toolbar from './Toolbar/Toolbar';

import "./landing.css";
import styled from "styled-components";


export const Button = styled.button`
  &:hover {
    transform: translateY(-3px);
  }
  padding: 10px;
  width: ${props => props.width || null};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

class Landing extends React.Component {

    render() {
        return (
            <div className="background-landing">
                <Toolbar/>
                <main>
                </main>
                <div className="container">
                    <div className="leftPart">
                        <div className="title-img">
                        </div>
                    </div>
                    <div className="rightPart">
                        <div>
                            <div className="titleSantorini"></div>
                            <Button className="rock-button-landing-1" onClick={() => {
                                this.props.history.push("/chooseMode");
                            }}>Let's Play</Button>
                            <Button className="rock-button-landing-2 spacer" onClick={() => {
                                window.open("https://roxley.com/wp-content/uploads/2016/08/Santorini-Rulebook-Web-2016.08.14.pdf");
                            }}>Rules</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Landing);
