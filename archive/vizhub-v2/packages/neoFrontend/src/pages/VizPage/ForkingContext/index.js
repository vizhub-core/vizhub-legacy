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
  SectionTitle,
  SectionDescription,
} from '../styles';
import { useValue } from '../../../useValue';
import { VizContext } from '../VizContext';
import { useForking } from './useForking';
import { withRouter } from 'react-router';

export const ForkingContext = createContext();

export const ForkingProvider = withRouter(({ fallback, children, history }) => {
  const [isForkModalOpen, setIsForkModalOpen] = useState(false);

  const hideForkModal = useCallback(() => setIsForkModalOpen(false), [
    setIsForkModalOpen,
  ]);

  const forkingContext = useMemo(() => {
    return {
      showForkModal: () => setIsForkModalOpen(true),
      hideForkModal,
    };
  }, [hideForkModal, setIsForkModalOpen]);

  const { viz$ } = useContext(VizContext);

  const originalTitle = useValue(viz$, getVizTitle);

  const [userTitle, setUserTitle] = useState(null);

  const forkTitle = userTitle === null ? `Fork of ${originalTitle}` : userTitle;
  const isEmptyStringTitle = forkTitle === '';

  const { isForking, onFork } = useForking(history, { forkTitle });

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!isEmptyStringTitle) {
        onFork();
      }
    },
    [isEmptyStringTitle, onFork]
  );

  if (isForking) {
    return fallback;
  }

  return (
    <>
      <ForkingContext.Provider value={forkingContext}>
        {children}
      </ForkingContext.Provider>
      {isForkModalOpen && (
        <Modal onClose={hideForkModal}>
          <Dialog>
            <DialogTitle>Fork Viz</DialogTitle>
            <Section>
              <SectionTitle>Viz name</SectionTitle>
              <SectionDescription>
                Choose a name for your new viz.
              </SectionDescription>
              <form onSubmit={handleSubmit}>
                <FormRow>
                  <Input
                    size="grow"
                    value={forkTitle}
                    onChange={setUserTitle}
                  />
                </FormRow>
              </form>
            </Section>
            <DialogButtons>
              {!isEmptyStringTitle && (
                <Button isFilled onClick={onFork}>
                  Fork
                </Button>
              )}
              <Button isRed onClick={hideForkModal}>
                Cancel
              </Button>
            </DialogButtons>
          </Dialog>
        </Modal>
      )}
    </>
  );
});
