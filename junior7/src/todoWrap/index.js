/*!
 * main layout
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';

import './index.less';

import Header from '../todoHeader/index';
import ListWrap from '../todoList/index';
import Footer from '../todoFooter/index';

// import Dispatcher from '../myFlux/dispatcher';
import Store from '../myFlux/store';
let store = new Store();

export default class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			title: "Todos"  // 页面标题
		}

		// 以下代码无任何实际意义，只是测试中间件功能
		/*Dispatcher.use( (action, next) => {
			console.log(action, "中间件");
			next();
		})*/
	}

	/* HOOK */
	render () {
		return (
			<article className="app">
				<header className="outer-title g-fs120 f-tc"> {this.state.title} </header>
				<section className="todo-wrap u-w92per g-center g-fs36">				
					<Header store={store} />
					<ListWrap store={store} />
					<Footer store={store} />
				</section>
			</article>
		)
	}
}