/*!
 * entry
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React from 'react';
import ReactDOM from 'react-dom';

// import {createStore, applyMiddleware, compose} from 'redux';
import {createStore, applyMiddleware} from './myReduxReseries/redux/redux';
// import thunk from 'redux-thunk';

// import { Provider } from 'react-redux';
import {Provider} from './myReduxReseries/react-redux/index';

import {dataChange} from './redux/reducer';

import './common/js/lib/flexible.min.js';
import './index.less';

import App from './todoWrap/index';
import registerServiceWorker from './registerServiceWorker';


// let store = createStore(dataChange, compose(applyMiddleware(thunk), 
// 	window.devToolsExtension ? window.devToolsExtension() : () => {}));

let store = createStore(dataChange, applyMiddleware(() => {
	//
	console.log(21);
}));

ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	), 
	document.getElementById('root')
);

registerServiceWorker();
