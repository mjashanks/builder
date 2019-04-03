import App from './App.html';
import store from "./builderStore/index.js";
import '../assets/budibase-logo.png';
import './global.css'

const app = new App({
	target: document.body,
	store:store
});

window.app = app;
window.store = store;

export default app;