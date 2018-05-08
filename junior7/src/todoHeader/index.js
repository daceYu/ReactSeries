/*!
 * header
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';
import Action from '../myFlux/action';

import './index.less';

export default class Header extends Component {
	constructor (props) {
		super(props);
		this.state = {
			placeHolder: "What needs to be done?",  // 输入框默认提示
			showIcon: true, // 是否显示 选中按钮 true: 显示，false: 隐藏
			completedAll: true // 是否全部选中 true: 是，false: 否
		}
		this.action = new Action();
		this.observerUpdate();
	}

	/**
	 * 监听按钮的状态变化
	 */
	observerUpdate () {
		this.props.store.on("updateAll", (data) => {
			let obj = data["updateAll"]
			this.setState({
				showIcon:  obj.showIcon,
				completedAll: obj.completedAll
			})
		})
	}

	/**
	 * 全部选中 / 全部不选中
	 */
	selectDataAll () {
		this.setState({ completedAll: !this.state.completedAll })
		this.action.dataHandler("operateAll", {
			showIcon: true,
			completedAll: !this.state.completedAll
		})
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

		this.action.dataHandler("addData", {
			title: e.target.value,
			completed: false
		})
		e.target.value = "";
	}

	/* HOOK */
	render () {
		return (
			<header className="todo-header f-tc u-flex">
				<a className={!this.state.showIcon ? "g-pr z-hide_0" : this.state.completedAll ? "g-pr active" : "g-pr"}
				   onClick={(e) => this.selectDataAll()}> </a>
				<input type="text" 
					   placeholder={this.state.placeHolder} 
					   onKeyUp={(e) => this.onkeyup(e)} 
					   onBlur={(e) => this.handler(e)} />
			</header>
		)
	}
}