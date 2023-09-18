import { DataCreatorApp } from "./apps/DataCreatorApp";
import { DataTableWithChart } from "./apps/DataTableWithChart.App";
import { DataViewerApp } from "./apps/DataViewerApp";
import { ScatterChartApp } from "./apps/ScatterChartApp";
import { UnMountable } from "./common";
import { generateMockCarData } from "./helpers/mockData";

type Features = "dataViewer" | "dataCreator" | "featureExplorer" | "tableWithChart";

type SelectedFeatures = {
  [k in Features]: boolean;
};

const FEATURES: SelectedFeatures = {
  dataViewer: true,
  dataCreator: true,
  featureExplorer: false,
  tableWithChart: true,
};

type FeatureIds = { [k in Features]: string };

const IDs: FeatureIds = {
  dataCreator: "data-creator",
  dataViewer: "data-viewer",
  featureExplorer: "features-explorer",
  tableWithChart: "table-with-chart",
};

const AppBtnText: FeatureIds = {
  dataViewer: "Data Viewer",
  dataCreator: "Data Creator",
  featureExplorer: "Feature Explorer",
  tableWithChart: "Table with Chart",
};

const mockData = generateMockCarData(1000);

export class AppSelector {
  private container: Element;
  private appListContainerRef: HTMLUListElement;

  private mountedApp?: UnMountable;

  constructor(container: Element, features: SelectedFeatures) {
    this.container = container;

    // setup app list
    this.appListContainerRef = document.createElement("ul");
    const entries = Object.entries(features);
    for (let [app, isEnabled] of entries) {
      if (isEnabled) {
        const application = app as Features;
        const text = AppBtnText[application];
        this.makeAppButton(this.appListContainerRef, application, text);
      }
    }

    this.container.appendChild(this.appListContainerRef);
  }

  private clearApps() {
    if (this.mountedApp) {
      this.mountedApp.unmount();
    }
  }

  private makeApp(appType: Features, container: HTMLDivElement) {
    switch (appType) {
      case "dataCreator":
        return new DataCreatorApp(container);
      case "dataViewer":
        return new DataViewerApp(container);
      case "featureExplorer":
        return new ScatterChartApp(container, mockData);
      case "tableWithChart":
        return new DataTableWithChart(container, mockData);
    }
  }

  private makeAppButton(container: Element, app: keyof SelectedFeatures, btnText: string) {
    const liButton = document.createElement("li");
    liButton.innerText = btnText;

    liButton.onclick = () => {
      this.clearApps();
      const appContainer = document.createElement("div");
      appContainer.id = IDs[app];
      this.container.appendChild(appContainer);
      this.mountedApp = this.makeApp(app, appContainer);
    };

    container.appendChild(liButton);
    return liButton;
  }
}
