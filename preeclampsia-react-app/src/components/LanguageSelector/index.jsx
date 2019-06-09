import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { languages } from 'constants/language.constants';
import { getLanguage, setLanguage } from 'utils/translation.utils';
import croFlag from 'assets/images/flags/croatia.png';
import ukFlag from 'assets/images/flags/uk.png';

class LanguageSelector extends Component {
	render() {
		const language = getLanguage();

		return (
			<NavDropdown
				eventKey={11}
				title={
					<img
						className='flag'
						src={language === languages.en ? ukFlag : croFlag}
						alt=''
					/>
				}
				id='basic-nav-dropdown'
			>
				<MenuItem eventKey='11.1'>
					{
						language === languages.en
							?
							<div onClick={setLanguage.bind(null, languages.hr)}>
								<img className='flag' src={croFlag} alt=''/>
							</div>
							:
							<div onClick={setLanguage.bind(null, languages.en)}>
								<img className='flag' src={ukFlag} alt=''/>
							</div>
					}
				</MenuItem>          
			</NavDropdown> 
		);
	} 
};

export default LanguageSelector;
