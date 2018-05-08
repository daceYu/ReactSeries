/*!
 * Dispatch
 * 1. 解耦合
 * 2. 让组件对Action的单例依赖取消了，变成了内部使用
 * @Author: daceyu <daceyu@aliyun.com> 
 */

let storeCallbackList = [],
	middlewareList = [];

const Dispatcher = {
	register (storeCallback) {
		storeCallbackList.push(storeCallback);
	},

	use (middleware) {
		middlewareList.push(middleware);
	},

	dispatch (action) {
		let index = -1;
		let next = () => {
			const middle = middlewareList[++index];
			if (middle) {
				middle(action, next);
			} else {
				this._dispatch(action);
			}
		}
		next();
	},

	_dispatch (action) {
		for (let callback of storeCallbackList) {
			callback(action);
		}
	}
}

export default Dispatcher;