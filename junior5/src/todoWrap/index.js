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

const EventEmitter = require('events').EventEmitter;

export default class App extends Component {
	constructor (props) {
		super(props);

		this.eventEmitter = new EventEmitter();
		this.state = {
			title: "Todos"  // 页面标题
		}
	}

	/* HOOK */
	render () {
		return (
			<article className="app">
				<header className="outer-title g-fs120 f-tc"> {this.state.title} </header>
				<section className="todo-wrap u-w92per g-center g-fs36">				
					<Header events = {this.eventEmitter} />
					<ListWrap events = {this.eventEmitter} />
					<Footer events = {this.eventEmitter} />
				</section>
			</article>
		)
	}
}