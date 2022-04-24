import {Button, Card} from '@components-layout';
import {useQuestRunner} from '@datastore';
import {Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo} from 'react';
import {T_QuestResults} from 'TS_Quest';

type T_Props = {
  setQuestResults: Dispatch<SetStateAction<T_QuestResults | undefined>>
}

const QuestRunner: React.FC<T_Props> = memo(({setQuestResults}) => {
  const {mercenary, quest, runQuest, hasEnoughAp, apCost} = useQuestRunner();

  const handleRunQuest = useCallback(() => {
    const results = runQuest();
    setQuestResults(results);
  }, [runQuest, setQuestResults]);

  useEffect(() => {
    if ((quest?.questId || 0) > 0) {
      setQuestResults(undefined);
    }
  }, [quest?.questId, setQuestResults]);

  const showRunButton = mercenary && quest;
  const questRunnerText = useMemo(() => {
    if (mercenary && quest) {
      return `Send ${mercenary?.name} to ${quest?.type} ${quest?.targetName}`;
    } else if (mercenary) {
      return `Select a quest to send  ${mercenary?.name} on`;
    } else if (quest) {
      return `Select a mercenary  to ${quest?.type} ${quest?.targetName}`;
    } else {
      return 'Select a mercenary and a quest to send them on';
    }
  }, [mercenary, quest]);

  return <Card layer="4" heading='Send Mercenary on a Quest'>
    {questRunnerText}
    {showRunButton && <Button disabled={!hasEnoughAp} text={`Send Mercenary (${hasEnoughAp ? `${apCost} AP` : `Rest to regain AP`})`} onClick={handleRunQuest} />}
  </Card>;
});

QuestRunner.displayName = 'QuestRunner';
export {QuestRunner};
