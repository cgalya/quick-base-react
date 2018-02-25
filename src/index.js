import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './assets/css/style.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
