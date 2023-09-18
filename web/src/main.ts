import { AppSelector } from "./AppSelector";

const appSelectorContainer = document.querySelector("#app-selector");
if (!appSelectorContainer) {
  throw new Error("Cannot find app-selector container");
}
const appSelector = new AppSelector(appSelectorContainer, {
  dataCreator: true,
  dataViewer: true,
  tableWithChart: true,
  featureExplorer: false,
});
