/*!
 * log
 * 自定义测试中间件
 */

let log = ({getState, dispatch}) => {
	// next => store.dispatch
	return (next) => {
		return (action) => {
			if ('LOGTEST' in action) {
				console.log(action['LOGTEST']);
				delete action['LOGTEST'];
				return dispatch(action);
			}

			return next(action);
		}
	}
}

export default log;