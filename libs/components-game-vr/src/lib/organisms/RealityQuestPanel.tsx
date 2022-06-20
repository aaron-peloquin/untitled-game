import {useQuestRunner} from '@datastore';
import {Plane} from '@react-three/drei';
import {MutableRefObject, useMemo} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';

import {RealityText} from '../atoms/RealityText';

type Props = {
  refSelectBox: MutableRefObject<Mesh | undefined>
}
const RealityQuestPanel: React.FC<Props> = ({refSelectBox}) => {
  // const band = useGetBand();
  // const bandLocation = useGetLocation(band?.currentLocationId);
  const selectBoxPosition = useMemo(() => new Vector3(0, -0.3, .05), []);
  const {questRunnerText} = useQuestRunner();

  return <>
    <group position={[0, 0, -1]}>
      <Plane position={[0, .1, -.001]} args={[1.5, 1, 1]}>
        <meshBasicMaterial color="#644" />
        {/* <RealityText position={[0, 2.05, 0]} text={`${band?.name.substring(0, 8)}'s Mercenary Band (lvl: ${displayNumber(band?.level, 2)})`} fontSize={0.75} />
      <RealityText position={[-2, 1.25, 0]} text={`${band?.gold} Gold`} />
      <RealityText position={[2, 1.25, 0]} text={`${band?.actionPoints} AP`} />
      <RealityText position={[0, .75, 0]} text={`${band?.mercenaryIds.length}/${getMaxBandMercenaries(band)} Mercenaries, ${band?.daysUntilWages} days until wages are due`} /> */}
      </Plane>
      <RealityText position={[0, -.35, 0]} fontSize={0.05} color="black" text={questRunnerText} />
    </group>
    <RealityBox transparent opacity={0.5} color='orange' ref={refSelectBox} position={selectBoxPosition} args={[.25, .25, .05]}>
      <RealityText text='Select' position={[0, -.05, 0.03]} fontSize={0.075} />
      <RealityText text='(Grab &amp; drop here)' position={[0, -.1, 0.03]} fontSize={0.025} />
    </RealityBox>
  </>;
};

RealityQuestPanel.displayName = 'RealityQuestPanel';
export {RealityQuestPanel};
