import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Base from './components/Base';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Base />, document.getElementById('root'));
registerServiceWorker();
