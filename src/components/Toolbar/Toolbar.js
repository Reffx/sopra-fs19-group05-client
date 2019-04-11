import React from 'react';
import {NavLink} from "react-router-dom";
import "./Toolbar.css";

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div></div>
            <div className="toolbar_logo">
                <NavLink to="/"> The Logo</NavLink>
            </div>
            <div className="spacer"/>
            <div className="toolbar_navigation-items">
            <ul>
            <li><NavLink to="/login" className="main-nav" activeClassName="main-nav-active">Login</NavLink></li>
            <li><NavLink to="/register" activeClassName={"active"}>Sign Up</NavLink></li>
            </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;