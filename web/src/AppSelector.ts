import { AppBase } from "./apps/App.Base";
import { DataCreatorApp } from "./apps/DataCreatorApp";
import { DataViewerApp } from "./apps/DataViewerApp";
import { FeaturesExplorerApp } from "./apps/FeatureExplorerApp";

export class AppSelector {
  private container: Element;
  private appListContainerRef: HTMLUListElement;

  private dataViewerContainer: HTMLDivElement;
  private dataCreatorContainer: HTMLDivElement;
  private featuresExplorerContainer: HTMLDivElement;

  private viewerBtn: HTMLLIElement;
  private creatorBtn: HTMLLIElement;
  private featuresExplorerBtm: HTMLLIElement;

  private mountedApp?: AppBase;

  private dataCreatorId = "data-creator";
  private dataViewerId = "data-viewer";
  private featuresExplorerId = "features-explorer";

  constructor(container: Element) {
    this.container = container;

    // containers
    // data-viewer
    this.dataViewerContainer = document.createElement("div");
    this.dataViewerContainer.id = this.dataViewerId;
    // data-creator
    this.dataCreatorContainer = document.createElement("div");
    this.dataCreatorContainer.id = this.dataCreatorId;
    // data-explorer
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
    if (this.mountedApp) {
      this.mountedApp.unmount();
    }
  }

  private setupEventListeners() {
    this.creatorBtn.onclick = () => {
      this.clearApps();
      this.container.appendChild(this.dataCreatorContainer);
      this.mountedApp = new DataCreatorApp(this.dataCreatorContainer);
    };

    this.viewerBtn.onclick = () => {
      this.clearApps();
      this.container.appendChild(this.dataViewerContainer);
      this.mountedApp = new DataViewerApp(this.dataViewerContainer);
    };

    this.featuresExplorerBtm.onclick = () => {
      this.clearApps();
      this.container.appendChild(this.featuresExplorerContainer);
      this.mountedApp = new FeaturesExplorerApp(this.featuresExplorerContainer);
    };
  }
}
