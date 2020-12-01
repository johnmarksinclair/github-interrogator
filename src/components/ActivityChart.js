import React, { Component } from "react";
import "../App.css";

class ActivityChart extends Component {
    render() {
        let login = this.props.login;
        let chartSrc = `https://ghchart.rshah.org/${login}`;
        return (
            <div className="chart-div">
                <p className="subtitle">Activity</p>
                <div className="centered-div">
                    <img src={chartSrc} alt="User not found" />
                </div>
            </div>
        );
    }
}

export default ActivityChart;
