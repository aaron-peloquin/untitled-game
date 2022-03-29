import {memo} from 'react';
import {I_BaseQuest} from 'TS_Quest';

type Props = {
    quest: I_BaseQuest
}
const QuestItem: React.FC<Props> = ({quest}) => {
  return <li>{quest.type} (${quest.level})</li>;
};

export default memo(QuestItem);
