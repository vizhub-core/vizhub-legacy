import React, { useCallback } from 'react';
import { Container, Header, Form, Select } from './styles';

export const Sort = ({ value, onChange }) => {
  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Container>
      <Header>
        <h1>VizHub Community</h1>
        {/* <h4>lorem ipsum</h4> */}
      </Header>
      <Form>
        Sort By
        <Select value={value} onChange={handleChange}>
          <option value="lastUpdatedTimestamp">recently updated</option>
          <option value="upvotes"> most upvoted</option>
          <option value="forksCount"> most forked</option>
        </Select>
      </Form>
    </Container>
  );
};
