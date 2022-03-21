import {useCallback, useMemo, useState} from 'react';

import {generateQuest} from '@quest';

const Test = () => {
  const [randQuest, setRandQuest] = useState<number>(0);
  const newQuest = useCallback(()=>setRandQuest(Math.random()), []);
  const quest = useMemo(generateQuest, [randQuest]);

  const [randMercenary, setRandMercenary] = useState<number>(0);
  const newMercenary = useCallback(()=>setRandMercenary(Math.random()), []);
  //   const mercenary = useMemo(generateMercenary, [randMercenary]);
  return <>
    <h1>{quest.type}</h1>
    <h2>Challenge: {Math.round(quest.level)} <em>({quest.level})</em></h2>
    {/* eslint-disable-next-line max-len*/}
    <p>I want you to {quest.type} a {quest.target.profession} {quest.target.ethnicity} named {quest.target.name}</p>
    <button onClick={newQuest}>New Quest</button>
    <button onClick={newMercenary}>New Mercenary</button>
    <button>Attempt Quest</button>
  </>;
};

export default Test;
