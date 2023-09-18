import { DataCreatorApp } from "./DataCreatorApp";
import { DataViewerApp } from "./DataViewerApp";
import { FeaturesExplorerApp } from "./FeatureExplorerApp";

export class AppSelector {
  private container: Element;
  private appListContainerRef: HTMLUListElement;

  private dataViewerContainer: HTMLDivElement;
  private dataCreatorContainer: HTMLDivElement;
  private featuresExplorerContainer: HTMLDivElement;

  private viewerBtn: HTMLLIElement;
  private creatorBtn: HTMLLIElement;
  private featuresExplorerBtm: HTMLLIElement;

  private dataCreator?: DataCreatorApp;
  private dataViewer?: DataViewerApp;
  private featuresExplorer: FeaturesExplorerApp;

  private dataCreatorId = "data-creator";
  private dataViewerId = "data-viewer";
  private featuresExplorerId = "features-explorer";

  constructor(container: Element) {
    this.container = container;

    // containers
    this.dataViewerContainer = document.createElement("div");
    this.dataViewerContainer.id = this.dataCreatorId;
    this.dataCreatorContainer = document.createElement("div");
    this.dataCreatorContainer.id = this.dataCreatorId;
    this.featuresExplorerContainer = document.createElement("div");
    this.featuresExplorerContainer.id = this.featuresExplorerId;

    // setup app list
    this.appListContainerRef = document.createElement("ul");

    this.viewerBtn = document.createElement("li");
    this.viewerBtn.innerText = "View data";

    this.creatorBtn = document.createElement("li");
    this.creatorBtn.innerText = "Create data";

    this.featuresExplorerBtm = document.createElement("li");
    this.featuresExplorerBtm.innerText = "Feature Explorer";

    this.appListContainerRef.appendChild(this.featuresExplorerBtm);
    this.appListContainerRef.appendChild(this.viewerBtn);
    this.appListContainerRef.appendChild(this.creatorBtn);
    this.container.appendChild(this.appListContainerRef);

    this.setupEventListeners();
  }

  private clearApps() {
    const appIds = [this.dataCreatorId, this.dataViewerId, this.featuresExplorerId];
    appIds.forEach((appId) => {
      const element = this.container.querySelector(`#${appId}`);
      if (element && element instanceof HTMLDivElement) {
        while (element.hasChildNodes()) {
          element.removeChild(element.children[0]);
        }
        this.container.removeChild(element);
      }
    });
    console.log("apps cleared");
  }

  private setupEventListeners() {
    this.creatorBtn.onclick = () => {
      this.clearApps();
      this.container.appendChild(this.dataCreatorContainer);
      this.dataCreator = new DataCreatorApp(this.dataCreatorContainer);
    };

    this.viewerBtn.onclick = () => {
      this.clearApps();
      this.container.appendChild(this.dataViewerContainer);
      this.dataViewer = new DataViewerApp(this.dataViewerContainer);
    };

    this.featuresExplorerBtm.onclick = () => {
      this.clearApps();
      this.container.appendChild(this.featuresExplorerContainer);
      this.featuresExplorer = new FeaturesExplorerApp(this.featuresExplorerContainer);
    };
  }
}
