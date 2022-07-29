/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useGetBand} from '@datastore';
import {displayNumber, getMaxBandMercenaries} from '@helper';
import {Interactive} from '@react-three/xr';

import {RealityBox} from '../atoms/RealityBox';

import {RealityText} from '../atoms/RealityText';

type T_Props = {
  noBandAction?: boolean
  bandActionText: string
  bandActionCallback: () => void
}

const RealityBandPanel: React.FC<T_Props> = ({bandActionCallback, bandActionText, noBandAction}) => {
  const band = useGetBand();

  return <group position={[0, 0, -1]}>
    <RealityText position={[0, 0.75, 0]} text={`${band?.name.substring(0, 8)}'s Band`} fontSize={0.25} color="gray" />

    <RealityText position={[-0.5, 0.55, 0]} text={`${band?.gold} Gold`} fontSize={0.08} color="gray" />
    <RealityText position={[0.5, 0.55, 0]} text={`${band?.actionPoints} AP`} fontSize={0.08} color="gray" />

    <RealityText position={[-0.5, 0.45, 0]} text={`${band?.mercenaryIds.length}/${getMaxBandMercenaries(band)} Mercenaries`} fontSize={0.08} color="gray" />
    <RealityText position={[0.5, 0.45, 0]} text={`${band?.daysUntilWages} days until wages are due`} fontSize={0.08} color="gray" />

    <RealityText position={[-0.5, 0.35, 0]} text={`Band level: ${displayNumber(band?.level, 2)}`} fontSize={0.08} color="gray" />
    {!noBandAction && <group position={[0.5, 0.35, 0]}>
      <Interactive onSelect={bandActionCallback}>
        <RealityBox args={[0.85, 0.075, 0.02]}>
          <meshBasicMaterial color="#ABB" />
          <RealityText text={bandActionText} color="black" fontSize={0.05} position={[0, 0, .02]} />
        </RealityBox>
      </Interactive>
    </group>}
  </group>;
};

RealityBandPanel.displayName = 'RealityBandPanel';
export {RealityBandPanel};
