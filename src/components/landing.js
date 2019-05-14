import React from "react";
import {withRouter} from "react-router-dom";
import Toolbar from './Toolbar/Toolbar';

import "./landing.css";
import styled from "styled-components";


export const Button = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 10px;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 45px;
  width: 150px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
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
                            <Button onClick={() => {
                                this.props.history.push("/chooseMode");
                            }}>Let's Play</Button>
                            <Button className="spacer">Rules</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Landing);
