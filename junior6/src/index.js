/*!
 * entry
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React from 'react';
import ReactDOM from 'react-dom';

import './common/js/lib/flexible.min.js';
import './index.less';

import App from './todoWrap/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App />, 
	document.getElementById('root')
);
registerServiceWorker();
