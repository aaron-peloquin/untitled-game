import {Button, Card} from '@components-layout';
import {useQuestRunner} from '@datastore';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
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

  const showRunButton = mercenary && quest;
  const questRunnerText = useMemo(() => {
    if (questResults) {
      return `Your mercenary was sent`;
    }
    if (mercenary && quest) {
      return `Send ${mercenary?.name} to ${quest?.type} ${quest?.targetName}`;
    } else if (mercenary) {
      return `Select a quest to send  ${mercenary?.name} on`;
    } else if (quest) {
      return `Select a mercenary  to ${quest?.type} ${quest?.targetName}`;
    } else {
      return 'Select a mercenary and a quest to send them on';
    }
  }, [mercenary, quest, questResults]);

  return <Card layer="4">
    {questRunnerText}
    {showRunButton && <Button disabled={!hasEnoughAp} text={`Send Mercenary (${hasEnoughAp ? `${apCost} AP` : `Rest to regain AP`})`} onClick={handleRunQuest} />}
    {questResults ? <ul>{questResults.roundsLog.map((round, index) => <li style={round.styles} key={index}><strong>{round.person}</strong> {round.action}</li>)}</ul> : undefined}
  </Card>;
});

QuestRunner.displayName = 'QuestRunner';
export {QuestRunner};
