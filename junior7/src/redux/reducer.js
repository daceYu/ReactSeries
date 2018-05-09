/*!
 * reducer 
 * accord data-type to handler data
 * @Author: daceyu <daceyu@aliyun.com> 
 */

import TYPE from './actionType';
import DATA from './store';

/**
 * reducer
 * @param  {Object} state: state of store
 * @param  {Object} action: data
 * @return {Object} state
 */
export function dataChange (state = DATA, action) {
	switch (action.type) {
		case TYPE.DATASYNC:
			return Async(action.data);
		case TYPE.OPREATE_ALL:
			return operateAll(action.data);
		case TYPE.ADD_DATA:
			return addData(action.data);
		case TYPE.SELECT_ITEM:
			return selectItem(action.data);
		case TYPE.DELECT_ITEM:
			return delectItem(action.data);
		case TYPE.CLEAN_SELECTED:
			return cleanSelected();
		case TYPE.FILTER_DATA:
			return filterData(action.data);
		default:
			return initialData(DATA);
	}
}

/**
 * 接口数据处理
 * data
 */
let Async = (data) => {
	DATA.data = data;
	return initialData(DATA);
}


/**
 * 数据处理，根据todolist列表数据，判断相关状态
 * @param  {Object} info: 需要初始化的数据对象
 * @return {Object}
 */
let initialData = (info) => {
	let dataLength = info.data.length,
		hasData = dataLength === 0;
	info.showIcon = !hasData; // 是否展示输入框旁的icon
	info.showFooter = !hasData; // 是否展示底部操作区

	if (!hasData) {
		let counterLeft = 0;
		for (let i in info.data) {
			if (!info.data[i].completed) counterLeft += 1;
		}
		// 是否展示底部操作区的clear按钮
		info.footer.showClear = !(counterLeft === dataLength);
		// 剩余item数量
		info.footer.remain_text = `${counterLeft} item left`;
		// 是否全部选中
		info.completedAll = counterLeft === 0;
	}
	return info;
}

/**
 * 输入框操作全选按钮
 * @param  {Object} data: 数据
 * @return {Object} DATA: 组件store数据
 */
let operateAll = (data) => {
	DATA.completedAll = data.completedAll;
	for (let i in DATA.data) {
		DATA.data[i].completed = DATA.completedAll;
	}
	DATA.footer.showClear = DATA.completedAll;

	return DATA;
}

/**
 * 增加todo事项
 * @param  {Object} data: 新增数据
 * @return {Object} DATA: 组件store数据
 */
let addData = (data) => {
	let hasItem = false,
		str = '';
	for (let i in DATA.data) {
		if (DATA.data[i].text === data.text) {
			hasItem = true;
			str = `This task has been added, ${DATA.data[i].completed ? "You've done it." : "Please finish it as soon as possible."}`;
		}
	}
	if (hasItem) { alert(str); return false; }

	str = null;
	DATA.data.push(data);
	return initialData(DATA);
}

/**
 * 选中/取消选择 单条数据
 * @param  {Object} data: 数据详情
 * @return {Object} DATA: 组件store数据
 */
let selectItem = (data) => {
	if (!DATA.data[data.index]) return false;
	DATA.data[data.index].completed = data.completed;
	return initialData(DATA);
}

/**
 * 删除单条数据
 * @param  {Object} data: 数据详情
 * @return {Object} DATA: 组件store数据
 */
let delectItem = (data) => {
	if (!DATA.data[data.index]) return false;
	delete DATA.data[data.index];
	return initialData(DATA);
}

/**
 * 清除已选数据
 * @return {Object} DATA: 组件store数据
 */
let cleanSelected = () => {
	for (let i in DATA.data) {
		if (DATA.data[i].completed) delete DATA.data[i];
	}
	
	return initialData(DATA);
}

/**
 * 展示指定状态的数据
 * @param  {Object} data: 数据详情
 * @return {Object} DATA: 组件store数据
 */
let filterData = (data) => {
	DATA.footer.current = data.current;
	return DATA;
}