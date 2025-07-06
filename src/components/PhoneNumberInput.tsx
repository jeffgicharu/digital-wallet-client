'use client';

import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

// This function formats the phone number value as the user types.
const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // 1. Remove all non-digit characters from the input.
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  // 2. Apply the mask "XXX-XXX-XXX-XXX" based on the number of digits.
  if (phoneNumberLength === 0) return '';
  if (phoneNumberLength <= 3) return phoneNumber;
  if (phoneNumberLength <= 6) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  if (phoneNumberLength <= 9) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  }
  // Limit to 12 digits as per the example format.
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 9)}-${phoneNumber.slice(9, 12)}`;
};

const PhoneNumberInput = (props: TextFieldProps) => {
  const { onChange, name } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(event.target.value);

    if (onChange) {
      // The parent's generic handler expects an event-like object 
      // with target.name and target.value.
      const syntheticEvent = {
        target: {
          name: name, // Pass the original name
          value: formattedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return <TextField {...props} type="tel" onChange={handleChange} inputProps={{ maxLength: 15 }} />; // 12 digits + 3 hyphens
};

export default PhoneNumberInput;