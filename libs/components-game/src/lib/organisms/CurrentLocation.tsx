import {gameDataContext} from '@helper';
import {useContext} from 'react';
import MercenaryList from '../molecules/MercenaryList';
import QuestList from '../molecules/QuestList';

const CurrentLocation = () => {
  const {currentLocation, bandController} = useContext(gameDataContext);
  const band = bandController?.data;

  return <>
    You're at the local tavern in <strong>{currentLocation.name}</strong>, there are both recruits and citizens with quests available here. This town is good for level {currentLocation.levelRanges[0]} to {currentLocation.levelRanges[1]}
    <h3>Mercenaries for hire</h3>
    <MercenaryList hideEnlisted mercenaries={currentLocation.mercenaries} />
    <h3>Quests</h3>
    {band?.mercenaries.length ? <QuestList quests={currentLocation.quests} /> : null}
  </>;
};

export default CurrentLocation;
