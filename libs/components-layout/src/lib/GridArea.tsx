import {memo} from 'react';

type T_Props = {
    gridArea?: string
}

export const GridArea: React.FC<T_Props> = memo(({children, gridArea}) => {
  return <div style={{gridArea}}>
    {children}
  </div>;
});
