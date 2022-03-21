import {generateQuest} from '@quest';

const Test = () => {
  const quest = generateQuest();
  return <>
    <h1>{quest.title}</h1>
    <h2>{quest.type}</h2>
  </>;
};

export default Test;
