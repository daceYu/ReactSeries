/*!
 * header
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';
import CREATOR from '../redux/actionCreator';

import './index.less';

export default class Header extends Component {
	constructor (props) {
		super(props);

		let _data = this.props.store.getState();
		this.state = {
			showIcon: _data.showIcon,
			completedAll: _data.completedAll,
			placeholder: _data.header.placeholder
		};

		this.observerUpdate();
	}

	/* 监听按钮的状态变化*/
	observerUpdate () {
		this.props.store.subscribe(() => {
			let _data = this.props.store.getState();
			this.setState({
				showIcon: _data.showIcon,
				completedAll: _data.completedAll
			});
		})
	}

	/* 全部选中 / 全部不选中 */
	selectDataAll () {
		this.props.store.dispatch(CREATOR.operateAll({
			completedAll: !this.state.completedAll
		}))
	}

	/**
	 * 键盘事件
	 * @param {Event} event: 事件对象
	 */
	onkeyup (event) {
		event.keyCode === 13 && this.handler(event);
	}

	/**
	 * 处理用户输入的数据
	 * @param e: 目标对象
	 */
	handler (e) {
		if (!e.target.value) return false;

		this.props.store.dispatch(CREATOR.addData({
			text: e.target.value,
			completed: false
		}))
		e.target.value = "";
	}

	/* HOOK */
	render () {
		return (
			<header className="todo-header f-tc u-flex">
				<a className={!this.state.showIcon ? "g-pr z-hide_0" : this.state.completedAll ? "g-pr active" : "g-pr"}
				   onClick={(e) => this.selectDataAll()}> </a>
				<input type="text" 
					placeholder={this.state.placeholder} 
					onKeyUp={(e) => this.onkeyup(e)} 
					onBlur={(e) => this.handler(e)} />
			</header>
		)
	}
}