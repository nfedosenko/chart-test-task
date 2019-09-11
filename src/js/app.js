import { BarChart } from "./components/chart/chart";
import { generateRandomData } from "./utils/random";

class App {
  static initCharts() {
    const chartContainers = [...document.querySelectorAll(".chart-container")];

    return chartContainers.map(container => {
      const data = generateRandomData();

      return new BarChart(data, container);
    });
  }

  static start() {
    console.log("App is up and running");
    const charts = App.initCharts();
    console.log(charts);
  }
}

App.start();
