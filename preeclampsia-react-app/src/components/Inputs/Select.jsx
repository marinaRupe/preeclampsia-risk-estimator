import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  const {
    required = false,
    disabled = false,
    meta: { touched, error },
    children,
    className = '',
  } = props;

  const inputProps = props.input || {};
  const hasError = touched && error && (error.length > 0);

  return (
    <div className={`redux-form__select ${disabled ? 'disabled' : ''} ${className}`}>
      <select
        className='w-100'
        required={required}
        disabled={disabled}
        {...inputProps}
      >
        {children}
      </select>
      {hasError &&
        <div className='redux-form__error--field'>
          {error.map((e, index) => <div key={index}>{e}</div>)}
        </div>
      }
    </div>
  );
};

Select.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.array
  }),
  input: PropTypes.object,
  children: PropTypes.array.isRequired
};

export default Select;
