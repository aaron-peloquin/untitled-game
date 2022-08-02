/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useGetBand, usePayWages} from '@datastore';
import {useMemo, useRef} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';
import {RealityButton} from '../atoms/RealityButton';

import {RealityText} from '../atoms/RealityText';
import {RealityMercenaryWages} from '../molecules/RealityMercenaryWages';
import {RealityBandPanel} from '../organisms/RealityBandPanel';

const RealityWageComponents: React.FC = () => {
  const fireWagesBoxPosition = useMemo(() => new Vector3(0, -0.4, .05), []);
  const refFireBox = useRef<Mesh>();
  const band = useGetBand();
  const {bandMercenaries, canAffordWages, receipt, setCheckedMercenaries, totalAmount, wagesDone} = usePayWages(band);

  return <>
    {/** Receipt group */}
    <group position={[0, 1.25, -1.5]}>
      <RealityText position={[0, .2, 0]} text={`Total: ${totalAmount} gold`} fontSize={.15} />
      {receipt.map(({name, wage}, index) => <RealityText position={[0, -.15 * index, 0]} text={`${wage} gold for ${name}`} fontSize={.1} />)}
    </group>
    {/** Mercenary Selection group */}
    <group position={[0, 1, -0.75]}>
      <RealityText text="Wages Due" fontSize={.25} position={[0, .75, -1]} color="gray" />
      <group position={[0.25, -0.15, 0]}>
        {bandMercenaries?.map((mercenary, index) => <RealityMercenaryWages
          mercenary={mercenary}
          offset={index}
          refSelectMercenaryBox={refFireBox}
          setCheckedMercenaries={setCheckedMercenaries}
        />)}
      </group>
      <RealityBox transparent opacity={0.5} color='navy' ref={refFireBox} position={fireWagesBoxPosition} args={[.25, .25, .05]}>
        <RealityText text='End' position={[0, .0, 0.03]} fontSize={0.075} />
        <RealityText text='Contract' position={[0, -.05, 0.03]} fontSize={0.06} />
        <RealityText text='(Grab &amp; drop here)' position={[0, -.1, 0.03]} fontSize={0.025} />
      </RealityBox>
    </group>
    {/** Band Panel group */}
    <group position={[-0.7, 1, -0.25]} rotation={[0, 1, 0]}>
      <RealityBandPanel noBandAction={false} bandActionText={`Done, pay ${totalAmount} gold`} bandActionCallback={wagesDone} />
    </group>
    {/** Pay Salaries (done) button */}
    {canAffordWages && <RealityButton text="Pay Wages" handleSelect={wagesDone} />}
  </>;
};

RealityWageComponents.displayName = 'RealityWageComponents';
export {RealityWageComponents};
