import CurrentLocation from '../organisms/CurrentLocation';
import GameSettings from '../organisms/GameSettings';
import BandManager from '../organisms/BandManager'

export const GameLayout = () => {
  return (
    <div>
      <h1>An Untitled Game</h1>
      <div>
        <GameSettings />
      </div>
      <div>
        <h2>Your Band</h2>
        <BandManager />
      </div>
      <div>
        <h2>Location</h2>
        <CurrentLocation />
      </div>
      <div>
        <h2>Travel</h2>
        {/** Leave this location */}
      </div>
    </div>
  );
};
