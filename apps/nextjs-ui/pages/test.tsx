import {useCallback, useMemo, useState} from 'react';

import {generateQuest} from '@quest';
import {generateMercenary} from '@mercenary';
import {seedGenerator, pickRange} from '@helper';

const getRandom = pickRange();

// const mercenaryGenerator = generateMercenary();
// const questGenerator = generateQuest();

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
  const quest = useMemo(() => seededQuest(2, 2), [forceNewQuest, seededQuest]);

  const doQuest = useCallback(() => {
    // Todo: more than combat later
    let mercenaryHp = mercenary.health;
    let questChallenge = quest.level * (getRandom(2.5, 6));
    const rounds = [];
    while (mercenaryHp > 0 && questChallenge > 0) {
      const damage = getRandom(mercenary.damage[0], mercenary.damage[1]);
      const questHardship = quest.level + getRandom(1.25, 5);

      questChallenge -= damage;
      mercenaryHp -= questHardship;

      rounds.push(`Dealt ${damage} (${questChallenge} remaining). There was a ${questHardship} hardship, our mercenary has ${mercenaryHp} remaining`);
    }
    let outcome = mercenaryHp > 0 ? 'Success' : 'Failure';
    if (mercenaryHp < -(mercenary.level * 2)) {
      outcome = 'Death';
    }
    setQuestResult({
      outcome,
      rounds,
    });
  }, [mercenary, quest]);

  return <>
    <h1>Form</h1>
    <form>
      <input value={currentSeed} onChange={handleChangeSeed} />
    </form>
    <h1>{quest.type}</h1>
    <h2>Challenge: {Math.round(quest.level)} <em>({quest.level})</em></h2>
    {/* eslint-disable-next-line max-len*/}
    <p>I want you to {quest.type} a {quest.target.profession} {quest.target.ethnicity} named {quest.target.name}</p>

    <h1>{mercenary.name}</h1>
    <p>A level {mercenary.level} {mercenary.ethnicity} {mercenary.profession}. They have {mercenary.health} hp and attack for {mercenary.damage[0]} - {mercenary.damage[1]} damage.</p>
    <button onClick={newQuest}>New Quest</button>
    <button onClick={newMercenary}>New Mercenary</button>
    <button onClick={doQuest}>Attempt Quest</button>

    <h1>{questResult?.outcome}</h1>
    <ol>
      {questResult?.rounds.map((round) => <li key={round.replace(' ')}>{round}</li>)}
    </ol>
  </>;
};

export default Test;
