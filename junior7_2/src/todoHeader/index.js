/*!
 * header
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import CREATOR from '../redux/actionCreator';

import './index.less';

class Header extends Component {
	/*constructor (props) {
		super(props);
	}*/

	/* 全部选中 / 全部不选中 */
	selectDataAll () {
		this.props.operateAll({
			completedAll: !this.props.completedAll
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

		this.props.addData({
			text: e.target.value,
			completed: false
		})
		e.target.value = "";
	}

	/* HOOK */
	render () {
		return (
			<header className="todo-header f-tc u-flex">
				<a className={!this.props.showIcon ? "g-pr z-hide_0" : this.props.completedAll ? "g-pr active" : "g-pr"}
				   onClick={(e) => this.selectDataAll()}> </a>
				<input type="text" 
					placeholder={this.props.placeholder} 
					onKeyUp={(e) => this.onkeyup(e)} 
					onBlur={(e) => this.handler(e)} />
			</header>
		)
	}
}


let mapStateToProps = (state, props) => {
	console.log(state);
	return {
		showIcon: state.showIcon,
		completedAll: state.completedAll,
		placeholder: state.header.placeholder
	};
}
Header = connect(mapStateToProps, CREATOR)(Header);

export default Header;