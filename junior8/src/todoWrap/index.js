/*!
 * main layout
 * @UI: 750px
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React from 'react';

import {connect} from '../myReduxReseries/react-redux/index';

import './index.less';

import Header from '../todoHeader/index';
import ListWrap from '../todoList/index';
import Footer from '../todoFooter/index';


class App extends React.Component {
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
	return { title: state.title };
}
App = connect(mapStateToProps)(App);

export default App;