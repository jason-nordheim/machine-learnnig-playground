import { GenericData } from "../common";
import { AppBase } from "./App.Base";

export class DataTableApp extends AppBase {
  private data: GenericData[] = [];

  constructor(container: Element) {
    super(container, "Data Table");
  }

  initialize(data: GenericData[]) {
    this.data = data;
    const table = document.createElement("table");
  }
}
