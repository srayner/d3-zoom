import React from "react";
import ScatterPlot from "./scatter-plot";
import * as d3 from "d3";

const random = d3.randomNormal(5, 1);

function myDelta() {
  return (-d3.event.deltaY * (d3.event.deltaMode ? 120 : 1)) / 100;
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: d3.range(200).map(_ => [random(), random()]),
      zoomTransform: null
    };
    this.zoom = d3
      .zoom()
      .scaleExtent([-5, 5])
      .translateExtent([[-100, -100], [props.width + 100, props.height + 100]])
      .extent([[-100, -100], [props.width + 100, props.height + 100]])
      .wheelDelta(myDelta)
      .on("zoom", this.zoomed.bind(this));
  }

  componentDidMount() {
    d3.select(this.refs.svg).call(this.zoom);
  }

  componentDidUpdate() {
    d3.select(this.refs.svg).call(this.zoom);
  }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform
    });
  }

  render() {
    const { zoomTransform } = this.state,
      { width, height } = this.props;

    return (
      <svg width={width} height={height} ref="svg">
        <ScatterPlot
          data={this.state.data}
          x={0}
          y={0}
          width={width / 2}
          height={height}
          zoomTransform={zoomTransform}
          zoomType="scale"
        />
        <ScatterPlot
          data={this.state.data}
          x={width / 2}
          y={0}
          width={width / 2}
          height={height}
          zoomTransform={zoomTransform}
          zoomType="detail"
        />
      </svg>
    );
  }
}

export default Chart;
