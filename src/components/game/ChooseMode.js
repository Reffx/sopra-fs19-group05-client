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
  font-weight: 700;
  width: ${props => props.width || null};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

class ChooseMode extends React.Component {

    render() {
        if (sessionStorage.getItem("token") !== null) {
            return (
                <div>
                    <Toolbar/>
                    <main style={{marginTop: '64px'}}>
                    </main>
                    <div className="container">
                        <div className="leftPart">
                            <div className="left-picture-overview">
                            </div>
                        </div>
                        <div className="rightPart">
                            <div>
                                <div>
                                <Button className="rock-button"
                                    width="60%"
                                    onClick={() => {
                                        this.props.history.push(`/normalModeLobby`);
                                    }}
                                >
                                    Normal Mode
                                </Button>
                                </div>
                                <div id="button-div">
                                <Button className="rock-button"
                                    width="50%"
                                    onClick={() => {
                                        this.props.history.push(`/godModeLobby`);
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
        } else {
            return (
                <div>
                    <p>not logged in</p>
                </div>
            )
        }
    }
}

export default withRouter(ChooseMode);
