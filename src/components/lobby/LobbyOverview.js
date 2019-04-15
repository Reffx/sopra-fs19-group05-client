import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { withRouter } from "react-router-dom";
import "./LobbyOverview.css";

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
            <div className="container">
                <div> left left left</div>
                <div> right right right</div>
            </div>
        );

    }
}

export default withRouter(LobbyOverview);
