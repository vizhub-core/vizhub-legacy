import React, { useCallback } from 'react';
import { VIZ_INFO_SORT_OPTIONS } from 'vizhub-entities';
import { Select, SelectLabel } from './styles';

export const VizzesSortForm = ({ value, onChange }) => {
  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  console.log(VIZ_INFO_SORT_OPTIONS);

  return (
    <form>
      <SelectLabel>Sort vizzes by</SelectLabel>
      <Select value={value} onChange={handleChange}>
        {VIZ_INFO_SORT_OPTIONS.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </Select>
    </form>
  );
};
