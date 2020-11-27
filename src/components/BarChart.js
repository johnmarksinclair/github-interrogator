import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function BarChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        d3.selectAll("svg > *").remove();
        // init variables
        let barWidth = 60;
        let labelHeight = 5;
        let svgWidth = 800;
        let svgHeight = 600;
        //let margin = { top: 20, right: 20, bottom: 30, left: 40 };
        let margin = { top: 20, right: 20, bottom: 30, left: 50 };
        let width = svgWidth - margin.left - margin.right;
        let height = svgHeight - margin.top - margin.bottom;

        // init axes
        let x = d3.scaleBand().rangeRound([0, width]);
        let y = d3.scaleLinear().rangeRound([height, 0]);

        // format data
        let sourceNames = [];
        let sourceValues = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                sourceNames.push(key);
                sourceValues.push(data[key]);
            }
        }
        console.log(sourceNames);
        console.log(sourceValues);

        x.domain(sourceNames);
        y.domain([
            0,
            d3.max(sourceValues, function (d) {
                return d;
            }),
        ]);

        let svg = d3.select(ref.current).append("svg");

        svg.attr("height", height).attr("width", width);

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

        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(5));

        // Create rectangles
        let bars = svg.selectAll(".bar").data(sourceNames).enter().append("g");
        //console.log(bars);

        bars.append("rect")
            .attr("class", "bar")
            .attr("x", function (d, i) {
                return x(d);
            })
            .attr("y", function (d) {
                return y(data[d]);
            })
            .attr("width", barWidth)
            .attr("height", 0)
            .attr("fill", "lightblue")
            .transition()
            .duration(300)
            .attr("height", function (d) {
                return height - y(data[d]);
            });

        bars.append("text")
            .text(function (d) {
                return data[d];
            })
            .attr("x", function (d) {
                return x(d) + barWidth / 2;
            })
            .attr("y", function (d) {
                return y(data[d]) - labelHeight;
            })
            .attr("font-family", "Courier New")
            .attr("font-size", "14px")
            .attr("fill", "black")
            .attr("text-anchor", "middle");

        //////////////////////////////////////
        // const svg = d3
        //     .select(ref.current)
        //     .style("background-color", "white")
        //     .style("padding", 10)
        //     .style("margin-left", 50);

        // const yScale = d3
        //     .scaleLinear()
        //     .domain([0, d3.max(data)])
        //     .range([0, height - 10]);

        // svg.selectAll("rect")
        //     .data(data)
        //     .enter()
        //     .append("rect")
        //     .attr("x", (d, i) => i * 45) // move x axis value 70 units for every data point
        //     .attr("y", (d) => height) // y axis is being scaled by 10
        //     .attr("width", 40) // with of bars is 5 less to give a space
        //     .attr("height", 0)
        //     .attr("fill", "blue")
        //     .transition()
        //     .duration(300)
        //     .attr("height", (d) => yScale(d))
        //     .attr("y", (d) => height - yScale(d));
    };

    return (
        <div className="chart">
            <svg ref={ref}></svg>
        </div>
    );
}

export default BarChart;
