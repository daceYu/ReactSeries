/*!
 * Action
 * @Author: daceyu <daceyu@aliyun.com> 
 */

import Dispatcher from './dispatcher';
import WebAPI from './webAPI';

export default class Action{
	/**
	 * 数据处理
	 * @param {Srting} keyName: 数据操作名称
	 * @param {Object} data: 数据对象
	 */
	dataHandler (keyName, data) {
		let obj = {
			keyName,
			data
		}
		Dispatcher.dispatch(obj);
	}

	/**
	 * 初始化数据
	 * @param {Function} cb: 回调函数
	 */
	initData () {
		// 模拟请求获取数据
		WebAPI.getData((data) => {
			let obj = {
				keyName: "initData",
				data
			}
			Dispatcher.dispatch(obj);
		})
	}
}