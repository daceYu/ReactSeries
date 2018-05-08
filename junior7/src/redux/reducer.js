
import DATATYPE from './actionType';

/* reducer */
export function dataChange (state, action) {
	switch (action.type) {
		case DATATYPE.ADD_DATA:
			return action.data;
		default:
			return state;
	}
}

/* action creator */
export function getData (data) {
	return {
		type: DATATYPE.ADD_DATA,
		data
	}
}