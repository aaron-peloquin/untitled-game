import {useGetQuestStats, useSetSelectedQuestId} from '@datastore';
import {displayNumber, useRealityQuestDropActions} from '@helper';
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

  const boxPosition = useMemo(() => {
    const offsetRow = Math.floor(offset / 4);
    const offsetColumn = (offset % 4) + 1;
    return new Vector3(-.125 * offsetColumn, -.125 * offsetRow, 0);
  }, [offset]);
  const currentColor = isGrabbed ? 'teal' : questStats.textColorEthnicity;

  return <RealityBox color={currentColor} ref={refGrabbableBox} position={boxPosition} transparent opacity={isSelected ? 1 : 0.8}>
    <RealityText fontSize={.025} text={`${questType}${isSelected ? '*' : ''}`} position={[0, .035, 0.0501]} />
    <RealityText fontSize={.02} text={`${quest.targetName}`} position={[0, .014, 0.0501]} />
    <Plane args={[0.092, 0.03, 1]} position={[0, -.03, 0.0501]}>
      <meshBasicMaterial color="#222" transparent opacity={0.75} />
      <RealityText fontSize={0.0135} position={[0, 0, 0.0001]} color={questStats.textColorProfession} text={`${questStats?.ethnicity} ${questStats?.profession}`} />
    </Plane>
    <group rotation={[0, Math.PI / 2, 0]} position={[0.051, 0, 0]}>
      <RealityText fontSize={0.04} text="Level" position={[0, 0.018, 0]} />
      <RealityText fontSize={0.04} text={displayNumber(quest.level, 2)} position={[0, -0.018, 0]} />
    </group>
  </RealityBox>;
};

RealityLocationQuest.displayName = 'RealityLocationQuest';
export {RealityLocationQuest};
