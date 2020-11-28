import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "../App.css";

export default function LineChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        // remove current chart
        //d3.selectAll("svg > *").remove();
        // init variables

        // format data
        let dates = [];
        let values = [];

        console.log(data);

        for (let key in data) {
            console.log(key);
        }
    };

    return (
        <div className="line-chart">
            <svg ref={ref}></svg>
        </div>
    );
}
