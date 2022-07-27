/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useGetBand, usePayWages} from '@datastore';
import {useMemo, useRef} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';
import {RealityButton} from '../atoms/RealityButton';

import {RealityText} from '../atoms/RealityText';


const RealityWageComponents: React.FC = () => {
  const fireWagesBoxPosition = useMemo(() => new Vector3(0, -0.4, .05), []);
  const refFireBox = useRef<Mesh>();
  const band = useGetBand();
  const {bandMercenaries, canAffordWages, checkedMercenaries, receipt, setCheckedMercenaries, totalAmount, wagesDone} = usePayWages(band);

  return <>
    {/** Game Elements */}
    <group position={[0, 1, -0.75]}>
      <RealityText text="Wages Due" fontSize={.25} position={[0, .75, -1]} color="gray" />
      {bandMercenaries?.map((mercenary, index) => <RealityMercenaryWages
        mercenary={mercenary}
        offset={index}
        refSelectMercenaryBox={refFireBox}
        setCheckedMercenaries={setCheckedMercenaries}
      />)}
      <RealityBox transparent opacity={0.5} color='navy' ref={refFireBox} position={fireWagesBoxPosition} args={[.25, .25, .05]}>
        <RealityText text='Select' position={[0, -.05, 0.03]} fontSize={0.075} />
        <RealityText text='(Grab &amp; drop here)' position={[0, -.1, 0.03]} fontSize={0.025} />
      </RealityBox>
      <RealityButton text="Pay Wages" handleSelect={} />
    </group>
  </>;
};

RealityWageComponents.displayName = 'RealityWageComponents';
export {RealityWageComponents};
