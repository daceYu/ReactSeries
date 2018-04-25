/*!
 * footer
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';

import './index.less';

export default class Footer extends Component {
	constructor (props) {
		super(props);
		this.state = {
			text: "0 item left",
			showclear: false,
			showFooter: false
		}
	}

	/* HOOK */
	componentDidMount () {
		this.itemHandler(this.props.data.list);
	}
	/* HOOK */
	componentWillReceiveProps (nextProps) {
		this.itemHandler(nextProps.data.list);
	}

	/**
	 * 数据处理
	 *（数据列表是否为空，是否有选中数据，剩余未选数据条数）
	 * @param {Object} data: 列表数据
	 */
	itemHandler (data) {
		let count = 0,
			_state = {};
		for (let i in data) if (!data[i].completed) count++;
		_state = {
			showFooter: data.length > 0 ? true : false,
			showclear: (data.length - count > 0),
			text: `${count} item left`
		}
		this.setState(_state);
	}

	/**
	 * 展示某一类型的数据
	 * @param {String} name: 类型的值
	 */
	navToggle (name) {
		this.props.changeType(name);
	}

	/**
	 * 删除已选中的数据
	 */
	clear () {
		this.props.clearCompleted();
	}

	/**
	 * 获取功能区按钮JSX
	 * @return {Array} items: JSX
	 */
	getList () {
		let itemJsx = this.props.data.listType.map((item, index) => 
				<li className={item === this.props.data.showList ? "f-fl current" : "f-fl"}
					key={index}
					onClick={(e) => this.navToggle(item, e)}
				>
					{item}
				</li>
		)
		return <ul>{itemJsx}</ul>
	}

	/* HOOK */
	render () {
		let _class = `todo-footer g-fs24 f-b_1px bt_1px ${this.state.showFooter ? "" : "z-hide"}`;
		return (
			<footer className={_class}>
				<section className="u-flex">
					<header>{this.state.text}</header>
					{this.getList()}
					<a onClick={(e) => this.clear(e)} 
					   className={this.state.showclear ? "" : "z-hide"}>{this.props.data.clean}</a>
				</section>
			</footer>
		)
	}
}