import {memo} from 'react';
import {I_Quest} from 'TS_Quest';

import QuestItem from '../atoms/QuestItem';

type Props = {
    quests: I_Quest[]
}
const QuestList: React.FC<Props> = ({quests}) => {
  return <ul>
    {quests.map((quest) => <QuestItem quest={quest} />)}
  </ul>;
};

export default memo(QuestList);
