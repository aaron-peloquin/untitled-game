import {Card} from '@components-layout';
import {db, useBandMercenaries} from '@helper';
import {runSlayQuest} from '@quest';
import {memo} from 'react';
import {T_Quest} from 'TS_Quest';

type Props = {
    quest: T_Quest
}
const QuestItem: React.FC<Props> = ({quest}) => {
  // const runQuest = useCallback(async (e) => {
  //   e.preventDefault();
  //   let questRunner: T_RunQuestSig;
  //   switch (quest.type) {
  //     default:
  //       questRunner = runSlayQuest(quest);
  //       break;
  //   }
  //   db.mercenaries.get(selectedMercenaryId).then((mercenary) => {
  //     if (mercenary) {
  //       const result = questRunner(mercenary);
  //       console.log('result', result, quest, mercenary);
  //     }
  //   });
  // }, [quest, selectedMercenaryId]);
  return <Card layer="4" heading={`${quest.type} ${quest.targetName}`}>
    <dl>
      {/* <dt>Type</dt>
      <dd>{quest.type}</dd> */}
      <dt>Difficulty</dt>
      <dd>{quest.level}</dd>
      <dt>Target</dt>
      <dd>A {quest.targetEthnicity} {quest.targetProfession}</dd>
    </dl>
  </Card>;
};

export default memo(QuestItem);
