import { navigateToCreateVizPage } from './navigateToCreateVizPage';
import { createVizFromScratch } from './createVizFromScratch';
import { fork } from './fork';

export const vizCreation = (my) => () => {
  describe('Create Visualization', () => {
    it('should navigate to create viz page', navigateToCreateVizPage(my));
    it('should create viz from scratch', createVizFromScratch(my));
  });

  describe('Fork Visualization', () => {
    it('should fork visualization', fork(my));
  });
};
