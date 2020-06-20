import React, { useState, useCallback } from 'react';
import {
  showCollaboratorsAnyoneCanEdit,
  showCollaboratorsManagement,
} from '../../../../featureFlags';
import { Input } from '../../../../Input';
import { UserPreviewList } from '../../../../UserPreviewList';
import { SubSectionDescription, FormRow } from '../../styles';
import { AnyoneCanEdit } from './AnyoneCanEdit';
import { useCollaborators } from './useCollaborators';
import { CollaboratorList } from './CollaboratorList';

export const CollaboratorsBody = () => {
  const [typedText, setTypedText] = useState('');
  const [suggestedCollaborators, setSuggestedCollaborators] = useState([]);

  const {
    collaborators,
    addCollaborator,
    removeCollaborator,
  } = useCollaborators();

  const handleAddCollaboratorClick = useCallback(
    (user) => {
      addCollaborator(user.id);
      setTypedText('');
      setSuggestedCollaborators([]);
    },
    [addCollaborator]
  );

  // Support hitting the enter key to select first result.
  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (suggestedCollaborators.length > 0) {
        handleAddCollaboratorClick(suggestedCollaborators[0]);
      }
    },
    [suggestedCollaborators, handleAddCollaboratorClick]
  );

  return (
    <>
      {showCollaboratorsManagement ? (
        <>
          <CollaboratorList
            collaborators={collaborators}
            removeCollaborator={removeCollaborator}
          />
          <form onSubmit={handleFormSubmit}>
            <SubSectionDescription>
              Start typing to search for collaborators to add.
            </SubSectionDescription>
            <FormRow>
              <Input value={typedText} onChange={setTypedText} size="grow" />
              <UserPreviewList
                query={typedText}
                onBeforeShowSuggestions={setSuggestedCollaborators}
                onSelect={handleAddCollaboratorClick}
              />
            </FormRow>
          </form>
        </>
      ) : null}
      {showCollaboratorsAnyoneCanEdit ? (
        <>
          <SubSectionDescription>
            If you check this box, anyone with the link can edit this viz.
          </SubSectionDescription>
          <AnyoneCanEdit />
        </>
      ) : null}
    </>
  );
};
