import {useCallback, useEffect, useMemo, useState} from 'react';

import {generateQuest} from '@quest';
import {generateMercenary} from '@mercenary';
import {seedGenerator} from '@helper';

const Test = () => {
  const [currentSeed, setSeed] = useState<string>('randomization seed');
  const handleChangeSeed = useCallback((e: {target: {value: string}}) => {
    setSeed(e.target.value);
  }, []);

  const seededMercenary = useMemo(() => generateMercenary(seedGenerator(currentSeed)), [currentSeed]);
  const seededQuest = useMemo(() => generateQuest(seedGenerator(currentSeed)), [currentSeed]);

  const [questResult, setQuestResult] = useState<any>();
  const [forceNewQuest, setRandQuest] = useState<number>(0);
  const [forceNewMercenary, setRandMercenary] = useState<number>(0);

  const newQuest = useCallback(()=>setRandQuest(Math.random()), []);
  const newMercenary = useCallback(()=>setRandMercenary(Math.random()), []);

  const mercenary = useMemo(() => seededMercenary(1, 3), [forceNewMercenary, seededMercenary]);
  const quest = useMemo(() => seededQuest(1, 3), [forceNewQuest, seededQuest]);

  const doQuest = useCallback(() => {
    setQuestResult({outcome: 'Thinking...'});
    // fake loading time
    setTimeout(() => {
      const questResult = quest.run(mercenary);
      setQuestResult(questResult);
    }, 250);
  }, [mercenary, quest]);

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    doQuest();
  }, [doQuest]);

  useEffect(doQuest, [doQuest]);

  return <>
    <h1>Form</h1>
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Game Settings</legend>
        <label htmlFor="currentSeed">Randomization Seed: </label>
        <input id="currentSeed" value={currentSeed} onChange={handleChangeSeed} />
        <p><em>Two global seed-based number generators are created. One for Quests, the other for Mercenaries</em></p>
      </fieldset>
      <fieldset>
        <legend>Game Controls</legend>
        <div>
          <button type="button" onClick={newQuest}>New Quest</button>
          <button type="button" onClick={newMercenary}>New Mercenary</button>
        </div>
        <div>
          <button type="submit">Attempt Quest</button>
        </div>
      </fieldset>
    </form>
    <h1>Quest</h1>
    <h2>{quest.type}</h2>
    <h3>Challenge: {Math.round(quest.level)} <em>({quest.level})</em></h3>
    {/* eslint-disable-next-line max-len*/}
    <p>I want you to {quest.type} a {quest.target.profession} {quest.target.ethnicity} named {quest.target.name}</p>

    <h1>Mercenary</h1>
    <h2>{mercenary.name}</h2>
    <p>A level {mercenary.level} {mercenary.ethnicity} {mercenary.profession}. They have {mercenary.health} hp and attack for {mercenary.damage[0]} - {mercenary.damage[1]} damage.</p>

    <h1>Quest Log</h1>
    <h2>{questResult?.outcome}</h2>
    <ol>
      {questResult?.roundsLog?.map((round) => <li key={round.replace(' ', '')}>{round}</li>)}
    </ol>
  </>;
};

export default Test;
