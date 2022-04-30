import {Box, Text} from '@react-three/drei';
import {Interactive, XRInteractionEvent} from '@react-three/xr';

type T_3dDimensions = [width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number]

type T_Props = {
  buttonSize?: T_3dDimensions
  buttonColor?: string
  textColor?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelect: (event: XRInteractionEvent) => any
}

const RealityButton: React.FC<T_Props> = ({handleSelect, children}) => {
  return <Interactive onSelect={handleSelect}>
    <Box args={[1, .1, .02]} scale={1}>
      <Text position={[0, 0, 0.021]} color={'black'} fontSize={0.08}>{children}</Text>
    </Box>
  </Interactive>;
};

RealityButton.displayName = 'RealityButton';

export {RealityButton};
