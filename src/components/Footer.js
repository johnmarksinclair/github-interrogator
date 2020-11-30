import React, { Component } from "react";
import "../App.css";

class Footer extends Component {
    render() {
        return (
            <div className="my-footer">
                <p>
                    <strong>GitHub Interrogator</strong> by{" "}
                    <a href="https://github.com/johnmarksinclair">
                        John Sinclair
                    </a>
                </p>
            </div>
        );
    }
}

export default Footer;
