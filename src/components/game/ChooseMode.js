import React from "react";
import { withRouter } from "react-router-dom";

import "../landing.css";
import styled from "styled-components";

import Toolbar from '../Toolbar/Toolbar';


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
  width: 300px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;

class ChooseMode extends React.Component {

    render() {
        if (localStorage.getItem("token") !== null)
        {
            return (
                <div>
                    <Toolbar/>
                    <main style={{marginTop: '64px'}}>
                    </main>
                    <div className="container">
                        <div className="leftPart">
                            <div>
                                <img
                                    src="data:image/jpeg;base64,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"
                                    alt="W3Schools.com"/>
                            </div>
                        </div>
                        <div className="rightPart">
                            <div>
                                <Button
                                    width="60%"
                                    onClick={() => {
                                        this.props.history.push(`/normalModeLobby`);
                                    }}
                                >
                                    Normal Mode
                                </Button>
                                <Button
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