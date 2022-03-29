import {useCurrentSave} from '@helper';
import {useEffect, useState} from 'react';

const Game = () => {
  const game = useCurrentSave();
  const [stater, setStater] = useState(3);
  console.log('render', game);
  useEffect(() => {
    console.log('effect', game);
  }, [game]);
  return <button onClick={() => setStater(stater + 1)}>Clicky</button>;
};

export default Game;
