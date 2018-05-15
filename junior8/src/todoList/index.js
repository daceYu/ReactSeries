/*!
 * list Wrap
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React from 'react';
import {connect} from '../myReduxReseries/react-redux/index';
import {selectItem, deleteItem} from '../redux/actionCreator';

import './index.less';

class List extends React.Component {
	/*constructor (props) {
		super(props);
	}*/

	/**
	 * 选中某条数据
	 * @param {Number} index: 选中数据的序列号
	 * @param {Boolean} status: 选中数据的状态
	 */
	selectItem (index, status) {
		this.props.selectItem({
			index,
			completed: !status
		})
	}

	/**
	 * 删除某条数据
	 * @param {Number} index: 删除数据的序列号
	 */
	deleteItem (index) {
		this.props.deleteItem({
			index
		})
	}

	/* HOOK */
	render () {
		let items = [],
			data = this.props;
		for (let i in data.list) {
			let info = data.list[i],
				_class = (info.completed ? "selected " : "") + "f-b_1px bt_1px u-flex";

			let str = (
					<li className={_class}
						key={i} 
						index={i}>
						<a className="select g-pr" 
						   onClick={(e) => this.selectItem(i, info.completed)}> </a>
						<p>{info.text}</p>
						<a className="destory g-pr g-fs48 f-tr" 
						   onClick={(e) => this.deleteItem(i)}>×</a>
					</li>
				);
			items.push(str);
		}

		return (
			<article className="todo-list u-w">
				<ul className="u-w">
					{items}
				</ul>
			</article>
		)
	}
}


let mapStateToProps = (state, props) => {
	return {
		func: state.footer.func,
		current: state.footer.current,
		list: [].concat(state.data)
	}
}
let ActionCreators = {selectItem, deleteItem};
List = connect(mapStateToProps, ActionCreators)(List);

export default List;