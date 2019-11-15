import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, placeholder, minDate, disabled }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
    // eslint-disable-next-line
  }, [ref.current, fieldName]);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        dateFormat="dd/MM/yyyy"
        ref={ref}
        onChange={date => setSelected(date)}
        placeholderText={placeholder}
        autoComplete="off"
        minDate={minDate}
        disabled={disabled}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.defaultProps = {
  disabled: false,
  minDate: null,
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.bool]),
  disabled: PropTypes.bool,
};
