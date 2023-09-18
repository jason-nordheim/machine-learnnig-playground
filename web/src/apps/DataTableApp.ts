import { ChartData, PointWithId } from "../common";
import { AppBase } from "./App.Base";

const createTableCell = ({
  value,
  inside,
  type,
}: {
  value: string;
  inside?: HTMLElement;
  width?: number;
  type?: "id" | "data";
}) => {
  const element = document.createElement("span");
  element.innerText = value;
  if (type) {
    element.classList.add(type);
  }
  if (inside) {
    inside.appendChild(element);
  }
  return element;
};

const DEFAULTS = {
  size: {
    row: {
      id: 20,
      data: 70,
    },
  },
};

export class DataTableApp extends AppBase {
  private data: PointWithId[] = [];
  private axisLabels?: { x: string; y: string };

  constructor(container: Element, data: ChartData) {
    super(container, "Data Table");

    this.data = data.points;
    this.axisLabels = data.axisLabels;

    const table = document.createElement("div");
    table.classList.add("table");
    const headerRow = document.createElement("div");
    headerRow.classList.add("row");

    const idColumnSize = DEFAULTS.size.row.id;
    const dataColumnSize = DEFAULTS.size.row.data;

    createTableCell({ value: "id", inside: headerRow, type: "id" });
    createTableCell({ value: data.axisLabels.x, inside: headerRow, type: "data" });
    createTableCell({ value: data.axisLabels.y, inside: headerRow, type: "data" });
    table.appendChild(headerRow);

    for (let i = 0; i < this.data.length; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      createTableCell({ value: this.data[i].id, inside: row, type: "id" });
      const valueX = this.formatNumber(this.data[i].point[0], 2);
      const valueY = this.formatNumber(this.data[i].point[1], 2);
      createTableCell({ value: valueX.toString(), inside: row, type: "data" });
      createTableCell({ value: valueY.toString(), inside: row, type: "data" });
      table.appendChild(row);
    }

    this.container.appendChild(table);
  }

  formatNumber(num: number, decimals: number) {
    return num.toFixed(decimals);
  }
}
