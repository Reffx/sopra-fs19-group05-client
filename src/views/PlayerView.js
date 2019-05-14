import React from "react";
import styled from "styled-components";
import "./players.css";


const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 25px;
`;

const PlayerStatus = styled.div`
  margin-left: auto;
  margin-right: 20px;
  font-weight: bold;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const PlayerView = ({user}) => {
    return (
        <Container className="background-player">
            <UserName>{user.username}</UserName>
            <PlayerStatus>{user.status} </PlayerStatus>
        </Container>
    );
};

export default PlayerView;
