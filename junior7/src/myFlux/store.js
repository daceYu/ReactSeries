/*!
 * Store
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import Dispatcher from './dispatcher';
const EventEmitter = require("events").EventEmitter;

export default class Store extends EventEmitter {
	constructor () {
		super();
		this._data = {};

		Dispatcher.register((data) => {
			this._dataHandler(data.keyName, data.data);
		})
	}

	_dataHandler (keyName, data) {
		this._data[keyName] = data;
		this.emit(keyName, this.data);
	}

	get data () {
		return this._data;
	}
}