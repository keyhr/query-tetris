import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { RotateSimulator } from "./dev-components/rotate-simulator";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
// root.render(<App />);
root.render(<RotateSimulator />);
