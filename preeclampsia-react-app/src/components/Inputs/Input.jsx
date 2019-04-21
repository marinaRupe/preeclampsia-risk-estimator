import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    type,
    placeholder = '',
    required = false,
    disabled = false,
    className = '',
    meta: { touched = false, error = '' }
  } = props;

  const inputProps = props.input || {};
  const hasError = touched && error && (error.length > 0);

  return (
    <div className='pr-10'>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`redux-form__input ${className} ${hasError ? 'error' : ''}`}
        {...inputProps}
      />
      {hasError &&
        <div className='redux-form__error--field'>
          {error.map((e, index) => <div key={index}>{e}</div>)}
        </div>
      }
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.array
  }),
  input: PropTypes.object
};

export default Input;
