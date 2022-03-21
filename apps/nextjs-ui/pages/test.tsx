import {generateQuest} from '@quest';

const Test = () => {
  const quest = generateQuest();
  return <h1>{JSON.stringify(quest)}</h1>;
};

export default Test;
