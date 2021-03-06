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
		let _data = this.props.store.getState();
		let _state = {
			func: _data.footer.func,
			current: _data.footer.current,
			list: _data.data,
		}

		this.dataHandler(_state);
		this.dataListener();
	}

	/* 订阅数据改变，重渲染 */
	dataListener () {
		this.props.store.subscribe(() => {
			let _state = this.state;
			let _data = this.props.store.getState();

			// 添加的item已存在
			if (!_data) return false;

			// rerender
			_state.list = _data.data;
			_state.current = _data.footer.current;
			_state.func = _data.footer.func;
			this.dataHandler(_state);
		})
	}

	/**
	 * 选中某条数据
	 * @param {Number} index: 选中数据的序列号
	 * @param {Boolean} status: 选中数据的状态
	 */
	selectItem (index, status) {
		this.props.store.dispatch(this.props.creator.selectItem({
			index,
			completed: !status
		}))
	}

	/**
	 * 删除某条数据
	 * @param {Number} index: 删除数据的序列号
	 */
	deleteItem (index) {
		this.props.store.dispatch(this.props.creator.deleteItem({
			index
		}))
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
						<p>{info.text}</p>
						<a className="destory g-pr g-fs48 f-tr" 
						   onClick={(e) => this.deleteItem(i)}>×</a>
					</li>
				);

			if (data.current === data.func[0] || 
			   (data.current === data.func[1] && !info.completed) ||
			   (data.current === data.func[2] && info.completed)) { // 区分展示类型，All || Active || Completed
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