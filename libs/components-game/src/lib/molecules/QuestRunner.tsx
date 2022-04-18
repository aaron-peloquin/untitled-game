import {Button, Card} from '@components-layout';
import {useQuestRunner} from '@datastore';
import {memo, useCallback, useEffect, useState} from 'react';
import {T_QuestResult} from 'TS_Quest';

const QuestRunner = memo(() => {
  const {mercenary, quest, runQuest, hasEnoughAp, apCost} = useQuestRunner();
  const [questResults, setQuestResults] = useState<T_QuestResult>();

  useEffect(() => {
    if ((quest?.questId || 0) > 0) {
      setQuestResults(undefined);
    }
  }, [quest?.questId]);

  const handleRunQuest = useCallback(() => {
    const results = runQuest();
    setQuestResults(results);
  }, [runQuest]);

  return <Card layer="4">
    {(mercenary && quest) ?
    <>Send {mercenary?.name} to {quest?.type} {quest?.targetName}
      <Button disabled={!hasEnoughAp} text={`Send Mercenary (${hasEnoughAp ? `${apCost} AP` : `Rest to regain AP`})`} onClick={handleRunQuest} />
    </> :
        `Select a ${!mercenary ? 'mercenary' : ''}${!mercenary && !quest ? ' and ' : ''}${!quest ? 'quest' : ''}`}
    {questResults ? <ul>{questResults.roundsLog.map((round, index) => <li key={index}><strong>{round.person}</strong> {round.action}</li>)}</ul> : undefined}
  </Card>;
});

QuestRunner.displayName = 'QuestRunner';
export {QuestRunner};
