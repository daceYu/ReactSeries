/*!
 * main layout
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';

import './index.less';

import Header from '../todoHeader/index';
import ListWrap from '../todoList/index';
import Footer from '../todoFooter/index';

export default class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			title: "Todos",  // 页面标题
			defaultVal: "What needs to be done?",  // 输入框默认提示
			listType: ["All", "Active", "completed"],  // 功能栏按钮
			showList: "All",  // 功能栏默认选中按钮
			clean: "clear completed", // 清除选中任务
			list: [ // 任务列表
				{ 
					title: "learn react",
					completed: true
				},
				{ 
					title: "finsh homeword",
					completed: false
				}
			]
		}
	}

	/**
	 * 添加任务
	 * @param {String} data: 任务详情
	 */
	addData (data) {
		// 判断任务是否已存在
		let hasThisTask = false;
		for (let i in this.state.list) {
			if (this.state.list[i].title === data) {
				let tipStr = `This task has been added, ${this.state.list[i].completed ? "You've done it." : "Please finish it as soon as possible."}`;
				alert(tipStr);
				hasThisTask = true;
			}
		}
		if (hasThisTask) return false;

		// 添加任务
		this.state.list.push({title: data, completed: false});
		this.setState(this.state);
	}

	/**
	 * 操作所有数据：全选/全不选
	 * @param {Boolean} flag: true全选，false全不选
	 */
	selectAll (flag) {
		let _list = this.state.list;
		for (let i in _list) _list[i].completed = flag;
		this.setState(_list);
	}

	/**
	 * 操作单条数据：选中/不选中
	 * @param {Number | String} index: 操作的数据的下标
	 * @param {Boolean} flag: true选中，false不选中
	 */
	selectItem (index, flag) {
		let item = this.state.list;
		item[index].completed = flag;
		this.setState({ item });
	}

	/**
	 * 删除单条数据
	 * @param {Number | String} index: 操作的数据的下标
	 */
	deleteItem (index) {
		let listArr = [];
		for (let i in this.state.list) if (i !== index) listArr.push(this.state.list[i]);
		this.setState({ list: listArr });
	}

	/**
	 * 功能按钮：选择展示某一类型的数据
	 * @param {String} name: 需要展示的数据类型
	 */
	changeShowType (name) {
		this.setState({ showList: name });
	}

	/**
	 * 清除已选中的数据
	 */
	clearCompleted () {
		let listArr = [];
		for (let i in this.state.list) if (!this.state.list[i].completed) listArr.push(this.state.list[i]);
		this.setState({ list: listArr });
	}

	/* HOOK */
	render () {
		return (
			<article className="app">
				<header className="outer-title g-fs120 f-tc"> {this.state.title} </header>
				<section className="todo-wrap u-w92per g-center g-fs36">				
					<Header data={this.state} 
						    changeAll={this.selectAll.bind(this)}
						    addData={this.addData.bind(this)} />
					<ListWrap data={this.state} 
							  selectItem={this.selectItem.bind(this)} 
							  deleteItem={this.deleteItem.bind(this)} />
					<Footer data={this.state} 
							changeType={this.changeShowType.bind(this)}
							clearCompleted={this.clearCompleted.bind(this)} />
				</section>
			</article>
		)
	}
}