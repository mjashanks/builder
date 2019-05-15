import App from './App.html';
import './assets/budibase-logo-only.png';
import './assets/budibase-logo-white.png';
import './assets/lato-latin-ext.woff2';
import './assets/lato-latin.woff2';
import './fonts.css';
import './global.css';

const app = new App({
	target: document.body
});

window.app = app;

export default app;