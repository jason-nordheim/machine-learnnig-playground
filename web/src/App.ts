import { SketchPad } from "./SketchPad";
import { SessionData } from "./main";

export class App {
  private labels: string[] = ["car", "fish", "tree", "bicycle", "guitar", "pencil", "clock"];
  private root: Element;
  private instructions: HTMLSpanElement;
  private sketchPadContainerRef: HTMLDivElement;
  private inputContainerRef: HTMLDivElement;
  private inputRef: HTMLInputElement;
  private nextBtn: HTMLButtonElement;
  private sketchPad: SketchPad;
  private index: number = 0;

  private data: SessionData;

  constructor(root: Element) {
    this.data = {
      name: "",
      sessionId: undefined,
      drawings: {},
    };
    this.root = root;

    this.inputContainerRef = document.createElement("div");
    this.inputContainerRef.style.display = "flex";
    this.inputContainerRef.style.justifyContent = "center";
    this.inputContainerRef.style.gap = "5px";
    this.inputContainerRef.style.padding = "5px";

    this.inputRef = document.createElement("input");
    this.inputRef.type = "text";
    this.inputRef.placeholder = "type your name";

    this.nextBtn = document.createElement("button");
    this.nextBtn.textContent = "Start";
    this.nextBtn.onclick = this.createStartHandler();

    this.instructions = document.createElement("span");
    this.inputContainerRef.appendChild(this.instructions);

    this.sketchPadContainerRef = document.createElement("div");
    this.sketchPadContainerRef.style.visibility = "hidden";

    this.sketchPad = new SketchPad(this.sketchPadContainerRef);

    this.inputContainerRef.appendChild(this.inputRef);
    this.inputContainerRef.appendChild(this.nextBtn);

    this.root.appendChild(this.inputContainerRef);
    this.root.appendChild(this.sketchPadContainerRef);
  }

  private createStartHandler() {
    return () => {
      if (this.inputRef.value.length == 0 || this.inputRef.value === "") {
        alert("Please enter your name");
        return;
      }

      this.data.name = this.inputRef.value;
      this.inputRef.style.display = "none";
      this.sketchPadContainerRef.style.visibility = "visible";
      this.instructions.textContent = `Please draw a ${this.labels[this.index]}`;
      this.nextBtn.textContent = "Next";
      this.nextBtn.onclick = this.createNextEventHandler();
    };
  }

  private createNextEventHandler() {
    return () => {
      const paths = this.sketchPad.getPaths();
      if (paths.length < 1) {
        alert("Please draw something before proceeding");
        return;
      }

      if (!this.data.drawings) {
        throw new Error("Drawing data not initialized");
      }

      this.data.drawings[this.labels[this.index]] = paths;
      this.sketchPad.reset();

      if (this.index < this.labels.length - 1) {
        this.index++;
        this.instructions.textContent = `Please draw a ${this.labels[this.index]}`;
      } else {
        this.data.sessionId = new Date().getTime();
        this.sketchPadContainerRef.style.visibility = "hidden";
        this.instructions.textContent = "Thank you";
        this.nextBtn.textContent = "Save";
        this.nextBtn.onclick = this.createSaveEventHandler();
      }
    };
  }

  private createSaveEventHandler() {
    return () => {
      this.nextBtn.style.display = "none";
      this.instructions.textContent = `Take your downloaded file and place it alongside other data`;
      const fileName = `${this.data.sessionId}.json`;

      const anchor = document.createElement("a");
      anchor.style.display = "none";
      anchor.download = fileName;
      anchor.href = `data:text/plan;charset=utf-9,${encodeURIComponent(JSON.stringify(this.data))}`;

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };
  }
}
