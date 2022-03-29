import {memo} from 'react';
import {I_BaseQuest} from 'TS_Quest';

import QuestItem from '../atoms/QuestItem';

type Props = {
    quests: I_BaseQuest[]
}
const QuestList: React.FC<Props> = ({quests}) => {
  return <ul>
    {quests.map((quest) => <QuestItem quest={quest} />)}
  </ul>;
};

export default memo(QuestList);
