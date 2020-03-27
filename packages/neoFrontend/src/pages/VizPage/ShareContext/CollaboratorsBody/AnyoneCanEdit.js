import React, { useCallback, useContext } from 'react';
import { getVizAnyoneCanEdit, anyoneCanEditChangeOp } from 'vizhub-presenters';
import { CheckBox } from '../../CheckBox';
import { useValue } from '../../../../useValue';
import { RealtimeModulesContext } from '../../RealtimeModulesContext';
import { VizContext } from '../../VizContext';

export const AnyoneCanEdit = () => {
  const { viz$, submitVizInfoOp } = useContext(VizContext);
  const realtimeModules = useContext(RealtimeModulesContext);
  const vizAnyoneCanEdit = useValue(viz$, getVizAnyoneCanEdit);
  console.log(vizAnyoneCanEdit);
  const setVizAnyoneCanEdit = useCallback(
    newVizAnyoneCanEdit => {
      submitVizInfoOp(
        anyoneCanEditChangeOp(
          viz$.getValue().info.anyoneCanEdit,
          newVizAnyoneCanEdit,
          realtimeModules
        )
      );
    },
    [submitVizInfoOp, realtimeModules, viz$]
  );

  const onClick = useCallback(() => {
    setVizAnyoneCanEdit(!vizAnyoneCanEdit);
  }, [setVizAnyoneCanEdit, vizAnyoneCanEdit]);

  return (
    <CheckBox
      label="Anyone can edit."
      isActive={vizAnyoneCanEdit}
      onClick={onClick}
    />
  );
};
