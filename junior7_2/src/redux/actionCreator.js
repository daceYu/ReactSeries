/*!
 * creator  
 * 规范化 action 通过 action creator 来创建
 * @Author: daceyu <daceyu@aliyun.com> 
 */

import TYPE from './actionType';

/* 模拟接口请求，获取初始化的数据列表 */
let getDataAsync = () => {
	console.log('请求接口初始化');
	return (dispatch) => {
		// console.log(dispatch);
		let data = [{ 
			text: "learn react",
			completed: true
		}, { 
			text: "finsh homeword",
			completed: false
		}];

		setTimeout(() => {
			console.log('请求结束，渲染数据');
            dispatch(dataInit(data));
        }, 500)
	}
}

/**
 * 处理初始化数据
 * @param  {Object} data: 数据详情
 * @return {Object} 
 */
let dataInit = (data) => {
	return {
		type: TYPE.DATASYNC,
		data
	}
}

/**
 * 输入框操作全选数据
 * @param  {Object} data: 数据详情
 * @return {Object} 
 */
let operateAll = (data) => {
	return {
		type: TYPE.OPREATE_ALL,
		data
	}
}

/**
 * 增加todo事项
 * @param  {Object} data: 数据详情
 * @return {Object}
 */
let addData = (data) => {
	return {
		type: TYPE.ADD_DATA,
		data
	}
}

/**
 * 选中/取消选择 单条数据
 * @param  {Object} data: 数据详情
 * @return {Object}
 */
let selectItem = (data) => {
	return {
		type: TYPE.SELECT_ITEM,
		data
	}
}

/**
 * 删除 单条数据
 * @param  {Object} data: 数据详情
 * @return {Object}
 */
let deleteItem = (data) => {
	return {
		type: TYPE.DELECT_ITEM,
		data
	}
}

/**
 * 清除已选数据
 * @return {Object}
 */
let cleanSelected = () => {
	return {
		type: TYPE.CLEAN_SELECTED
	}
}

/**
 * 展示指定状态的数据
 * @param  {Object} data: 数据详情
 * @return {Object}
 */
let filterData = (data) => {
	return {
		type: TYPE.FILTER_DATA,
		data
	}
}


export default {
	operateAll,
	addData,
	selectItem,
	deleteItem,
	cleanSelected,
	filterData,
	getDataAsync
}