import {Button, Card, GridArea, GridTemplate, Output} from '@components-layout';
import {useGetQuestStats, useSetSelectedQuestId} from '@datastore';
import {memo} from 'react';
import {T_Quest} from 'TS_Quest';

type Props = {
    quest: T_Quest
}

const QUEST_AREAS = `
"difficulty target____"
"take_job__ take_job__"`;

const QuestItem: React.FC<Props> = ({quest}) => {
  const {isSelected, setSelected} = useSetSelectedQuestId(quest.questId);
  const stats = useGetQuestStats(quest);
  return <Card layer="4" heading={`${quest.type} ${quest.targetName}`}>
    <GridTemplate gridTemplateAreas={QUEST_AREAS} justifyItems="center" textAlign='center' columns={2}>
      <GridArea name='difficulty'><Output id={`quest_${quest.questId}`} value={quest.level} label="Difficulty" /></GridArea>
      <GridArea name="target____"><Output id={`quest_${quest.questId}`} value={`${stats.ethnicity} ${stats.profession}`} label="Target" /></GridArea>
      <GridArea name="take_job__"><Button disabled={isSelected} onClick={setSelected} text="Take Job" /></GridArea>
    </GridTemplate>
  </Card>;
};

export default memo(QuestItem);
