import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class Players extends React.Component {

    componentDidMount() {
        fetch(`${getDomain()}/players/${user.id}`, {
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

    render(){
        return (
            <Container>
                <h2>Dashboard!</h2>
                <p>Das ist die Players page</p>
            </Container>
        );
    }
}

export default withRouter(Players);
