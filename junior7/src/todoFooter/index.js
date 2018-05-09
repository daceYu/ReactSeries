/*!
 * footer
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';
import CREATOR from '../redux/actionCreator';

import './index.less';

export default class Footer extends Component {
	constructor (props) {
		super(props);

		this.state = {}
		this.observerUpdate();
	}

	componentDidMount () {
		this.dataUpdate();
	}

	/* 数据更新 */
	dataUpdate () {
		let _data = this.props.store.getState();
		let _state = {
			showFooter: _data.showFooter,
			text: _data.footer.remain_text,
			listType: _data.footer.func,
			showList: _data.footer.current,
			clean: _data.footer.clean_text,
			showclear: _data.footer.showClear
		}
		this.setState(_state);
	}

	/* 订阅 需要更新底部 功能区的 状态 */
	observerUpdate () {
		this.props.store.subscribe(() => {
			this.dataUpdate();
		})
	}

	/** 
	 * 切换展示不同状态的数据
	 * @param {String} item: 状态值
	 */
	navToggle (item) {
		if (this.state.showList === item) return false;
		this.props.store.dispatch(CREATOR.filterData({
			current: item
		}))
	}

	/* 清除已完成的任务 */
	clean () {
		this.props.store.dispatch(CREATOR.cleanSelected());
	}

	/**
	 * 获取功能区按钮JSX
	 * @return {Array} items: JSX
	 */
	getList () {
		if (!this.state.listType) return "";

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