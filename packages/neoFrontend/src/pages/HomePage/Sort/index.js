import React, { useCallback } from 'react';
import { VIZ_INFO_SORT_OPTIONS } from 'vizhub-entities';
import { Container, Header, Form, Select, SelectLabel } from './styles';

export const Sort = ({ value, onChange }) => {
  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Container>
      <Header>VizHub Community</Header>
      <Form>
        <SelectLabel>Sort By</SelectLabel>
        <Select value={value} onChange={handleChange}>
          {VIZ_INFO_SORT_OPTIONS.map(({ id, label }) => (
            <option value={id}>{label}</option>
          ))}
        </Select>
      </Form>
    </Container>
  );
};
