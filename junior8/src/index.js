/*!
 * entry
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware/*, compose*/} from './myReduxReseries/redux/redux';
import {thunk, log} from './myReduxReseries/middleware/index';
import {Provider} from './myReduxReseries/react-redux/index';

import {dataChange} from './redux/reducer';
import {getDataAsync} from './redux/actionCreator';

import './common/js/lib/flexible.min.js';
import './index.less';

import App from './todoWrap/index';
import registerServiceWorker from './registerServiceWorker';


// let store = createStore(dataChange, compose(applyMiddleware(thunk), 
//	window.devToolsExtension ? window.devToolsExtension() : () => {}));
let store = createStore(dataChange, applyMiddleware(thunk, log));
store.dispatch(getDataAsync()); // 初始化，使用thunk异步获取数据

ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	), 
	document.getElementById('root')
);

registerServiceWorker();
