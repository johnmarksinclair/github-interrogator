import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <div className="nav-bar">
                <Link className="nav-header" to="/">
                    GitHub Interrogator
                </Link>
            </div>
        );
    }
}

export default Nav;
