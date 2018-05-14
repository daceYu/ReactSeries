/*!
 * connect.js
 * @Author: daceyu <daceyu@aliyun.com> 
 */
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from '../redux/redux';

export const connect = (mapStateToProps, mapDispatchToProps) => {
	if (!mapStateToProps) mapStateToProps = state => state;
	if (!mapDispatchToProps) mapDispatchToProps = {};

	return (OldComponent) => {
		return class NewComponent extends React.Component {
			static contextTypes = {
				store: PropTypes.object
			}

			constructor (props, context) {
				super(props, context);
				this.state = {
					newProps: this.props
				}
			}

			componentDidMount () {
				const store = this.context.store;
				// 用react-redux不需要考虑subscribe，因为此处已经使用过了
				store.subscribe(() => {
					this.update();
				})
				this.update();
			}

			update () {
				const store = this.context.store;
				const stateProps = mapStateToProps(store.getState()),
					dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);

				this.setState({
					newProps: {
						...this.state.newProps,
						...stateProps,
						...dispatchProps
					}
				})
			}

			render () {
				return <OldComponent {...this.state.newProps} />
			}
		}
	}
}