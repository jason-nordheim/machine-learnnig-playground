import { App } from "./App";

export type SessionData = {
  name?: string;
  sessionId?: number;
  drawings?: { [k: string]: number[][][] };
};

const container = document.querySelector("#app");
if (!container) {
  throw new Error("Cannot find sketch pad container");
}

const sketchPad = new App(container);
