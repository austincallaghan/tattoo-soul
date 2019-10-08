import React from 'react';

export const Checkbox = ({
  type = 'checkbox',
  name,
  checked = false,
  onChange,
}) => (
  <input
    className="checkbox"
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
  />
);
