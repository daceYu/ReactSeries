/*!
 * Redux.js
 * @Author: daceyu <daceyu@aliyun.com> 
 */

/**
 * createStore
 * @param  {[type]} reducer
 * @param  {[type]} enhancer: 使用applyMiddle组合的中间件
 * @return {Object}
 */
let createStore = (reducer, enhancer) => {
	if (enhancer && typeof enhancer === "function") {
		return enhancer(createStore)(reducer);
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
 * applyMiddleware
 * @param  {[type]} middlewares: 中间件s
 * @return {Object}
 */
let applyMiddleware = (...middlewares) => {
	// middleware => thunk
	return (createStore) => (reducer) => {
		const store = createStore(reducer);
		let dispatch = store.dispatch;

		// midApi就是createStore中的{getState, dispatch}
		const midApi = {
			getState: store.getState,
			dispatch: (...args) => dispatch(...args)
		}

		// 绑定中间件，柯里化
		const chain = middlewares.map((middleware) => middleware(midApi))
		dispatch = compose(...chain)(store.dispatch);
		
		// createStore接收到enhancer时，执行该方法，返回
		// 即此处应该返回跟createStore的相同结果{getState, subscribe, dispatch}
		return {
			...store, // createStore本来的结果
			dispatch  // 添加中间件功能并差异更新上面的dispatch
		}
	}
}

/**
 * compose去柯里化
 * 对传进来的方法进行组合(fn1, fn2, fn3...);
 * @return fn1(fn2(fn3(..)))
 */
let compose = (...funcs) => {
	if (funcs.length === 0) return arg => arg;
	if (funcs.length === 1) return funcs[0];

	return funcs.reduce((result, item) => (...args) => result(item(...args)))
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
	applyMiddleware,
	compose
}
