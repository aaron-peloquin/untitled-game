import {useQuestRunner} from '@datastore';
import {displayNumber} from '@helper';
import {MutableRefObject, useMemo, useState} from 'react';
import {Mesh, Vector3} from 'three';
import {T_QuestResults} from 'TS_Quest';

import {RealityBox} from '../atoms/RealityBox';
import {RealityGoQuestButton} from '../atoms/RealityGoQuestButton';

import {RealityText} from '../atoms/RealityText';

type Props = {
  refSelectBox: MutableRefObject<Mesh | undefined>
}
const RealityQuestPanel: React.FC<Props> = ({refSelectBox}) => {
  const selectBoxPosition = useMemo(() => new Vector3(0, -0.3, .05), []);
  const goQuestPosition = useMemo(() => new Vector3(0, -0.34, .01), []);
  const boardPosition = useMemo(() => new Vector3(0, .1, -.001), []);
  const [questResults, setQuestResults] = useState<T_QuestResults>();
  const {questRunnerText} = useQuestRunner();

  return <>
    <group position={[0, 0, -1]}>
      <RealityBox color="#533" args={[1.5, 1, 0.001]} position={boardPosition} />
      {questResults && <>
        <RealityText text={questResults.outcome} fontSize={0.1} position={[0, .5, 0]} />
        <RealityText text={`Band: +${displayNumber(questResults.band.exp * 100)}% exp, +${questResults.band.gold} gold`} fontSize={0.05} position={[0, .4, 0]} />
        <RealityText text={`Mercenary: +${displayNumber(questResults.mercenary.exp * 100)}% exp`} fontSize={0.05} position={[0, .3, 0]} />
      </>}
      <RealityText position={[0, -.25, 0]} fontSize={0.05} color="black" text={questRunnerText} />
      <RealityGoQuestButton setQuestResults={setQuestResults} position={goQuestPosition} />
    </group>
    <RealityBox transparent opacity={0.5} color='navy' ref={refSelectBox} position={selectBoxPosition} args={[.25, .25, .05]}>
      <RealityText text='Select' position={[0, -.05, 0.03]} fontSize={0.075} />
      <RealityText text='(Grab &amp; drop here)' position={[0, -.1, 0.03]} fontSize={0.025} />
    </RealityBox>
  </>;
};

RealityQuestPanel.displayName = 'RealityQuestPanel';
export {RealityQuestPanel};
