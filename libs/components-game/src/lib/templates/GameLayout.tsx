// import CurrentLocation from '../organisms/CurrentLocation';
// import GameSettings from '../organisms/GameSettings';
import BandPanel from '../organisms/BandPanel';

export const GameLayout = () => {
  return (
    <div>
      <h1>A Untitled Game</h1>
      <fieldset>
        <legend><h2>Your Band</h2></legend>
        <BandPanel />
      </fieldset>
      <fieldset>
        <legend><h2>Location</h2></legend>
        {/* <CurrentLocation /> */}
      </fieldset>
      <fieldset>
        <legend><h2>Travel</h2></legend>
        {/** Leave this location */}
      </fieldset>
    </div>
  );
};
