import {Button, Card, GridArea, GridTemplate, Output} from '@components-layout';
import {useGetQuestStats, useSetSelectedQuestId} from '@datastore';
import {questData} from '@static';
import {memo, useCallback} from 'react';
import {T_Quest} from 'TS_Quest';

type Props = {
    quest: T_Quest
}

const QUEST_AREAS = `
"target____ difficulty"
"take_job__ take_job__"`;


const QuestItem: React.FC<Props> = ({quest}) => {
  const {isSelected, setSelected} = useSetSelectedQuestId(quest.questId);
  const stats = useGetQuestStats(quest);
  const questType = questData[quest.type].label;
  const QuestIcon = questData[quest.type].icon;
  const selectQuest = useCallback(() => {
    setSelected();
  }, [setSelected]);

  return <Card layer="4" heading={<><QuestIcon /> {questType} {quest.targetName}</>}>
    <GridTemplate gridTemplateAreas={QUEST_AREAS} justifyItems="center" textAlign='center' columns={2}>
      <GridArea name='difficulty'>
        <Output id={`quest_${quest.questId}_difficulty`} value={quest.level} label="Difficulty" />
      </GridArea>
      <GridArea name="target____">
        <Output id={`quest_${quest.questId}_target`} value={`${stats.ethnicity} ${stats.profession}`} label="Target" />
      </GridArea>
      <GridArea name="take_job__">
        <Button disabled={isSelected} onClick={selectQuest} text="Take Job" />
      </GridArea>
    </GridTemplate>
  </Card>;
};

export default memo(QuestItem);
