import {useCurrentSave} from '@helper';
import MercenaryList from '../molecules/MercenaryList';

const BandPanel = () => {
  const game = useCurrentSave();
  const mercenaries = game?.band.mercenaries;

  return <>
    <h2>{game?.band.name}</h2>
    <p>You have {game?.band.gold} gold in your pouch</p>
    {mercenaries?.length ? <MercenaryList mercenaries={mercenaries} /> : null}
  </>;
};

export default BandPanel;
