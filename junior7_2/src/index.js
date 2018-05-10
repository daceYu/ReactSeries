/*!
 * entry
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {dataChange} from './redux/reducer';
// import CREATOR from './redux/actionCreator';

import './common/js/lib/flexible.min.js';
import './index.less';

import App from './todoWrap/index';
import registerServiceWorker from './registerServiceWorker';


let store = createStore(dataChange, compose(applyMiddleware(thunk), 
	window.devToolsExtension ? window.devToolsExtension() : () => {}));

ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	), 
	document.getElementById('root')
);
registerServiceWorker();
