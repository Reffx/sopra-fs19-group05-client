import React from 'react';
import {NavLink} from "react-router-dom";

import "./Toolbar.css";
import {getDomain} from "../../helpers/getDomain";



function notLoggedIn() {
    if (sessionStorage.getItem("token") === null) {
        return true;
    } else {
        return false;
    }
}

function logout() {
    let curToken = sessionStorage.getItem("token");
    fetch(`${getDomain()}/users`, {
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
    sessionStorage.removeItem("userID")
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("gameID");
}

const toolbar = props => (
    <header className="toolbar">
        <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
        </link>
        <nav className="toolbar_navigation">
            <div></div>
            <div className="toolbar_logo">
                <NavLink to="/home">Santori</NavLink>
            </div>
            <div className="spacer"/>
            <div className="toolbar_navigation-items">
                {notLoggedIn() ? (
                        <ul>
                            <li><NavLink to="/login" activeClassName="main-nav-active">Login</NavLink></li>
                            <li><NavLink to="/register" activeClassName="main-nav-active">Sign Up</NavLink></li>
                        </ul>) :
                    <ul>
                        <li><NavLink to="/dashboard" activeClassName="main-nav-active">Find Players</NavLink></li>
                        <li><NavLink to="/chooseMode" activeClassName="main-nav-active">Let's Play!</NavLink></li>
                        <li onClick={() => {
                            logout();
                        }}><NavLink to="/login" activeClassName="main-nav-active">Logout!</NavLink></li>
                    </ul>}

            </div>
        </nav>

    </header>

);


export default toolbar;