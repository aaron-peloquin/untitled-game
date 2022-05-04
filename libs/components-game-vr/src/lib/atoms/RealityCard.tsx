/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Billboard, Plane} from '@react-three/drei';
import {MeshBasicMaterialProps, useFrame} from '@react-three/fiber';
import _ from 'lodash';
import {useRef} from 'react';

import {T_CardLayer} from 'TS_General';

import {RealityText} from './RealityText';

type T_Props = {
  layer: T_CardLayer
  heading?: string
}

const RealityCard: React.FC<T_Props> = ({children, heading}) => {
  const refContent = useRef<MeshBasicMaterialProps>();
  const refCard = useRef<MeshBasicMaterialProps>();

  useFrame(() => {
    if (refContent.current?.children && refCard.current) {
      const {x, y} = refContent.current.children.reduce((sum: {x:number, y:number}, child:MeshBasicMaterialProps, childIndex) => {
        const maxGeometry = child['geometry'].boundingBox.max;
        // console.log({childIndex});
        child['position'].set(0, -childIndex, 0);
        // const minGeometryY = Math.abs(child['geometry'].boundingBox.max.y);
        if (maxGeometry.x > sum.x) {
          sum.x = maxGeometry.x;
        }

        if (maxGeometry.y) {
          sum.y += maxGeometry.y;
        }
        return sum;
      }, {x: 0, y: 1});
      const newY = refContent.current.children.length + .75;
      refCard.current['scale'].set(
          x * 2 + 0.2,
          newY,
          0);
      refCard.current['position'].set(
          0,
          -(refContent.current.children.length - .5 / 2),
          -0.01);
    }
  });
  // @ts-ignore
  return <Billboard follow>
    {/** @ts-ignore */}
    <Plane ref={refCard} position={[0, -1, -.01]} args={[1, 1, 1]}>
      <meshBasicMaterial color="gray" />
    </Plane>
    <group ref={refContent}>
      {/** @ts-ignore */}
      {heading ? <RealityText position={[0, 1, 0]} fontSize={.75} color="green" text={heading} /> : null}
      {children}
    </group>
  </Billboard>;
};

RealityCard.displayName = 'RealityCard';

export {RealityCard};
