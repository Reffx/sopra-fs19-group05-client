import React from "react";
import styled from "styled-components";
import {Route} from "react-router-dom";
import GamePlay from "../../playground/GamePlay";
import WaitingRoom from "../../lobby/LobbyOverview";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
    render() {
        /**
         * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
         */
        return (
            <Container>

                <Route
                    exact path="/game/:id/gamePlay"
                    render={() => (
                        <GamePlay base={"/game/gamePlay"}/>
                    )}
                />
                <Route
                    exact path="/game/:id"
                    render={() => (
                        <WaitingRoom/>
                    )}
                />
            </Container>
        );
    }
}

/*
* Don't forget to export your component!
 */
export default GameRouter;
