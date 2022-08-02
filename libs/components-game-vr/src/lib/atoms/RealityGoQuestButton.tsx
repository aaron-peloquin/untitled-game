import {useQuestRunner} from '@datastore';
import {Interactive} from '@react-three/xr';
import {Dispatch, SetStateAction, useCallback, useMemo} from 'react';
import {Vector3} from 'three';
import {T_QuestResults} from 'TS_Quest';

import {RealityBox} from './RealityBox';
import {RealityText} from './RealityText';

type T_Props = {
  setQuestResults: Dispatch<SetStateAction<T_QuestResults | undefined>>
  position?: Vector3
}

const RealityGoQuestButton: React.FC<T_Props> = ({
  setQuestResults,
  position,
}) => {
  const {apCost, hasEnoughAp, runQuest, mercenary, quest} = useQuestRunner();

  const handleRunQuest = useCallback(() => {
    if (hasEnoughAp) {
      const results = runQuest();
      setQuestResults(results);
    }
  }, [hasEnoughAp, runQuest, setQuestResults]);
  const showRunButton = mercenary && quest;

  return showRunButton && <Interactive onSelect={handleRunQuest}>
    <RealityBox args={[0.85, 0.075, 0.02]} position={position}>
      <meshBasicMaterial color="#ABB" />
      <RealityText text={`Send Mercenary (${hasEnoughAp ? `${apCost} AP` : `Rest to regain AP`})`} color="black" fontSize={0.05} position={[0, 0, .02]} />
    </RealityBox>
  </Interactive>;
};

RealityGoQuestButton.displayName = 'RealityGoQuestButton';

export {RealityGoQuestButton};
