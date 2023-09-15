export class DataViewerApp {
  private container: Element;
  constructor(container: Element) {
    this.container = container;

    const title = document.createElement("h1");
    title.style.display = "flex";
    title.style.justifyContent = "center";
    title.innerText = "Data Viewer";
    this.container.appendChild(title);

    this.container.appendChild(title);
  }
}
