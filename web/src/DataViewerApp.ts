import { SketchViewer } from "./SketchViewer";

const IMG_FILE_DIR = "../../data/dataset/img";

type GroupedSampleData = {
  id: number;
  label: string;
  student_name: string;
};

type CombinedData = {
  session: number;
  student: string;
  drawings: {
    [k: string]: number[][][];
  };
};

export class DataViewerApp {
  private container: Element;
  private inputRef: HTMLInputElement;

  private data: CombinedData[] = [];

  constructor(container: Element) {
    this.container = container;

    // title
    const title = document.createElement("h1");
    title.style.display = "flex";
    title.style.justifyContent = "center";
    title.innerText = "Data Viewer";
    this.container.appendChild(title);

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
    this.container.appendChild(title);
    this.container.appendChild(this.inputRef);
  }

  private makeRows() {
    for (let i = 0; i < this.data.length; i++) {
      const userId = this.data[i].student;
      const row = this.makeRow(userId, this.data[i].drawings);
      this.container.appendChild(row);
    }
  }

  private makeRow(userId: string, samples: { [k: string]: number[][][] }) {
    const row = document.createElement("div");
    row.classList.add("row");

    const rowLabel = document.createElement("div");
    rowLabel.classList.add("row-label");
    rowLabel.innerText = userId;
    row.appendChild(rowLabel);

    const entries = Object.entries(samples);
    for (let i = 0; i < entries.length; i++) {
      const [label, data] = entries[i];
      new SketchViewer(row, data);
    }

    return row;
  }
}
