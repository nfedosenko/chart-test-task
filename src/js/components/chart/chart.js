import * as d3 from "d3";
import "./chart.css";

export class BarChart {
  // PRIVATE properties
  _svg;
  _groups;
  _rects;

  // PUBLIC properties
  parent;
  values = [];
  markers = [];

  /**
   *
   * @param {{values: Array, markers: Array}} data Contains array of values of chart segments and array of markers for a chart
   * @param {HTMLElement} parent
   */
  constructor(data, parent) {
    this._validateData(data);

    this.values = data.values;
    this.markers = data.markers;
    this.parent = parent;

    this.render();
  }

  /**
   * Initial render function, called on creating on new instance of BarChart
   */
  render() {
    const total = this.values.reduce((a, b) => a + b, 0);

    const rest = 100 - total;
    const dataset = rest > 0 ? [...this.values, rest] : this.values;

    this._renderSvg();
    this._renderGroups(dataset, rest);
    this._renderRects(dataset);
    this._renderMarkers();
  }

  /**
   * Renders the root svg element at the parent container
   * @private
   */
  _renderSvg() {
    this._svg = d3
      .select(this.parent)
      .append("svg")
      .attr("class", "chart-svg")
      .append("g")
      .attr("class", "data-container")
      .append("g")
      .attr("class", "markers-container");
  }

  /**
   * Renders colored groups from the dataset and gray group for the rest if values sum is less than 100
   * @param dataset
   * @param restForDataset
   * @private
   */
  _renderGroups(dataset, restForDataset) {
    const colors = [
      "rgb(58, 189, 174)",
      "rgb(74, 140, 219)",
      "rgb(245, 155, 66)",
      "rgb(95, 103, 114)",
      "rgb(76, 63, 130)"
    ];

    this._groups = this._svg
      .selectAll("g.data-container")
      .data(dataset)
      .enter()
      .append("g")
      .style("fill", function(d, i) {
        if (restForDataset > 0 && i === dataset.length - 1) {
          return "rgb(225, 231, 239)";
        } else {
          return colors[i];
        }
      });
  }

  /**
   * Renders data rects of chart due to dataset provided
   * @param dataset
   * @private
   */
  _renderRects(dataset) {
    let perc_so_far = 0;

    this._rects = this._groups
      .selectAll("rect")
      .data((d, i) => {
        return [dataset[i]];
      })
      .enter()
      .append("rect")
      .attr("y", 0)
      .attr("x", d => {
        const prev_perc = perc_so_far;
        const this_perc = 100 * (d / 100);
        perc_so_far = perc_so_far + this_perc;
        return prev_perc + "%";
      })
      .attr("width", d => `${d}%`)
      .attr("height", 30);
  }

  /**
   * Renders marker lines on the chart
   * @private
   */
  _renderMarkers() {
    this._svg
      .selectAll("g.markers-container")
      .data(this.markers)
      .enter()
      .append("rect")
      .attr("y", 0)
      .attr("x", d => `${d}%`)
      .attr("width", 3)
      .attr("height", 30)
      .style("fill", "rgb(0, 255, 227)");
  }

  /**
   * Validates input parameters at constructor
   * @param {{values: Array, markers: Array}} data
   * @private
   */
  _validateData(data) {
    if (data.markers.length > 2) {
      throw new Error("Only two markers can be displayed");
    }

    const valuesTotal = data.values.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    if (valuesTotal > 100) {
      throw new Error("Total sum of values provided should be <=100");
    }
  }
}
