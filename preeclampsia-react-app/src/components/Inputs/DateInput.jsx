import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import { DATE_FORMAT_DATE_PICKER, DATE_FORMAT_LONG_DASHES } from 'constants/dateTimeFormat.constants';
import { formatDate, toDate } from 'utils/dateTime.utils';
import { getTranslations } from 'utils/translation.utils';

import 'react-datepicker/dist/react-datepicker.css';

const getWeekShortTranslation = (weekName) => {
	return getTranslations().dateTime.week.short[weekName.toLowerCase()];
};

class DateInput extends React.Component {

	handleChange = (/** @type {Date} */changedDate, event) => {
		const inputProps = this.props.input || {};

		if (!inputProps.onChange) {
			console.error('Missing input on change callback');
			return;
		}
		event.target.value = changedDate && formatDate(changedDate, DATE_FORMAT_LONG_DASHES);
		inputProps.onChange(event);
	}

	render () {
		const {
			required = false,
			disabled = false,
			maxDate,
			meta: { touched, error },
			children,
			className = '',
		} = this.props;

		const inputProps = this.props.input || {};
		const hasError = touched && error && (error.length > 0);

		const value = toDate(inputProps.value, DATE_FORMAT_LONG_DASHES);

		return (
			<div className={`redux-form__input ${disabled ? 'disabled' : ''} ${className}`}>
				<DatePicker
					className='redux-form__input--date'
					selected={value}
					required={required}
					disabled={disabled}
					maxDate={maxDate}
					onChange={this.handleChange}
					dateFormat={DATE_FORMAT_DATE_PICKER}
					formatWeekDay={getWeekShortTranslation}
				>
					{children}
				</DatePicker>
				{hasError &&
					<div className='redux-form__error--field'>
						{error.map((e, index) => <div key={index}>{e}</div>)}
					</div>
				}
			</div>
		);
	}
}

DateInput.propTypes = {
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	maxDate: PropTypes.instanceOf(Date),
	className: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.array
	}),
	input: PropTypes.object,
	children: PropTypes.array.isRequired
};

export default DateInput;
