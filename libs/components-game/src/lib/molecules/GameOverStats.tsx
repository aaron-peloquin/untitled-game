import {memo} from 'react';
import {T_GameMetrics} from 'TS_General';

interface GameOverStatsProps {
  metrics: T_GameMetrics;
  totalQuestsCompleted: number;
}

const GameOverStats = memo<GameOverStatsProps>(({ metrics, totalQuestsCompleted }) => {
  return (
    <div>
      <p><strong>Days Elapsed:</strong> {metrics.totalDays}</p>
      <p><strong>Mercenaries Hired:</strong> {metrics.totalHired}</p>
      <p><strong>Mercenaries Lost:</strong> {metrics.totalDeaths}</p>
      <p><strong>Quests Completed:</strong> {totalQuestsCompleted}</p>
    </div>
  );
});

GameOverStats.displayName = 'GameOverStats';
export { GameOverStats };