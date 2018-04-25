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
			items: []  // 列表Item JSX
		}
	}

	/* HOOK */
	componentDidMount () {
		this.dataHandler(this.props.data);
	}

	/* HOOK */
	componentWillReceiveProps (nextProps) {
		this.dataHandler(nextProps.data);
	}

	/**
	 * 选择/取消选择 当前选项
	 * @param {Boolean} flag: true 已选、取消选择，false 未选，选择该选项
	 * @param e: 目标对象
	 */
	selectItem (flag, e) {
		let index = e.target.parentNode.getAttribute("index");
		this.props.selectItem(index, !flag);
	}

	/**
	 * 删除 当前选项
	 * @param e: 目标对象
	 */
	deleteItem (e) {
		let index = e.target.parentNode.getAttribute("index");
		this.props.deleteItem(index);
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
						   onClick={(e) => this.selectItem(info.completed, e)}> </a>
						<p>{info.title}</p>
						<a className="destory g-pr g-fs48 f-tr" 
						   onClick={(e) => this.deleteItem(e)}>×</a>
					</li>
				);

			if (data.showList === data.listType[0] || 
			   (data.showList === data.listType[1] && !info.completed) ||
			   (data.showList === data.listType[2] && info.completed)) { // 区分展示类型，All || Active || Completed
				items.push(str);
			}
		}
		this.setState({ items });
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