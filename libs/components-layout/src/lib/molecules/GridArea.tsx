import CSS from 'csstype';
import {memo, useMemo} from 'react';

type T_CssProps = Pick<CSS.Properties, 'alignSelf' | 'gridArea' | 'justifySelf'>

type T_Props = {
  className?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function
}

type T_CombinedProps = T_Props & T_CssProps
const GridArea: React.FC<T_CombinedProps> = memo(({alignSelf, children, className, gridArea, justifySelf}) => {
  const dynamicStyles = useMemo(() => ({
    alignSelf,
    gridArea,
    justifySelf,
  }), [alignSelf, gridArea, justifySelf]);

  return <div className={className} style={dynamicStyles}>
    {children}
  </div>;
});

GridArea.displayName = 'GridArea';
export {GridArea};
