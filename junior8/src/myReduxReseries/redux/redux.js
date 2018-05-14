/*!
 * Redux.js
 * @Author: daceyu <daceyu@aliyun.com> 
 */

/**
 * createStore
 * @param  {[type]} reducer  [description]
 * @param  {[type]} enhancer [description]
 * @return {Object}
 */
let createStore = (reducer, enhancer) => {
	if (enhancer) {
		console.log(enhancer);
	}

	let currentState,
		currentListeners = [];

	let getState = () => {
		return currentState;
	}

	let subscribe = (listener) => {
		currentListeners.push(listener);
		// 取消监听
		return () => {
			currentListeners = currentListeners.filter((item) => {
				return item !== listener;
			})
		}
	}

	let dispatch = (action) => {
		currentState = reducer(currentState, action);
		currentListeners.forEach( (listener) => { listener() })
		return action;
	}

	// 初始化reducer，命中default state
	dispatch({ type: "@@DACEYU" })

	return {
		getState,
		subscribe,
		dispatch
	}
}

/**
 * [description]
 * @param  {[type]} middleWare [description]
 * @return {[type]}            [description]
 */
let applyMiddleware = (middleware) => {
	// if ()
	middleware();
}

/**
 * bindActionCreator
 * @param  {creator} creators: ActionCreator
 * @param  {dispatch} dispatch: store.dispatch
 * @return {Object}
 */
let bindActionCreator = (creator, dispatch) => {
	return (...args) => {
		dispatch(creator(...args));
	}
}

/**
 * bindActionCreators
 * @param  {creators} creators: ActionCreators
 * @param  {dispatch} dispatch: store.dispatch
 * @return {Object}
 */
let bindActionCreators = (creators, dispatch) => {
	let bounds = {};
	Object.keys(creators).forEach( (k) => {
		let creator = creators[k];
		bounds[k] = bindActionCreator(creator, dispatch);
	})
	return bounds;
}

export {
	createStore,
	bindActionCreators,
	applyMiddleware
}
