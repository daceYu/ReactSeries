/*!
 * main layout
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';
import {createStore} from 'redux';
import {dataChange} from '../redux/reducer';
import CREATOR from '../redux/actionCreator';

import './index.less';

import Header from '../todoHeader/index';
import ListWrap from '../todoList/index';
import Footer from '../todoFooter/index';

let store = createStore(dataChange);

export default class App extends Component {
	constructor (props) {
		super(props);

		/* 数据初始化 */
		store.dispatch(CREATOR.getDataAsync());
	}

	/* HOOK */
	render () {
		return (
			<article className="app">
				<header className="outer-title g-fs120 f-tc"> 
					{store.getState().title}
				</header>
				<section className="todo-wrap g-center g-fs36">
					<Header store={store} />
					<ListWrap store={store} />
					<Footer store={store} />
				</section>
			</article>
		)
	}
}