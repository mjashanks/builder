import App from './App.html';
import store from "./builderStore/index.js";
import '../assets/budibase-logo.png';
import '../assets/budibase-logo-white.png';
import '../assets/lato-latin-ext.woff2';
import '../assets/lato-latin.woff2';
import './fonts.css';
import './global.css';

const app = new App({
	target: document.body,
	store:store
});

window.app = app;
window.store = store;

export default app;