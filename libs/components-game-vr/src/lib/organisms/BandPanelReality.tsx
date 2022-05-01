import {useGetBand} from '@datastore';

import {RealityCard} from '../atoms/RealityCard';

const BandPanelReality: React.FC = () => {
  const band = useGetBand();
  // const bandMercenaries = useListMercenariesById(band?.mercenaryIds);
  // const bandLocation = useGetLocation(band?.currentLocationId);

  return <RealityCard layer="2" heading={`${band?.name}'s Band has ${band?.gold} gold`}>
    {/** */}
  </RealityCard>;
};

BandPanelReality.displayName = 'BandPanelReality';
export {BandPanelReality};