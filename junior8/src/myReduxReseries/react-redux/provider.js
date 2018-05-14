/*!
 * Provider.js
 * 原理：getContextChild
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Provider extends React.Component {
	static childContextTypes = {
		store: PropTypes.object
	}

	getChildContext () {
		return {
			store: this.props.store
		}
	}

	render () {
		return this.props.children;
	}
}