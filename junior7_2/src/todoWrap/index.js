/*!
 * main layout
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import CREATOR from '../redux/actionCreator';

import './index.less';

import Header from '../todoHeader/index';
import ListWrap from '../todoList/index';
import Footer from '../todoFooter/index';


class App extends Component {
	/*constructor (props) {
		super(props);

		// this.props.getDataAsync(); // 数据初始化
	}*/

	/* HOOK */
	render () {
		return (
			<article className="app">
				<header className="outer-title g-fs120 f-tc"> 
					{this.props.title}
				</header>
				<section className="todo-wrap g-center g-fs36">
					<Header />
					<ListWrap />
					<Footer />
				</section>
			</article>
		)
	}
}

let mapStateToProps = (state, props) => {
	// console.log(state);
	if (props.title !== state.title) {
		return {
			title: state.title
		};
	}
}
App = connect(mapStateToProps, CREATOR)(App);

export default App;