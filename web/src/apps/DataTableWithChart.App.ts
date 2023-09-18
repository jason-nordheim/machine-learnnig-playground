import { ChartData, ExtendedPoint, UnMountable } from "../common";
import { DataTableApp } from "./DataTableApp";
import { ScatterChartApp } from "./ScatterChartApp";
import { ScatterChartOptions } from "./components/ScatterChartVisualizer";

const opts: ScatterChartOptions = {
  labels: { x: "km", y: "price" },
  size: 400,
};

export class DataTableWithChart implements UnMountable {
  private rootContainer: Element;
  private appContainers: { table: HTMLDivElement; chart: HTMLDivElement };
  private table: DataTableApp;
  private chart: ScatterChartApp;

  constructor(container: Element, data: ChartData) {
    this.rootContainer = container;
    this.setRootContainerStyles();

    const tableContainer = document.createElement("div");
    const chartContainer = document.createElement("div");

    this.appContainers = { chart: chartContainer, table: tableContainer };

    const onSelectSample = (sample?: ExtendedPoint, scrollIntoView = false) => {
      const currentlyEmphasized = document.querySelectorAll(".emphasize");
      currentlyEmphasized.forEach((ele) => ele.classList.remove("emphasize"));

      if (!sample) return;

      const element = document.getElementById(`sample_${sample.id}`);
      element?.classList.add("emphasize");

      if (scrollIntoView) {
        element?.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      }

      if (!this.chart) return;

      this.chart.selectSample(sample);
    };

    this.table = new DataTableApp(this.appContainers.table, data, { onClickItem: onSelectSample });
    this.chart = new ScatterChartApp(this.appContainers.chart, data, { ...opts, onClickItem: onSelectSample });

    this.rootContainer.appendChild(this.appContainers.table);
    this.rootContainer.appendChild(this.appContainers.chart);
  }

  private setRootContainerStyles() {
    (this.rootContainer as HTMLDivElement).style.display = "grid";
    (this.rootContainer as HTMLDivElement).style.gridTemplateColumns = `30% 70%`;
  }

  unmount() {
    this.table.unmount();
    this.chart.unmount();
  }
}
