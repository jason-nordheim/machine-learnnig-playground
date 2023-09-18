import { ChartData, UnMountable } from "../common";
import { DataTableApp } from "./DataTableApp";
import { ScatterChartApp } from "./ScatterChartApp";

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

    this.table = new DataTableApp(this.appContainers.table, data);
    this.chart = new ScatterChartApp(this.appContainers.chart, data);

    this.rootContainer.appendChild(this.appContainers.table);
    this.rootContainer.appendChild(this.appContainers.chart);
  }

  private setRootContainerStyles() {
    (this.rootContainer as HTMLDivElement).style.display = "grid";
    (this.rootContainer as HTMLDivElement).style.gridTemplateColumns = `repeat(2, 1fr)`;
  }

  unmount() {
    this.table.unmount();
    this.chart.unmount();
  }
}
