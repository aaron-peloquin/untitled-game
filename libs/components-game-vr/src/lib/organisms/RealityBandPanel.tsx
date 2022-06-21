/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useGetBand} from '@datastore';
import {displayNumber, getMaxBandMercenaries} from '@helper';

import {RealityText} from '../atoms/RealityText';

const RealityBandPanel: React.FC = () => {
  const band = useGetBand();
  // const bandLocation = useGetLocation(band?.currentLocationId);

  return <group position={[0, 0, -1]}>
    <RealityText position={[0, 0.75, 0]} text={`${band?.name.substring(0, 8)}'s Band`} fontSize={0.25} color="gray" />
    <RealityText position={[-0.75, 0.6, 0]} text={`${band?.gold} Gold`} fontSize={0.08} color="gray" />
    <RealityText position={[0, 0.6, 0]} text={`Band level: ${displayNumber(band?.level, 2)}`} fontSize={0.08} color="gray" />
    <RealityText position={[0.75, 0.6, 0]} text={`${band?.actionPoints} AP`} fontSize={0.08} color="gray" />
    <RealityText position={[-0.5, 0.5, 0]} text={`${band?.mercenaryIds.length}/${getMaxBandMercenaries(band)} Mercenaries`} fontSize={0.08} color="gray" />
    <RealityText position={[0.5, 0.5, 0]} text={`${band?.daysUntilWages} days until wages are due`} fontSize={0.08} color="gray" />
  </group>;
};

RealityBandPanel.displayName = 'RealityBandPanel';
export {RealityBandPanel};
