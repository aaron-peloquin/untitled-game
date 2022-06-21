import {useGetMercenaryStats, useSetSelectMercenaryId} from '@datastore';
import {displayNumber, useRealityMercenaryDropActions} from '@helper';
import {Plane} from '@react-three/drei';
import {MutableRefObject, useMemo} from 'react';
import {Mesh, Vector3} from 'three';
import {T_Mercenary} from 'TS_Mercenary';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

type Props = {
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
  mercenary: T_Mercenary
  offset: number
}

const RealityMercenary: React.FC<Props> = ({refSelectMercenaryBox, mercenary, offset}) => {
  const {currentHealth, level, mercenaryId, name, statsVisible} = mercenary || {};
  const {textColorEthnicity, textColorProfession, _goldUpkeep, ethnicity, profession, attack, cunning, subtlety, endurance, maxHealth} = useGetMercenaryStats(mercenary) || {};
  const {isSelected, setSelected} = useSetSelectMercenaryId(mercenaryId);
  const {isGrabbed, refGrabbableBox} = useRealityMercenaryDropActions(refSelectMercenaryBox, setSelected, isSelected);

  const boxPosition = useMemo(() => {
    const offsetRow = Math.floor(offset / 3);
    const offsetColumn = (offset % 3) + 1;
    return new Vector3(-.2 * offsetColumn, -.2 * offsetRow, 0);
  }, [offset]);
  const currentColor = isGrabbed ? 'teal' : textColorEthnicity;

  return <RealityBox color={currentColor} ref={refGrabbableBox} position={boxPosition} transparent opacity={isSelected ? 1 : 0.8}>
    {/** front face group */}
    <group>
      <RealityText text={`${name}${isSelected ? '*' : ''}`} fontSize={.025} position={[0, .01, 0.0505]} />
      <Plane args={[0.092, 0.03, 1]} position={[0, -.03, 0.0501]}>
        <meshBasicMaterial color="#222" transparent opacity={0.75} />
        <RealityText fontSize={0.0135} position={[0, 0, 0.0001]} color={textColorProfession} text={`${ethnicity} ${profession}`} />
      </Plane>
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
          <RealityText fontSize={0.009} text="Endurance" position={[0, 0.019, 0]} />
          <RealityText fontSize={0.019} text={`${endurance}`} />
        </group>
        <group position={[0.025, -0.03, 0]}>
          <RealityText fontSize={0.009} text="Subtlety" position={[0, 0.019, 0]} />
          <RealityText fontSize={0.019} text={`${subtlety}`} />
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
