import { AppBase } from "./App.Base";
import { SketchViewer } from "./SketchViewer";
import { CombinedData } from "./common";

export class DataViewerApp extends AppBase {
  private inputRef: HTMLInputElement;
  private rowContainerRef?: HTMLDivElement;

  private data: CombinedData[] = [];

  constructor(container: Element) {
    super(container, "Data Viewer");

    // upload input
    this.inputRef = document.createElement("input");
    this.inputRef.type = "file";
    this.inputRef.accept = ".json";
    this.inputRef.addEventListener("change", (evt) => {
      // @ts-ignore
      if (!evt.target?.files[0]) {
        return;
      }
      const fr = new FileReader();
      fr.onload = async () => {
        const jsonData = await fr.result?.toString()!;
        const jsonObjects = JSON.parse(jsonData);
        this.data = jsonObjects;
        this.makeRows();
      };
      // @ts-ignore
      fr.readAsText(evt.target.files[0]);
    });

    // add to the dom
    this.container.appendChild(this.inputRef);
  }

  private makeRows() {
    this.rowContainerRef = document.createElement("div");
    this.rowContainerRef.classList.add("row-container");
    for (let i = 0; i < this.data.length; i++) {
      const userId = this.data[i].student;
      const row = this.makeRow(userId, this.data[i].drawings);
      this.rowContainerRef.appendChild(row);
    }
    this.container.appendChild(this.rowContainerRef);
  }

  private makeRow(userId: string, samples: { [k: string]: number[][][] }) {
    const row = document.createElement("div");
    row.classList.add("row");

    const rowLabel = document.createElement("div");
    rowLabel.classList.add("row-label");
    rowLabel.innerText = userId;
    row.appendChild(rowLabel);

    const dataContainer = document.createElement("div");
    dataContainer.classList.add("row-data");
    row.appendChild(dataContainer);

    const entries = Object.entries(samples);
    for (let i = 0; i < entries.length; i++) {
      const [label, data] = entries[i];
      new SketchViewer(dataContainer, data, label);
    }

    return row;
  }
}
