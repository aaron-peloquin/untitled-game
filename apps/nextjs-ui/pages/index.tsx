import {db} from '@helper';

const Homepage = () => {
  console.log('db', db);
  return <>
    <h1>Welcome</h1>
    <ul>
      <li><a href="/new-game">New Game</a></li>
      <li><a href="/settings">Settings</a></li>
    </ul>
  </>;
};

export default Homepage;
