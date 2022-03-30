import {db, useBandMercenaries} from '@helper';
import {runSlayQuest} from '@quest';
import {useLiveQuery} from 'dexie-react-hooks';
import _ from 'lodash';
import {memo, useCallback, useState} from 'react';
import {I_BaseQuest, T_RunQuestSig} from 'TS_Quest';

type Props = {
    quest: I_BaseQuest
}
const QuestItem: React.FC<Props> = ({quest}) => {
  const [selectedMercenaryId, setSelectedMercenaryId] = useState<number>(0);

  const handleMercenarySelect = useCallback((event) => {
    setSelectedMercenaryId(parseInt(event.target.value));
  }, []);
  const bandMercenaries = useBandMercenaries();
  const runQuest = useCallback(async (e) => {
    e.preventDefault();
    let questRunner: T_RunQuestSig;
    switch (quest.type) {
      default:
        questRunner = runSlayQuest(quest);
        break;
    }
    const mercenary = await db.mercenaries.get(selectedMercenaryId);
    const result = questRunner(mercenary);
    console.log('result', result, quest, mercenary);
  }, [quest, selectedMercenaryId]);
  return <li>
    <dl>
      <dt>Type</dt>
      <dd>{quest.type}</dd>
      <dt>Difficulty</dt>
      <dd>{quest.level}</dd>
      <dt>Target</dt>
      <dd>{quest.target.name}, a {quest.target.ethnicity} {quest.target.profession}</dd>
    </dl>
    {bandMercenaries?.length ? <form onSubmit={runQuest}>
      <select required onChange={handleMercenarySelect}>
        <option value="0">Please Select...</option>
        {bandMercenaries?.map((mercenary) => <option value={mercenary.id}>{mercenary.name} (level {Math.round(mercenary.level)})</option>)}
      </select>
      <button type="submit" disabled={!selectedMercenaryId}>Go Quest!</button>
    </form> : null}
  </li>;
};

export default memo(QuestItem);
