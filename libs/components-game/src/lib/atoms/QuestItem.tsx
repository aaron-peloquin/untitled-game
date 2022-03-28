import {memo} from 'react';
import {I_Quest} from 'TS_Quest';

type Props = {
    quest: I_Quest
}
const QuestItem: React.FC<Props> = ({quest}) => {
  return <li>{quest.type} (${quest.level})</li>;
};

export default memo(QuestItem);
