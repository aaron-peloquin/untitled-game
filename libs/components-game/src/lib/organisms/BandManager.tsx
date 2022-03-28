import {gameDataContext} from '@helper';
import {useContext} from 'react';
import MercenaryList from '../molecules/MercenaryList';

const BandManager = () => {
  const {bandController} = useContext(gameDataContext);
  
  return <>
    <h2>{bandController.data.name}</h2>
    <p>You have {bandController.data.gold} gold in your pouch</p>
    <MercenaryList mercenaries={bandController.data.mercenaries} />
  </>;
};

export default BandManager;
