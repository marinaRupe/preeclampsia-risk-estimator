import React, { Component } from 'react';
import Spinner from '../Spinner';

class LoadingComponent extends Component {
	render() {
		const { loading } = this.props;
		if (loading) {
			return (
				<div className='-loading -active'>
					<div className='-loading-inner'>
						<Spinner centered />
					</div>
				</div>
			);
		}
		return null;
	};
}

export default LoadingComponent;
