import React, { useCallback } from 'react';
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
      <Header>
        <h1>VizHub Community</h1>
        {/* <h4>lorem ipsum</h4> */}
      </Header>
      <Form>
        <SelectLabel>Sort By</SelectLabel>
        <Select value={value} onChange={handleChange}>
          <option value="lastUpdatedTimestamp">Most recent</option>
          {/* <option value="upvotes"> Most upvoted</option> */}
          <option value="forksCount"> Most forked</option>
        </Select>
      </Form>
    </Container>
  );
};
