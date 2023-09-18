import { ChartData } from "../common";
import { AppBase } from "./App.Base";
import { ScatterChartOptions, ScatterChartVisualizer } from "./components/ScatterChartVisualizer";

export class ScatterChartApp extends AppBase {
  private inputRef: HTMLInputElement;
  private data?: [];

  private chartContainer?: HTMLDivElement;
  private chart?: ScatterChartVisualizer;

  constructor(container: Element, data: ChartData) {
    super(container, "Scatter Chart");
    this.chartContainer = document.createElement("div");
    this.chartContainer.style.position = "fixed";
    this.chartContainer.style.left = "33%";
    this.chartContainer.style.top = "30%";
    const options: ScatterChartOptions = {
      labels: { x: "km", y: "price" },
      size: 400,
    };
    this.container.appendChild(this.chartContainer);
    this.chart = new ScatterChartVisualizer(this.chartContainer, data, options);

    // // upload input
    // this.inputRef = document.createElement("input");
    // this.inputRef.type = "file";
    // this.inputRef.accept = ".json";
    // this.inputRef.addEventListener("change", (evt) => {
    //   // @ts-ignore
    //   if (!evt.target?.files[0]) {
    //     return;
    //   }
    //   const fr = new FileReader();
    //   fr.onload = async () => {
    //     const jsonData = await fr.result?.toString()!;
    //     const jsonObjects = JSON.parse(jsonData);
    //     this.initializeChart(jsonObjects);
    //   };
    //   // @ts-ignore
    //   fr.readAsText(evt.target.files[0]);
    // });
    // // add to the dom
    // this.container.appendChild(this.inputRef);
  }
}
