import { ChartData, ExtendedPoint, onClickItemEventHandler } from "../common";
import { formatNumber } from "../helpers/math";
import { AppBase } from "./App.Base";

const createTableCell = ({ value, inside, type }: { value: string; inside?: HTMLElement; type?: "id" | "data" }) => {
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

type DataTableOptions = {
  onClickItem?: onClickItemEventHandler;
};

export class DataTableApp extends AppBase {
  private data: ExtendedPoint[] = [];

  constructor(container: Element, data: ChartData, options: DataTableOptions) {
    super(container, "Data Table");

    this.data = data.points;

    const table = document.createElement("div");
    table.classList.add("table");
    const headerRow = document.createElement("div");
    headerRow.classList.add("row");

    createTableCell({ value: "id", inside: headerRow, type: "id" });
    createTableCell({ value: data.axisLabels.x, inside: headerRow, type: "data" });
    createTableCell({ value: data.axisLabels.y, inside: headerRow, type: "data" });
    table.appendChild(headerRow);

    for (let i = 0; i < this.data.length; i++) {
      const row = document.createElement("div");
      row.id = `sample_${this.data[i].id}`;
      const { onClickItem } = options;
      if (onClickItem && typeof onClickItem == "function") {
        row.onclick = () => {
          onClickItem(this.data[i], false);
        };
      }

      row.classList.add("row");
      createTableCell({ value: this.data[i].id, inside: row, type: "id" });
      const valueX = formatNumber(this.data[i].point[0], 2);
      const valueY = formatNumber(this.data[i].point[1], 2);
      createTableCell({ value: valueX.toString(), inside: row, type: "data" });
      createTableCell({ value: valueY.toString(), inside: row, type: "data" });
      table.appendChild(row);
    }

    this.container.appendChild(table);
  }
}
