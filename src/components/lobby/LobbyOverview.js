
import React from "react";
import { withRouter } from "react-router-dom";
import "./player_colors.css"
import "./lobby_rectangles.css"



/*TODO: localstorage.setPlayerColor("playercolor", "red") --> fetch method ("PUT") the body should contain  */
class LobbyOverview extends React.Component {

    render() {
        return (
            <div class="containerLobby">

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
