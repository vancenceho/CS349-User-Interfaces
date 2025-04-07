/**
 * @import { render } from "preact";
 * @import { App } from "./app.tsx";
 * @description This is the main entry point for the Preact application. It renders the App component into the DOM.
 */
import { render } from "preact";
import { App } from "./app.tsx";

render(<App />, document.getElementById("app")!);
