import App from "./App.svelte";
import "./global.css";
import "./fonts.css";
import "./assets/budibase-logo.png";
import "./assets/budibase-logo-only.png";
import "./electronInitialise";
import "uikit/dist/css/uikit.css";
import "uikit/dist/js/uikit.js";

const app = new App({
	target: document.getElementById("app")
});


