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
			return Object.assign({}, Async(action.data));
		case TYPE.OPREATE_ALL:
			return Object.assign({}, operateAll(action.data));
		case TYPE.ADD_DATA:
			return Object.assign({}, addData(action.data));
		case TYPE.SELECT_ITEM:
			return Object.assign({}, selectItem(action.data));
		case TYPE.DELECT_ITEM:
			return Object.assign({}, delectItem(action.data));
		case TYPE.CLEAN_SELECTED:
			return Object.assign({}, cleanSelected());
		case TYPE.FILTER_DATA:
			return filterData(action.data);
		default:
			return Object.assign({}, initialData(DATA));
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
	let hasData = info.data.some(function (currentValue,index,arr) {
		if (currentValue) return true;
		return false;
	})
	
	info.showIcon = hasData; // 是否展示输入框旁的icon
	info.showFooter = hasData; // 是否展示底部操作区

	if (hasData) {
		let counterLeft = 0,
			showClear = false;
		let items = [];
		for (let i in info.data) {
			info.data[i].completed ? showClear = true : counterLeft += 1;
			items.push(info.data[i]);
		}
		info.data = items;

		info.footer.showClear = showClear;
		info.footer.remain_text = `${counterLeft} item left`;
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
	let counterLeft = 0;
	DATA.completedAll = data.completedAll;
	for (let i in DATA.data) {
		DATA.data[i].completed = DATA.completedAll;
		counterLeft++;
	}
	DATA.footer.showClear = DATA.completedAll;
	DATA.footer.remain_text = `${counterLeft} item left`;

	console.log(DATA);
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
	let _obj = Object.assign({}, DATA);
	_obj.footer.current = data.current;

	let _footer = _obj.footer,
		items = [];

	for (let i in _obj.data) {
		let _completed = _obj.data[i].completed;
		// 筛选 区分展示类型数据
		( _footer.current === _footer.func[0] || 
		 (_footer.current === _footer.func[1] && !_completed) || 
		 (_footer.current === _footer.func[2] && _completed)
		) && items.push(_obj.data[i]);
	}
	_obj.data = items;

	return _obj;
}