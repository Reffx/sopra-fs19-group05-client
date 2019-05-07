import React from 'react';
import {NavLink} from "react-router-dom";


import "./Toolbar.css";
import {getDomain} from "../../helpers/getDomain";


function notLoggedIn() {
    if (localStorage.getItem("token") === null) {
        return true;
    } else {
        return false;
    }
}

function logout() {
    let curToken = localStorage.getItem("token");
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
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("gameID");
}

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div></div>
            <div className="toolbar_logo">
                <NavLink to="/"> Menu</NavLink>
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
                        }}><NavLink to="/landing" activeClassName="main-nav-active">Logout!</NavLink></li>
                    </ul>}

            </div>
        </nav>
    </header>
);


export default toolbar;