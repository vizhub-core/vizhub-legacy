import React, { useState, useEffect } from 'react';
import {
  showCollaboratorsAnyoneCanEdit,
  showCollaboratorsManagement,
} from '../../../../featureFlags';
import { Input } from '../../../../Input';
import {
  UserPreviewList,
  useUserPreviewController,
  useUsers
} from '../../../../UserPreviewList';
import { SubSectionDescription, FormRow } from '../../styles';
import { AnyoneCanEdit } from './AnyoneCanEdit';
import { useCollaborators } from './useCollaborators';
import { CollaboratorList } from './CollaboratorList';

export const CollaboratorsBody = () => {
  const [typedText, setTypedText] = useState('');

  const users = useUsers(typedText);
  const {
    activeUser,
    selectedUser,
    handleKeyDown,
    handleUserSelect,
  } = useUserPreviewController(users);

  const {
    collaborators,
    addCollaborator,
    removeCollaborator,
  } = useCollaborators();

  useEffect(() => {
    if (selectedUser){
      addCollaborator(selectedUser.id);
      setTypedText('');
    }
  },[selectedUser, addCollaborator]);

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
            <FormRow tabIndex="-1" onKeyDown={handleKeyDown}>
              <Input value={typedText} onChange={setTypedText} size="grow" />
              <UserPreviewList
                user={activeUser}
                users={users}
                onSelect={handleUserSelect}
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
