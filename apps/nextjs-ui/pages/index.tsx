import {useCallback, useEffect, useMemo, useState} from 'react';

import {generateQuest, logAnalytics} from '@quest';
import {generateMercenary} from '@mercenary';
import {seedGenerator} from '@helper';

const LEVEL_LOW = 0.5;
const LEVEL_HIGH = 2.5;

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
  const mercenary = useMemo(() => seededMercenary(LEVEL_LOW, LEVEL_HIGH), [forceNewMercenary, seededMercenary]);
  const quest = useMemo(() => seededQuest(LEVEL_LOW, LEVEL_HIGH), [forceNewQuest, seededQuest]);

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
        <div><button type="button" onClick={logAnalytics}>logAnalytics();</button></div>
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
    <h1>Quest: {quest.type}</h1>
    <h2>Challenge: {Math.round(quest.level)} <em>({quest.level})</em></h2>
    {/* eslint-disable-next-line max-len*/}
    <p>I want you to {quest.type} a {quest.target.profession} {quest.target.ethnicity} named {quest.target.name}</p>

    <h1>Mercenary: {mercenary.name}</h1>
    <h2>Level: {Math.round(mercenary.level)} <em>({mercenary.level})</em></h2>
    <p>{mercenary.ethnicity} {mercenary.profession}. They have {mercenary.health.toFixed(2)} hp and {mercenary.stats.attack}% to hit.</p>

    <h1>Quest Log: {questResult?.outcome}</h1>
    <ol>
      {questResult?.roundsLog?.map((round) => <li key={round.replace(' ', '')}>{round}</li>)}
    </ol>
  </>;
};

export default Test;
