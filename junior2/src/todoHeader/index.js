/*!
 * header
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';

import './index.less';

export default class Header extends Component {
	constructor (props) {
		super(props);
		this.state = { 
			completedAll: false // 是否全部选中 false: 否,true: 是
		}
	}

	/* HOOK */
	componentDidMount () {
		this.judgeDataEmpty();
		this.isSelectedAll();
	}
	/* HOOK */
	componentWillReceiveProps (nextProps) {
		this.judgeDataEmpty();
		this.isSelectedAll();
	}

	/**
	 * 判断数据是否为空
	 * @return {Boolean} true: 是  false: 否
	 */
	judgeDataEmpty () {
		if (this.props.data.list.length <= 0) return false;
		return true;
	}

	/**
	 * 判断是否全选
	 */
	isSelectedAll () {
		let completedAll = true;
		this.props.data.list.forEach((item, index) => {
			if (!item.completed) completedAll = false; // 存在数据未选中
		})
		this.setState({ completedAll })
	}

	/**
	 * 操作所有数据：全选/全不选
	 * @param {Number | String} index: 操作的数据的下标
	 * @param {Boolean} flag: true选中，false不选中
	 */
	ChangeStatus () {
		this.setState({
			completedAll: !this.state.completedAll
		})
		this.props.changeAll(!this.state.completedAll);
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
		this.props.addData(e.target.value);
		e.target.value = "";
	}

	/* HOOK */
	render () {
		return (
			<header className="todo-header f-tc u-flex">
				<a className={!this.judgeDataEmpty() ? "g-pr z-hide_0" : this.state.completedAll ? "g-pr active" : "g-pr"} 
				   onClick={(e) => this.ChangeStatus()}> </a>
				<input type="text" 
					   placeholder={this.props.data.defaultVal} 
					   onKeyUp={(e) => this.onkeyup(e)} 
					   onBlur={(e) => this.handler(e)} />
			</header>
		)
	}
}