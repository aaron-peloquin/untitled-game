import {useGetBand, useListMercenariesById, useSetSelectMercenaryId} from '@datastore';
import {useGrabAndDrop} from '@helper';
import {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import {Mesh, Vector3} from 'three';
import {T_Mercenary} from 'TS_Mercenary';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

const RealityBandMercenaries = () => {
  const refSelectMercenaryBox = useRef<Mesh>();
  const band = useGetBand();
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);

  return <>
    {bandMercenaries?.map((mercenary, index) => <RealityBandMercenary mercenary={mercenary} position={[-.1 * index, -.1 * index, 0]} refSelectMercenaryBox={refSelectMercenaryBox} />)}
    <RealityBox color='orange' ref={refSelectMercenaryBox} position={[0, .25, 0]} args={[.15, .15, .05]} />
  </>;
};


type Props = {
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
  mercenary: T_Mercenary
  position: Vector3
}

const RealityBandMercenary: React.FC<Props> = ({refSelectMercenaryBox, mercenary, position}) => {
  const {isSelected, setSelected} = useSetSelectMercenaryId(mercenary.mercenaryId);
  const [distance, setDistance] = useState(42);
  const textRef = useRef<Mesh>();

  const handleSelect = useCallback((dist) => {
    setDistance(dist.toFixed(3));
    if (dist < .25) {
      setSelected();
    }
  }, [setSelected]);
  const {isGrabbed, refGrabbableBox} = useGrabAndDrop(refSelectMercenaryBox, handleSelect);
  const currentColor = (isSelected ? 'teal' : (isGrabbed ? 'forestgreen' : 'gray'));
  useEffect(() => {
    refGrabbableBox.current.attach(textRef.current);
  }, [refGrabbableBox]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <>
    <RealityBox color={currentColor} ref={refGrabbableBox} position={position} />
    <RealityText text={`${mercenary?.name}, ${distance}`} fontSize={.075} position={[0, 0, 0.055]} ref={textRef} />
  </>;
};

RealityBandMercenaries.displayName = 'RealityBandMercenaries';
export {RealityBandMercenaries};
