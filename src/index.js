import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(<App title={title} />, document.getElementById('app'));

if (module.hot && module.hot.accept) module.hot.accept();
