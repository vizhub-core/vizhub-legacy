import React, { useState, useCallback } from 'react';
import {
  showCollaboratorsAnyoneCanEdit,
  showCollaboratorsManagement,
} from '../../../../featureFlags';
import { Input } from '../../../../Input';
import { UserPreviewList, useUsers } from '../../../../UserPreviewList';
import { SubSectionDescription, FormRow } from '../../styles';
import { AnyoneCanEdit } from './AnyoneCanEdit';
import { useCollaborators } from './useCollaborators';
import { CollaboratorList } from './CollaboratorList';

export const CollaboratorsBody = () => {
  const [typedText, setTypedText] = useState('');

  const users = useUsers(typedText);

  const {
    collaborators,
    addCollaborator,
    removeCollaborator,
  } = useCollaborators();

  const handleAddCollaboratorClick = useCallback(
    ({ id }) => {
      addCollaborator(id);
      setTypedText('');
    },
    [addCollaborator]
  );

  return (
    <>
      {showCollaboratorsManagement ? (
        <>
          <CollaboratorList
            collaborators={collaborators}
            removeCollaborator={removeCollaborator}
          />
          <form>
            <SubSectionDescription>
              Start typing to search for collaborators to add.
            </SubSectionDescription>
            <FormRow>
              <Input value={typedText} onChange={setTypedText} size="grow" />
              <UserPreviewList
                users={users}
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
