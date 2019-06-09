import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from 'components/Inputs/Input';
import Select from 'components/Inputs/Select';
import { userRoles } from 'constants/roles.constants';
import { generateOptions } from 'utils/form.utils';
import { getTranslations } from 'utils/translation.utils';
import PasswordInputs from '../PasswordInputs';

class UserForm extends Component {
	render() {
		const {
			onSubmit,
			error,
			disabled = {},
			buttons,
			showPasswordInputs = true
		} = this.props;

		const userRolesOptions = generateOptions(Object.values(userRoles), 'key', 'value', 'hr', true, 'Odaberi');
		const translations = getTranslations();

		return (
			<form className='redux-form' onSubmit={onSubmit}>
				<div>
					<div className='redux-form__row'>
						<div className='w-50'>
							<label className='redux-form__label'>
								{translations.user.property.firstName}
								<span className='required'>*</span>
							</label>
							<Field
								name='firstName'
								placeholder={translations.patient.placeholder.enterFirstName}
								component={Input}
								type='text'
								disabled={disabled.firstName}
								className='mr-20'
							/>
						</div>

						<div className='w-50'>
							<label className='redux-form__label'>
								{translations.user.property.lastName}
								<span className='required'>*</span>
							</label>
							<Field
								name='lastName'
								placeholder={translations.patient.placeholder.enterLastName}
								component={Input}
								type='text'
								disabled={disabled.lastName}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-50'>
							<label className='redux-form__label'>
								{translations.user.property.email}
								<span className='required'>*</span>
							</label>
							<Field
								name='email'
								placeholder={translations.patient.placeholder.enterEmail}
								component={Input}
								type='text'
								disabled={disabled.MBO}
								className='mr-20'
							/>
						</div>

						<div className='w-50'>
							<label className='redux-form__label'>
								{translations.user.property.role}
								<span className='required'>*</span>
							</label>
							<Field
								name='role'
								component={Select}
								disabled={disabled.role}
								children={userRolesOptions}
								className='mr-20'
							/>
						</div>
					</div>

					{
						showPasswordInputs &&
            <PasswordInputs disabled={disabled} />
					}

				</div>
				{error && <div className='redux-form__error'>{error}</div>}      
				<div>
					{buttons}
				</div>
			</form>
		);
	}
}

export default UserForm;
