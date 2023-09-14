const drawPath = (ctx: CanvasRenderingContext2D, path: number[][], color = "black") => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  const [x, y] = path[0];
  // console.log(`moving to: ${x},${y}`);
  ctx.moveTo(x, y);
  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i];
    // console.log(`creating line: ${x},${y}`);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
};

const drawPaths = (ctx: CanvasRenderingContext2D, paths: number[][][], color = "black") => {
  for (const path of paths) {
    drawPath(ctx, path);
  }
};

class SketchPad {
  private undoBtn: HTMLButtonElement;
  private canvas: HTMLCanvasElement;
  private paths: number[][][] = [];
  private isDrawing: boolean = false;

  constructor(container: Element, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style.backgroundColor = "white";
    this.canvas.style.boxShadow = `0px 0px 10px 2px black`;
    container.appendChild(this.canvas);

    const controls = document.createElement("div");
    container.appendChild(controls);

    this.undoBtn = document.createElement("button");
    this.undoBtn.innerHTML = "Undo";
    container.appendChild(this.undoBtn);

    this.ctx.scale(1, 1);

    this.reset();

    this.addEventListeners();
  }

  private get ctx() {
    return this.canvas.getContext("2d")!;
  }

  private reDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
    drawPaths(this.ctx, this.paths);
    if (this.paths.length > 0) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }
  }

  getPosition(evt: MouseEvent | TouchEvent): [number, number] {
    if (evt instanceof MouseEvent) {
      const { offsetX, offsetY } = evt;
      const x = Math.round(offsetX);
      const y = Math.round(offsetY);
      return [x, y];
    } else if (evt instanceof TouchEvent) {
      evt.preventDefault();
      const loc = evt.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.round(loc.clientX);
      const y = Math.round(loc.clientY - rect.top);
      return [x, y];
    }
    throw new Error("Unsupported event provided");
  }

  private makeStartPathEventHandler() {
    return (evt: MouseEvent | TouchEvent) => {
      const position = this.getPosition(evt);
      this.paths.push([position]);
      this.isDrawing = true;
    };
  }

  private makeDragPathEventHandler() {
    return (evt: MouseEvent | TouchEvent) => {
      if (this.isDrawing) {
        const position = this.getPosition(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(position);
        this.reDraw();
      }
    };
  }

  private makeDragEndEventHandler() {
    return (_: MouseEvent | TouchEvent) => {
      this.isDrawing = false;
    };
  }

  private makeUndoEventHandler() {
    return () => {
      this.paths.pop();
      this.reDraw();
    };
  }

  private addEventListeners() {
    this.canvas.onmousedown = this.makeStartPathEventHandler();
    this.canvas.onmousemove = this.makeDragPathEventHandler();
    document.onmouseup = this.makeDragEndEventHandler();
    this.canvas.ontouchstart = this.makeStartPathEventHandler();
    this.canvas.ontouchmove = this.makeDragPathEventHandler();
    document.ontouchend = this.makeDragEndEventHandler();

    this.undoBtn.onclick = this.makeUndoEventHandler();
  }

  public reset() {
    this.paths = [];
    this.isDrawing = false;
    this.reDraw();
  }

  public getPaths() {
    return this.paths;
  }
}

type SessionData = {
  name?: string;
  sessionId?: number;
  drawings?: { [k: string]: number[][][] };
};

class App {
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

const container = document.querySelector("#app");
if (!container) {
  throw new Error("Cannot find sketch pad container");
}

const sketchPad = new App(container);
