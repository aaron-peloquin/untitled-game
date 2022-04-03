import { GridArea, GridTemplate } from '@components-layout';
import {memo} from 'react';
import {I_BaseQuest} from 'TS_Quest';

import QuestItem from '../atoms/QuestItem';

type Props = {
    quests: I_BaseQuest[]
}
const QuestList: React.FC<Props> = ({quests}) => {
  return <GridTemplate columns={2}>
    {quests.map((quest) => <GridArea><QuestItem quest={quest} /></GridArea>)}
  </GridTemplate>;
};

export default memo(QuestList);
