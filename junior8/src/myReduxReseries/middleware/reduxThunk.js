/*!
 * redux-thunk
 * 处理异步数据
 */

let thunk = ({getState, dispatch}) => {
	// next => store.dispatch
	return (next) => {
		return (action) => {
			// console.log(action);
			if (typeof action === "function") {
				return action(dispatch, getState);
			}

			return next(action);
		}
	}
}

export default thunk;