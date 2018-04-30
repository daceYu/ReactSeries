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
			showFooter: true, // 是否展示功能栏
			text: "0 item left", // 剩余任务数量
			listType: ["All", "Active", "completed"],  // 功能栏按钮
			showList: "All",  // 功能栏默认选中按钮
			clean: "clear completed", // 清除选中任务
			showclear: false  // 是否展示清除按钮
		}
		this.observerUpdate();
	}

	/* HOOK */
	componentDidMount () {
		this.navToggle(this.state.showList);
	}

	/**
	 * 订阅 需要更新底部 功能区的 状态
	 */
	observerUpdate () {
		this.props.events.on("updateFooter", (obj) => {
			this.setState({
				text: `${obj.leftCount} item left`,
				showFooter: obj.showFooter,
				showclear: obj.hasCompleted
			});
		})
	}

	/** 
	 * 切换展示不同状态的数据
	 * @param {String} item: 状态值
	 */
	navToggle (item) {
		this.setState({ showList: item });
		this.props.events.emit("showType", item);
	}

	/**
	 * 清除已完成的任务
	 */
	clean () {
		this.props.events.emit("clean");
	}

	/**
	 * 获取功能区按钮JSX
	 * @return {Array} items: JSX
	 */
	getList () {
		let itemJsx = this.state.listType.map((item, index) => 
				<li className={item === this.state.showList ? "f-fl current" : "f-fl"}
					key={index}
					onClick={(e) => this.navToggle(item, e)}
				>{item}</li>
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
					<a className={this.state.showclear ? "" : "z-hide"}
					   onClick={(e) => this.clean()}>{this.state.clean}</a>
				</section>
			</footer>
		)
	}
}