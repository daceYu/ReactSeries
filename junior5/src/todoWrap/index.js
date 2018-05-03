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

// const EventEmitter = require('events').EventEmitter;
let EventEmitter = {
	_events: {},
	
	emit (eventName, data) {
		if (!this._events[eventName]) return false;
		// 执行订阅事件
		for (let i = 0; i < this._events[eventName].length; i++) this._events[eventName][i](data);
	},

	on (eventName, callback) { // 订阅事件
		if (!this._events[eventName]) this._events[eventName] = [];
		this._events[eventName].push(callback);
	}
}

export default class App extends Component {
	constructor (props) {
		super(props);

		// this.eventEmitter = new EventEmitter();
		this.eventEmitter = EventEmitter;
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