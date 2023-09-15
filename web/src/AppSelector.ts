import { DataCreatorApp } from "./DataCreatorApp";
import { DataViewerApp } from "./DataViewerApp";

export class AppSelector {
  private container: Element;
  private appListContainerRef: HTMLUListElement;

  private dataViewerContainer: HTMLDivElement;
  private dataCreatorContainer: HTMLDivElement;

  private viewerBtn: HTMLLIElement;
  private creatorBtn: HTMLLIElement;

  private dataCreator?: DataCreatorApp;
  private dataViewer?: DataViewerApp;

  private dataCreatorId = "data-creator";
  private dataViewerId = "data-viewer";

  constructor(container: Element) {
    this.container = container;

    this.dataViewerContainer = document.createElement("div");
    this.dataViewerContainer.id = this.dataCreatorId;
    this.dataCreatorContainer = document.createElement("div");
    this.dataCreatorContainer.id = this.dataCreatorId;

    // setup app list
    this.appListContainerRef = document.createElement("ul");

    this.viewerBtn = document.createElement("li");
    this.viewerBtn.innerText = "View data";
    this.appListContainerRef.appendChild(this.viewerBtn);

    this.creatorBtn = document.createElement("li");
    this.creatorBtn.innerText = "Create data";
    this.appListContainerRef.appendChild(this.creatorBtn);

    this.container.appendChild(this.appListContainerRef);

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.creatorBtn.onclick = () => {
      if (this.container.querySelector(`#${this.dataViewerId}`)) {
        this.container.removeChild(this.dataViewerContainer);
      }
      this.container.appendChild(this.dataCreatorContainer);
      this.dataCreator = new DataCreatorApp(this.dataCreatorContainer);
    };

    this.viewerBtn.onclick = () => {
      if (this.container.querySelector(`#${this.dataCreatorId}`)) {
        this.container.removeChild(this.dataCreatorContainer);
      }
      this.container.appendChild(this.dataViewerContainer);
      this.dataViewer = new DataViewerApp(this.dataViewerContainer);
    };
  }
}
