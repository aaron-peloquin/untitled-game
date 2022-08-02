/* eslint-disable @typescript-eslint/ban-ts-comment */
import {RoundedBox} from '@react-three/drei';
import {Interactive, XRInteractionEvent} from '@react-three/xr';
import {useEffect, useRef} from 'react';

import {RealityText} from './RealityText';

type T_3dDimensions = [width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number]

type T_Props = {
  buttonSize?: T_3dDimensions
  buttonColor?: string
  fontColor?: string
  fontSize?: number
  fontPadding?: number
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelect: (event: XRInteractionEvent) => any
}

const RealityButton: React.FC<T_Props> = ({
  handleSelect,
  text,
  fontPadding = 0.04,
  fontSize = 0.1,
}) => {
  const refButtonBox = useRef<any>();
  const refButtonText = useRef<any>();

  // size wrapping box to text
  useEffect(() => {
    setTimeout(() => {
      if (refButtonBox.current && refButtonText.current) {
        const text = refButtonText.current?.geometry.boundingBox.max || {};
        const newX = (text.x || 0) + fontPadding;
        const newY = (text.y || 0) + fontPadding;
        refButtonBox.current.scale.set(newX, newY, .2);
      }
    }, 5);
  }, [fontPadding]);

  return <Interactive onSelect={handleSelect}>
    <RoundedBox args={[2, 1, 0.2]} position={[0, 0, -0.021]} ref={refButtonBox}>
      <meshBasicMaterial color="gray" />
    </RoundedBox>
    <RealityText text={text} fontSize={fontSize} ref={refButtonText} />
  </Interactive>;
};

RealityButton.displayName = 'RealityButton';

export {RealityButton};
