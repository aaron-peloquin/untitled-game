
const GameSettings = () => {
  return (
    <fieldset>
      <legend>Game Settings</legend>
      <label htmlFor="currentSeed">Randomization Seed: </label>
      <input id="currentSeed" value={currentSeed} onChange={handleChangeSeed} />
      <p><em>Two global seed-based number generators are created. One for Quests, the other for Mercenaries</em></p>
      {/* <div><button type="button" onClick={logAnalytics}>logAnalytics();</button></div> */}
    </fieldset>

  );
};

export default GameSettings;
