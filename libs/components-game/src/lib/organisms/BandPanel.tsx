import {db, useCurrentSave} from '@helper';
import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import MercenaryList from '../molecules/MercenaryList';

const BandPanel = () => {
  const game = useCurrentSave();
  const mercenaryIds = game?.band.mercenaries || [];
  const mercenaries = useLiveQuery(() => IS_SSR ? [] : db.mercenaries.where('id').anyOf(mercenaryIds).toArray(), [mercenaryIds]);

  return <>
    <strong>{game?.band.name}</strong>
    <p>You have {game?.band.gold.toLocaleString('en-US')} gold in your pouch</p>
    {mercenaries?.length ? <MercenaryList fullStats mercenaries={mercenaries} /> : null}
  </>;
};

export default BandPanel;
