import {useGetQuestStats, useSetSelectedQuestId} from '@datastore';
import {useRealityQuestDropActions} from '@helper';
import {Plane} from '@react-three/drei';
import {questData} from '@static';
import {MutableRefObject, useMemo} from 'react';
import {Mesh, Vector3} from 'three';
import {T_Quest} from 'TS_Quest';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

type Props = {
  refSelectQuestBox: MutableRefObject<Mesh | undefined>
  quest: T_Quest
  offset: number
}

const RealityLocationQuest: React.FC<Props> = ({quest, offset, refSelectQuestBox}) => {
  const {isSelected, setSelected} = useSetSelectedQuestId(quest.questId);
  const questType = questData[quest.type].label;
  const questStats = useGetQuestStats(quest);
  const {isGrabbed, refGrabbableBox} = useRealityQuestDropActions(refSelectQuestBox, setSelected, isSelected);

  const mainPosition = useMemo(() => new Vector3(-.11 * offset, -.075 * offset, 0), [offset]);
  const currentColor = (isSelected ? 'teal' : (isGrabbed ? 'darkred' : questStats.textColorEthnicity));

  return <RealityBox color={currentColor} ref={refGrabbableBox} position={mainPosition}>
    <RealityText fontSize={.025} text={`${questType}${isSelected ? '*' : ''}`} position={[0, .035, 0.055]} />
    <RealityText fontSize={.025} text={`${quest.targetName}`} position={[0, .01, 0.055]} />
    <Plane args={[0.1, 0.04, 1]} position={[0, -.03, 0.0501]}>
      <meshBasicMaterial color="black" />
      <RealityText fontSize={0.015} position={[0, 0, 0.001]} color={questStats.textColorProfession} text={`${questStats?.ethnicity} ${questStats?.profession}`} />
    </Plane>
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.051, 0]}>
      <group position={[-0.025, 0.01, 0]}>
        <RealityText fontSize={0.01} text="Level" position={[0, 0.02, 0]} />
        <RealityText fontSize={0.02} text={quest.level.toString()} />
      </group>
    </group>
  </RealityBox>;
};

RealityLocationQuest.displayName = 'RealityLocationQuest';
export {RealityLocationQuest};
