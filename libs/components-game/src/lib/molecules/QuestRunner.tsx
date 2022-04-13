import {Button, Card} from '@components-layout';
import {useQuestRunner} from '@datastore';
import {memo} from 'react';

const QuestRunner = memo(() => {
  const {mercenary, quest} = useQuestRunner();

  return <Card layer="4">
    {(mercenary && quest) ?
    <>`Send ${mercenary?.name} to ${quest?.type} ${quest?.targetName}`
      <Button text="Go on quests" />
    </> :
        `Select a ${!mercenary ? 'mercenary' : ''}${!mercenary && !quest ? ' and ' : ''}${!quest ? 'quest' : ''} first`}
  </Card>;
});

QuestRunner.displayName = 'QuestRunner';
export {QuestRunner};
