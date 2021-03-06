import React from "react";
import styled from "styled-components";
import "./players.css";

const Container = styled.div`
  margin: 6px 0;
  width: 450px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;


const Player1tag = styled.div`
  margin-left: 30px;
  margin-right: 10px;
  font-weight: bold;
`;

const Size = styled.div`
  margin-left: auto;
  margin-right: 30px;
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
const GameView = ({ game }) => {
    return (
        <Container className="background-player">
            <Player1tag>Host: {game.player1.username}</Player1tag>
            <Size>Size: {game.size}</Size>
        </Container>
    );
};

export default GameView;