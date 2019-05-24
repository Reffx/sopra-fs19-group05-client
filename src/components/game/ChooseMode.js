import React from "react";
import {withRouter} from "react-router-dom";

import "../landing.css";
import styled from "styled-components";

import Toolbar from '../Toolbar/Toolbar';
import "./choose_mode.css";


export const Button = styled.button`
  &:hover {
    transform: translateY(-3px);
  }
  padding: 10px;
  width: ${props => props.width || null};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  
`;

class ChooseMode extends React.Component {

    render() {
        return (
            <div>
                <Toolbar/>
                <main style={{marginTop: '64px'}}>
                </main>
                <div className="container">
                    <div className="leftPart-chooseMode">
                        <div className="left-picture-overview-choose">
                        </div>
                    </div>
                    <div className="rightPart-chooseMode">
                        <div>
                            <div>
                                <Button className="rock-button"
                                        width="60%"
                                        onClick={() => {
                                            if (sessionStorage.getItem("token") !== null) {
                                                this.props.history.push(`/normalModeLobby`);
                                            } else {
                                                this.props.history.push(`/login`)
                                            }
                                        }}
                                >
                                    Normal Mode
                                </Button>
                            </div>
                            <div id="button-div">
                                <Button className="rock-button"
                                        width="50%"
                                        onClick={() => {
                                            if (sessionStorage.getItem("token") !== null) {
                                                this.props.history.push(`/godModeLobby`);
                                            } else {
                                                this.props.history.push(`/login`)
                                            }
                                        }}
                                >
                                    God Mode
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ChooseMode);
