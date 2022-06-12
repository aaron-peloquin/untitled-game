import {Button, Card} from '@components-layout';
import {useQuestRunner} from '@datastore';
import {Dispatch, memo, SetStateAction, useCallback, useEffect} from 'react';
import {T_QuestResults} from 'TS_Quest';

type T_Props = {
  setQuestResults: Dispatch<SetStateAction<T_QuestResults | undefined>>
}

const QuestRunner: React.FC<T_Props> = memo(({setQuestResults}) => {
  const {apCost, hasEnoughAp, mercenary, quest, questRunnerText, runQuest} = useQuestRunner();

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

  return <Card layer="4" heading='Send Mercenary on a Quest'>
    {questRunnerText}
    {showRunButton && <Button disabled={!hasEnoughAp} text={`Send Mercenary (${hasEnoughAp ? `${apCost} AP` : `Rest to regain AP`})`} onClick={handleRunQuest} />}
  </Card>;
});

QuestRunner.displayName = 'QuestRunner';
export {QuestRunner};
