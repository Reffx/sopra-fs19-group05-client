import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { withRouter } from "react-router-dom";
import "./player_colors.css"
import "./lobby_rectangles.css"

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class LobbyOverview extends React.Component {
    render() {
        return (
            <div class="container">

                <div class="first-box">
                    <p>Choose your color:</p>
                    <div class="circle_red"></div>
                <div class="circle_blue"></div>
                <div class="circle_yellow"></div>
                <div class="circle_pink"></div>
                </div>
                <div class="second-box">
                    <p>Choose your color:</p>
                    <div class="circle_red"></div>
                    <div class="circle_blue"></div>
                    <div class="circle_yellow"></div>
                    <div class="circle_pink"></div>
                </div>
            </div>
        );

    }
}

export default withRouter(LobbyOverview);
