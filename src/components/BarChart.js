import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "../App.css";

function BarChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        // remove current chart
        d3.selectAll("svg > *").remove();
        // init variables
        let barWidth = 60;
        let spacer = 5;
        let svgWidth = 800;
        let svgHeight = 400;
        //let margin = { top: 20, right: 20, bottom: 30, left: 40 };
        let margin = { top: 20, right: 20, bottom: 30, left: 50 };
        let width = svgWidth - margin.left - margin.right;
        let height = svgHeight - margin.top - margin.bottom;

        // format data
        let sourceNames = [];
        let sourceValues = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                sourceNames.push(key);
                sourceValues.push(data[key]);
            }
        }
        //console.log(sourceNames);
        //console.log(sourceValues);
        let spacerArr = [];
        for (var i = 0; i < sourceNames.length; i++) {
            if (i == sourceNames.length - 1) spacerArr.push(0);
            else spacerArr.push(spacer);
        }

        // init axes
        let x = d3
            .scaleBand()
            .rangeRound([0, (barWidth + spacer) * sourceNames.length]);
        let y = d3.scaleLinear().rangeRound([height, 0]);

        x.domain(sourceNames);
        y.domain([
            0,
            d3.max(sourceValues, function (d) {
                return d;
            }),
        ]);

        let svg = d3.select(ref.current).append("svg");
        //svg.attr("viewBox", [0, 0, svgWidth, svgHeight]);
        svg.attr("height", svgHeight).attr("width", svgWidth);

        svg = svg
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // svg.append("g")
        //     .attr("class", "axis axis--y")
        //     .call(d3.axisLeft(y).ticks(5));

        // Create rectangles
        let bars = svg.selectAll(".bar").data(sourceNames).enter().append("g");
        //console.log(bars);

        bars.append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d);
            })
            .attr("y", function (d) {
                return y(data[d]);
            })
            .attr("width", barWidth)
            .attr("height", 0)
            .attr("fill", "lightblue")
            .transition()
            .duration(600)
            .attr("height", (d) => height - y(data[d]));

        bars.append("text")
            .text(function (d) {
                return data[d];
            })
            .attr("x", function (d) {
                return x(d) + barWidth / 2;
            })
            .attr("y", function (d) {
                return y(data[d]) - spacer;
            })
            .attr("font-family", "Courier New")
            .attr("font-size", "14px")
            .attr("fill", "black")
            .attr("text-anchor", "middle");
    };

    return (
        <div className="chart">
            <svg ref={ref} viewBox="0 0 1000 1000"></svg>
        </div>
    );
}

export default BarChart;
