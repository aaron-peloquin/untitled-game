import CSS from 'csstype';
import {memo, useMemo} from 'react';

type T_CssProps = Pick<CSS.Properties, 'alignSelf' | 'gridArea' | 'justifySelf' | 'textAlign'>

type T_Props = {
  className?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function
}

type T_CombinedProps = T_Props & T_CssProps
const GridArea: React.FC<T_CombinedProps> = memo(({alignSelf, children, className, gridArea, justifySelf, textAlign}) => {
  const dynamicStyles = useMemo(() => ({
    alignSelf,
    gridArea,
    justifySelf,
    textAlign,
  }), [alignSelf, gridArea, justifySelf, textAlign]);

  return <div className={className} style={dynamicStyles}>
    {children}
  </div>;
});

GridArea.displayName = 'GridArea';
export {GridArea};
