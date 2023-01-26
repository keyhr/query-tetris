import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./style.scss";
import "./query.scss";

/** @ts-ignore */
request.html((_, div) => {
  div.innerHTML = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@800&display=swap" rel="stylesheet">
    <div id="root"></div>
  `;
  const i = document.getElementsByName("script") as NodeListOf<HTMLInputElement>;
  i[0].disabled = true;
  const container = document.getElementById("root") as HTMLElement;
  const root = createRoot(container);
  root.render(<App />);
}).run();
