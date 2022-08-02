import {Card, GridTemplate, GridArea, Output, Button} from '@components-layout';
import {displayNumber} from '@helper';
import React, {Fragment, memo} from 'react';
import {GiTwoCoins} from 'react-icons/gi';
import {T_QuestResults} from 'TS_Quest';


type T_Props = {
    clearQuestResults: () => void
    questResults: T_QuestResults
}
const QuestResults: React.FC<T_Props> = memo(({clearQuestResults, questResults}) => {
  return <Card layer="2" heading="Quest Outcome">
    <Card layer="3" heading="Log">
      <GridTemplate>
        <GridTemplate gridTemplateColumns="1fr 4fr">
          {questResults.roundsLog.map((round, index) => {
            const Icon = round?.icon;
            return <Fragment key={index}>
              <GridArea />
              <GridArea style={round.styles}>
                {Icon && <><Icon />{` `}</>}<strong>{round.person}</strong> {round.action}
              </GridArea>
            </Fragment>;
          })}
        </GridTemplate>
        <GridArea style={questResults.finalStyles}>
          <Card layer="4" heading={questResults.outcome}>
            <GridTemplate gridTemplateColumns="1fr 1fr 1fr / 3fr">
              <GridArea><Output label="Mercenary" id="quest-result-mercenary" value={questResults.mercenary.remove ? 'Never returned' : `+${displayNumber(questResults.mercenary.exp * 100)}% exp`} /></GridArea>
              <GridArea><Output label="Band Experience" id="quest-result-band-exp" value={`+${displayNumber(questResults.band.exp * 100)}% exp`} /></GridArea>
              <GridArea><Output label="Band Gold" id="quest-result-band-gold" value={`Gained ${questResults.band.gold}`} /> <GiTwoCoins /></GridArea>
              <GridArea textAlign='center'>
                <Button text="Accept" onClick={clearQuestResults} />
              </GridArea>
            </GridTemplate>
          </Card>
        </GridArea>
      </GridTemplate>
    </Card>
  </Card>;
});

QuestResults.displayName = 'QuestResults';
export {QuestResults};
