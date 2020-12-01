import React, { Component } from "react";
import "../App.css";
import BarChart from "../components/BarChart";

class Nav extends Component {
    render() {
        return (
            <div>
                <p className="title">Language Usage</p>
                <p className="subtitle">Values in lines of code</p>
                <BarChart data={this.props.langs} />
                <p>
                    Select another repo from the list to see its language info
                </p>
            </div>
        );
    }
}

export default Nav;
