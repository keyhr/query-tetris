import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./style.scss";
import "./query.scss";

/** @ts-ignore */
request.html((_, div) => {
  div.innerHTML = `
    <div id="root"></div>
  `;
  const i = document.getElementsByName("script") as NodeListOf<HTMLInputElement>;
  i[0].disabled = true;
  const container = document.getElementById("root") as HTMLElement;
  const root = createRoot(container);
  root.render(<App />);
}).run();
