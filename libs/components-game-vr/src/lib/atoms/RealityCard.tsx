/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Billboard, Plane, Text} from '@react-three/drei';
import {MeshBasicMaterialProps, useFrame} from '@react-three/fiber';
import {useRef} from 'react';
import {T_CardLayer} from 'TS_General';

type T_Props = {
  layer: T_CardLayer
  heading?: string
}

const RealityCard: React.FC<T_Props> = ({children, heading}) => {
  const refContent = useRef<MeshBasicMaterialProps>();
  const refCard = useRef<MeshBasicMaterialProps>();

  useFrame(() => {
    if (refContent.current?.children && refCard.current) {
      const {x, y} = refContent.current.children.reduce((sum: {x:number, y:number}, child:MeshBasicMaterialProps) => {
        const maxGeometry = child['geometry'].boundingBox.max;
        // const minGeometryY = Math.abs(child['geometry'].boundingBox.max.y);
        if (maxGeometry.x > sum.x) {
          sum.x = maxGeometry.x;
        }

        if (maxGeometry.y) {
          sum.y += maxGeometry.y;
        }
        return sum;
      }, {x: 0, y: 1});
      // console.log({x, y});
      refCard.current['scale'].set(
          x * 2 + 0.2,
          refContent.current.children.length + .75,
          0);
    }
  });

  console.log({
    refContent,
  });

  console.log('cr', refCard.current?.scale);
  // @ts-ignore
  return <Billboard follow>
    {/** @ts-ignore */}
    <Plane ref={refCard} position={[0, .5, -.01]} args={[1, 1, 1]} />
    <group ref={refContent}>
      {/** @ts-ignore */}
      {heading ? <Text position={[0, 3, 0]} fontSize={.75} color="green">{heading}</Text> : null}
      {heading ? <Text position={[0, 2, 0]} fontSize={.75} color="green">{heading}</Text> : null}
      {heading ? <Text position={[0, 1, 0]} fontSize={.75} color="green">{heading}</Text> : null}
      {heading ? <Text fontSize={.75} color="green">{heading}</Text> : null}
      {heading ? <Text position={[0, -1, 0]} fontSize={.75} color="green">{heading} and {heading}</Text> : null}
      {heading ? <Text position={[0, -2, 0]} fontSize={.75} color="green">and?</Text> : null}
      {children}
    </group>
  </Billboard>;
};

RealityCard.displayName = 'RealityCard';

export {RealityCard};
