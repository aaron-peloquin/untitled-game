import {memo} from 'react';

type T_Props = {
  className?: string
  gridArea?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function
}

export const GridArea: React.FC<T_Props> = memo(({children, gridArea, className}) => {
  return <div className={className} style={{gridArea}}>
    {children}
  </div>;
});
