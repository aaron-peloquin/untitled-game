import {GridArea, GridTemplate} from '@components-layout';
import {memo} from 'react';
import {T_Quest} from 'TS_Quest';

import QuestItem from '../atoms/QuestItem';

type Props = {
    quests: T_Quest[]
}
const QuestList: React.FC<Props> = ({quests}) => {
  return <GridTemplate columns={2}>
    {quests.map((quest) => <GridArea key={quest.questId}>
      <QuestItem quest={quest} />
    </GridArea>)}
  </GridTemplate>;
};

export default memo(QuestList);
