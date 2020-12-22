import React, { 
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
} from 'react';
import { getVizTitle } from 'vizhub-presenters';
import { Button } from '../../../Button';
import { Modal } from '../../../Modal';
import { Input } from '../../../Input';
import {
  Dialog,
  DialogTitle,
  DialogButtons,
  FormRow,
  Section,
  SectionTitle
} from '../styles';
import { useValue } from '../../../useValue';
import { VizContext } from '../VizContext';
import { useForking } from './useForking';
import { withRouter } from 'react-router';

export const ForkingContext = createContext();

export const ForkingProvider = withRouter(({ fallback, children, history }) => {
  const { viz$ } = useContext(VizContext);

  const originalTitle = useValue(viz$, getVizTitle);

  const [forkTitle, setForkTitle] = useState(null);

  const [isForkModalOpen, setIsForkModalOpen] = useState(false);

  const hideForkModal = useCallback(() => setIsForkModalOpen(false), [setIsForkModalOpen]);

  const forkingContext = useMemo(() => {
    return {
      showForkModal: () => setIsForkModalOpen(true),
      hideForkModal
    }
  }, [hideForkModal, setIsForkModalOpen]);

  const { isForking, onFork } = useForking(history, { forkTitle });

  if (isForking) {
    return fallback
  }

  return (
    <>
     <ForkingContext.Provider value={forkingContext}>{children}</ForkingContext.Provider>
     {isForkModalOpen && (
       <Modal
        onClose={hideForkModal}
       >
         <Dialog>
          <DialogTitle>Fork Viz</DialogTitle>
          <Section>
            <SectionTitle>Viz name</SectionTitle>
            <FormRow>
              <Input
                size="grow"
                value={forkTitle || `Fork of ${originalTitle}`}
                onChange={setForkTitle}
              />
            </FormRow>
          </Section>
          <DialogButtons>
            <Button isFilled onClick={onFork}>
              Fork
            </Button>
            <Button onClick={hideForkModal}>
              Cancel
            </Button>
          </DialogButtons>
          </Dialog>
       </Modal>
     )}
    </>
  )
});
