import {Button, Card} from '@components-layout';
import {useQuestRunner} from '@datastore';
import {memo} from 'react';

const QuestRunner = memo(() => {
  const {mercenary, quest, runQuest} = useQuestRunner();

  return <Card layer="4">
    {(mercenary && quest) ?
    <>Send {mercenary?.name} to {quest?.type} {quest?.targetName}
      <Button text="Send Mercenary" onClick={runQuest} />
    </> :
        `Select a ${!mercenary ? 'mercenary' : ''}${!mercenary && !quest ? ' and ' : ''}${!quest ? 'quest' : ''}`}
  </Card>;
});

QuestRunner.displayName = 'QuestRunner';
export {QuestRunner};
