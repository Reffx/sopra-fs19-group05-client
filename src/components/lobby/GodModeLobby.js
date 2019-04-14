import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
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
class GodModeLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    logout() {
        let curToken = localStorage.getItem("token");
        fetch(`${getDomain()}/users`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: curToken
            })
        })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }
    goBack(){
        this.props.history.push("/chooseMode");
    }

    componentDidMount() {
        fetch(`${getDomain()}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async users => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 800));

                this.setState({ users });
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }

    render() {
        return (
            <Container>
                <h2>God Mode Lobbys</h2>
                <p>Here you see all Lobbys for God Mode:</p>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer onClick={()=>(this.props.history.push({pathname:`/users/${user.id}`, state:user.id}))} key={user.id}>
                                        <Player user={user} />
                                    </PlayerContainer>
                                );
                            })}
                        </Users>
                        <Button
                            width="30%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Create Lobby
                        </Button>
                        <Button
                            width="30%"
                            onClick={() => {
                                this.goBack();
                            }}
                        >
                            Back
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(GodModeLobby);