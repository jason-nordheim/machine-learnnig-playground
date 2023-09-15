import { AppSelector } from "./AppSelector";
import { DataCreatorApp } from "./DataCreatorApp";

export type SessionData = {
  name?: string;
  sessionId?: number;
  drawings?: { [k: string]: number[][][] };
};

const appSelectorContainer = document.querySelector("#app-selector");
if (!appSelectorContainer) {
  throw new Error("Cannot find app-selector container");
}
const appSelector = new AppSelector(appSelectorContainer);
