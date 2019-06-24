import React, { Component } from 'react';
import { getTranslations } from 'utils/translation.utils';
import hospitalLogo from 'assets/images/hospitalLogo.jpg';

class Home extends Component {
	render() {
		const translations = getTranslations();

		return (
			<div className='page'>
				<h2>Preeclampsia Risk Estimator</h2>
				<div className='w-50'>
					<h3>{translations.home.subtitle}</h3>
					<br />
					<div className='align-horizontal--center'>
						<img className='ml-20 mb-20' src={hospitalLogo} alt='' />
					</div>
				</div>

				<br />
				<h4 className='w-70'>{translations.home.appInfo}</h4>
			</div>
		);
	}
}

export default Home;
