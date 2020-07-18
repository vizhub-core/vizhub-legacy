import React, { useCallback } from 'react';
import { VISUALIZATION_INFO_SORT_OPTIONS } from 'vizhub-entities';
import { Container, Header, Form, Select, SelectLabel } from './styles';

export const ENABLED_SORT_OPTIONS = {
  defaultOption: VISUALIZATION_INFO_SORT_OPTIONS.mostRecent,
  mostRecent: VISUALIZATION_INFO_SORT_OPTIONS.mostRecent,
  mostForked: VISUALIZATION_INFO_SORT_OPTIONS.mostForked
};

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
          <option value={ENABLED_SORT_OPTIONS.mostRecent}>Most recent</option>
          {/* <option value={ENABLED_SORT_OPTIONS.mostUpvoted}> Most upvoted</option> */}
          <option value={ENABLED_SORT_OPTIONS.mostForked}> Most forked</option>
        </Select>
      </Form>
    </Container>
  );
};
