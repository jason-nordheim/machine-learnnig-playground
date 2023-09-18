import { ChartData } from "../common";
import { generateMockCarData } from "../helpers/mockData";
import { AppBase } from "./App.Base";
import { ScatterChartVisualizer } from "./components/ScatterChartVisualizer";

export class FeaturesExplorerApp extends AppBase {
  private inputRef: HTMLInputElement;
  private data?: [];

  private chartContainer?: HTMLDivElement;
  private chart?: ScatterChartVisualizer;

  constructor(container: Element) {
    super(container, "Feature Explorer");

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
    const data = generateMockCarData(10000);
    this.initializeChart(data);
  }

  initializeChart(data: ChartData) {
    this.chartContainer = document.createElement("div");
    if (this.data) {
      this.chart = new ScatterChartVisualizer(this.chartContainer, data, {});
    }
    this.container.appendChild(this.chartContainer);
  }
}
