import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { withRouter } from "react-router-dom";

import Toolbar from '../Toolbar/Toolbar';


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Games = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;


class NormalModeDashbord extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null
        };
    }


    componentDidMount() {
        fetch(`${getDomain()}/games/NORMAL`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async games => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 800));

                this.setState({ games });
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the games: " + err);
            });
    }

    render() {
        return (
            <Container>
                <Toolbar/>
                <h2>Dashboard!</h2>
                <p>Here you see all Normal Mode Games:</p>
                {!this.state.games ? (
                    <Spinner />
                ) : (
                    <div>
                        <Games>
                            {this.state.games.map(game => {
                                return (
                                    <PlayerContainer >
                                        <Player game={game} />
                                    </PlayerContainer>
                                );
                            })}
                        </Games>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(NormalModeDashbord);