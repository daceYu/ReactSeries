/*!
 * list Wrap
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';

import './index.less';

export default class List extends Component {
	constructor (props) {
		super(props);
		this.state = {
			listType: ["All", "Active", "completed"],  // 所有的数据类型
			showList: "All",  // 当前展示的数据类型
			items: [],  // 列表Item JSX
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

	/* HOOK */
	componentDidMount () {
		this.dataHandler(this.state);

		this.addData();
		this.operateAll();
		this.showThisType();
		this.clean();
	}

	/**
	 * 数据增加
	 */
	addData () {
		this.props.events.on("addData", (obj) => {
			// 判断任务是否已存在
			let hasThisTask = false;
			for (let i in this.state.list) {
				if (this.state.list[i].title === obj.title) {
					let tipStr = `This task has been added, ${this.state.list[i].completed ? "You've done it." : "Please finish it as soon as possible."}`;
					alert(tipStr);
					hasThisTask = true;
				}
			}
			if (hasThisTask) return false;

			// 添加任务
			this.state.list.push(obj);
			// this.setState(this.state);
			this.dataHandler(this.state);
		})
	}

	/**
	 * 数据全选/全不选
	 */
	operateAll () {
		this.props.events.on("operateAll", (obj) => {
			let _state = this.state;
			for (let i in _state.list) _state.list[i].completed = obj.completedAll ? true : false;
			this.setState(_state, () => {
				this.dataHandler(this.state);
			})
		})
	}

	/**
	 * 展示指定状态的数据
	 */
	showThisType () {
		this.props.events.on("showType", (item) => {
			this.setState({ showList: item }, () => {
				this.dataHandler(this.state);
			})
		})
	}

	/**
	 * 清理已完成的数据
	 */
	 clean () {
		this.props.events.on("clean", () => {
			for (let i in this.state.list) if (this.state.list[i].completed) delete this.state.list[i];
			this.dataHandler(this.state);
		})
	 }

	/**
	 * 选中某条数据
	 * @param {Number} index: 选中数据的序列号
	 * @param {Boolean} status: 选中数据的状态
	 */
	selectItem (index, status) {
		let obj = this.state;
		obj.list[index].completed = !status;
		this.setState(obj, () => {
			this.dataHandler(this.state);
		})
	}

	/**
	 * 删除某条数据
	 * @param {Number} index: 删除数据的序列号
	 */
	deleteItem (index) {
		delete this.state.list[index];
		this.dataHandler(this.state);
	}

	/**
	 * 计算数据
	 * 是否有任务、是否全部完成、是否有完成的任务、未完成任务的数量
	 */
	calculate () {
		let all_obj = {
			showIcon: false,
			completedAll: true
		};
		let footer_obj = {
			showFooter: false,
			leftCount: 0,
			hasCompleted: false
		}
		for (let i in this.state.list) {
			all_obj.showIcon = footer_obj.showFooter = true;
			if (!this.state.list[i].completed) {
				footer_obj.leftCount++;
				all_obj.completedAll = false;
			} else {
				footer_obj.hasCompleted = true;
			}
		}

		this.props.events.emit("updateAll", all_obj);
		this.props.events.emit("updateFooter", footer_obj);
	}

	
	/**
	 * 处理任务列表数据
	 * @param {Object} data: 任务列表数据
	 */
	dataHandler (data) {
		let items = [];
		for (let i in data.list) {
			let info = data.list[i],
				_class = (info.completed ? "selected " : "") + "f-b_1px bt_1px u-flex";

			let str = (
					<li className={_class}
						key={i} 
						index={i}>
						<a className="select g-pr" 
						   onClick={(e) => this.selectItem(i, info.completed)}> </a>
						<p>{info.title}</p>
						<a className="destory g-pr g-fs48 f-tr" 
						   onClick={(e) => this.deleteItem(i)}>×</a>
					</li>
				);

			if (data.showList === data.listType[0] || 
			   (data.showList === data.listType[1] && !info.completed) ||
			   (data.showList === data.listType[2] && info.completed)) { // 区分展示类型，All || Active || Completed
				items.push(str);
			}
		}
		this.setState({ items });
		this.calculate();
	}

	/* HOOK */
	render () {
		return (
			<article className="todo-list u-w">
				<ul className="u-w">
					{this.state.items}
				</ul>
			</article>
		)
	}
}