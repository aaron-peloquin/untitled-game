import {useGetMercenaryStats, useSetInspectMercenaryId, useSetSelectMercenaryId} from '@datastore';
import {displayNumber, useRealityMercenaryDropActions} from '@helper';
import {MutableRefObject, useMemo} from 'react';
import {Mesh, Vector3} from 'three';
import {T_Mercenary} from 'TS_Mercenary';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

type Props = {
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
  refInspectMercenaryBox: MutableRefObject<Mesh | undefined>
  mercenary: T_Mercenary
  offset: number
}

const RealityMercenary: React.FC<Props> = ({refSelectMercenaryBox, refInspectMercenaryBox, mercenary, offset}) => {
  const {currentHealth, level, mercenaryId, name, statsVisible} = mercenary || {};
  const {textColorEthnicity, _goldUpkeep, ethnicity, profession, attack, cunning, subtlety, endurance, maxHealth} = useGetMercenaryStats(mercenary) || {};
  const {isSelected, setSelected} = useSetSelectMercenaryId(mercenaryId);
  const {isInspecting, setInspect} = useSetInspectMercenaryId(mercenaryId);
  const {isGrabbed, refGrabbableBox} = useRealityMercenaryDropActions(refSelectMercenaryBox, refInspectMercenaryBox, setSelected, setInspect, isSelected, isInspecting);

  const boxPosition = useMemo(() => {
    const offsetRow = Math.floor(offset / 4);
    const offsetColumn = (offset % 4) + 1;
    return new Vector3(-.125 * offsetColumn, -.125 * offsetRow, 0);
  }, [offset]); const currentColor = (isSelected ? 'teal' : (isGrabbed ? 'forestgreen' : textColorEthnicity));

  return <RealityBox color={currentColor} ref={refGrabbableBox} position={boxPosition}>
    {/** front face group */}
    <group>
      <RealityText text={`${name}${isSelected ? '*' : ''}${isInspecting ? '^' : ''}`} fontSize={.05} position={[0, .01, 0.0505]} />
      <RealityText text={`${ethnicity} ${profession}`} position={[0, -.03, 0.0505]} fontSize={0.025} />
    </group>
    {statsVisible && <>
      {/** top face group */}
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.051, 0]}>
        <group position={[-0.025, 0.014, 0]}>
          <RealityText fontSize={0.01} text="Attack" position={[0, 0.019, 0]} />
          <RealityText fontSize={0.019} text={`${attack}`} />
        </group>
        <group position={[0.025, 0.014, 0]}>
          <RealityText fontSize={0.01} text="Cunning" position={[0, 0.019, 0]} />
          <RealityText fontSize={0.019} text={`${cunning}`} />
        </group>
        <group position={[-0.025, -0.03, 0]}>
          <RealityText fontSize={0.009} text="Subtlety" position={[0, 0.019, 0]} />
          <RealityText fontSize={0.019} text={`${subtlety}`} />
        </group>
        <group position={[0.025, -0.03, 0]}>
          <RealityText fontSize={0.009} text="Endurance" position={[0, 0.019, 0]} />
          <RealityText fontSize={0.019} text={`${endurance}`} />
        </group>
      </group>
      {/** bottom face group */}
      <group rotation={[Math.PI / 2, 0, 0]} position={[0, -0.051, 0]}>
        <RealityText fontSize={0.03} text="Wages" position={[0, 0.018, 0]} />
        <RealityText fontSize={0.02} text={`${_goldUpkeep} gold`} position={[0, -0.018, 0]} />
      </group>
      {/** left face group */}
      <group rotation={[0, -Math.PI / 2, 0]} position={[-0.051, 0, 0]}>
        <RealityText fontSize={0.04} text="Level" position={[0, 0.018, 0]} />
        <RealityText fontSize={0.04} text={displayNumber(level, 2)} position={[0, -0.018, 0]} />
      </group>
      {/** right face group */}
      <group rotation={[0, Math.PI / 2, 0]} position={[0.051, 0, 0]}>
        <RealityText fontSize={0.025} text="Health" position={[0, 0.03, 0]} />
        <RealityText fontSize={0.025} text={`${(currentHealth / maxHealth * 100).toFixed(0)}%`} position={[0, 0.005, 0]} />
        <RealityText fontSize={0.02} text={`Max: ${maxHealth}`} position={[0, -0.03, 0]} />
      </group>
    </>}
  </RealityBox>;
};

RealityMercenary.displayName = 'RealityMercenary';
export {RealityMercenary};
