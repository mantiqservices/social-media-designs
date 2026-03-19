import './style.css';
import { POSTS } from './posts.js';
import { buildUI } from './ui.js';
import { initApp } from './app.js';

// Inject HTML shell into #app
buildUI();

// Boot app logic
initApp(POSTS);
