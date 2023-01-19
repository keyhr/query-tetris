import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

/** @ts-ignore */
request.html((_, div) => {
  div.innerHTML = `
    <div id="app"></div>
  `;
  ReactDOM.render(<App/>, document.querySelector("#app"));
}).run();
