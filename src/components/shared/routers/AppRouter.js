import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Register from "../../login/Register";
import Profile from "../../login/Profile";
import Landing from "../../landing";
import ChooseMode from "../../game/ChooseMode";
import NormalModeLobby from "../../lobby/NormalModeLobby";
import GodModeLobby from "../../lobby/GodModeLobby";
import NormalModeDashboard from "../../lobby/NormalModeDashboard";
import GodModeDashboard from "../../lobby/GodModeDashboard";
import LobbyOverview from "../../lobby/LobbyOverview";
import GamePlay from "../../playground/GamePlay";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
              <Route
                  path="/chooseMode"
                  render={() => (
                          <ChooseMode base={"/chooseMode"} />
                  )}
              />
              <Route
                  path="/normalModeLobby"
                  render={() => (
                      <NormalModeLobby base={"/normalModeLobby"} />
                  )}
              />
              <Route
                  path="/normalModeDashboard"
                  render={() => (
                      <NormalModeDashboard base={"/normalModeDashboard"} />
                  )}
              />
              <Route
                  path="/game/:id"
                  exact render={() => (
                      <LobbyOverview base={"/lobbyOverview"} />
                  )}
              />
              <Route
                  path="/godModeLobby"
                  render={() => (
                      <GodModeLobby base={"/godModeLobby"} />
                  )}
              />
              <Route
                  path="/godModeDashboard"
                  render={() => (
                      <GodModeDashboard base={"/godModeDashboard"} />
                  )}
              />
              <Route
                  path="/game/lobbyOverview"
                  exact render={() => (
                      <LobbyOverview base={"/game/lobbyOverview"} />
                  )}
              />
              <Route
                  path="/game/gamePlay"
                  exact render={() => (
                      <GamePlay base={"/game/gamePlay"} />
                  )}
              />
              <Route
                  path="/register"
                  exact
                  render={() => (
                      <LoginGuard>
                          <Register />
                      </LoginGuard>
                  )}
              />
              <Route path="/" exact render={() => <Redirect to={"/landing"} />} />
              <Route
                  path="/landing"
                  exact
                  render={() => (
                          <Landing />
                  )}
              />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route path="/" exact render={() => <Redirect to={"/landing"} />} />
              <Route
                  path="/users/:username"
                  exact
                  render={(props)=>(
                      <Profile {...props}/>
                  )}/>
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
