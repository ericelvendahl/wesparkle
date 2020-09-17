import React, { Component } from "react";
import { connect } from "react-redux";
import {
  XYPlot,
  VerticalBarSeriesCanvas,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";

// sample data
const data = [
  { x: "9/6", y: 728 },
  { x: "9/7", y: 905 },
  { x: "9/8", y: 1024 },
  { x: "9/9", y: 829 },
  { x: "9/10", y: 931 },
  { x: "9/11", y: 1027 },
  { x: "9/12", y: 1126 },
  { x: "9/13", y: 913 },
  { x: "9/14", y: 512 },
  { x: "9/15", y: 340 },
];

class GraphOne extends Component {
  componentDidMount() {
    // Scroll to top
    window.scrollTo(0, 0);
  }

  render() {
    // react-vis for graph documentation
    return (
      <>
        <XYPlot xType={'ordinal'} height={500} width={380}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeriesCanvas data={data} color={'#0c1466ff'} />
        </XYPlot>
      </>
    ); // end return
  } // end render
} // end class

export default connect()(GraphOne);
