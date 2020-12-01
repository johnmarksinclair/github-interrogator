import React, { Component } from "react";
import "../App.css";

class ActivityChart extends Component {
    render() {
        let login = this.props.login;
        let chartSrc = `https://ghchart.rshah.org/${login}`;
        return <img src={chartSrc} />;
    }
}

export default ActivityChart;
