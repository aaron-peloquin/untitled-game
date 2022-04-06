import {memo, useMemo} from 'react';

import styles from './GridTemplate.module.css';

type T_Props = {
  className?: string
  gridTemplateAreas?: string
  gridTemplateRows?: string
  gridTemplateColumns?: string
  columns?: number
  rows?: number
}

const GridTemplate: React.FC<T_Props> = memo(({children, className, gridTemplateAreas, gridTemplateRows, gridTemplateColumns, columns, rows}) => {
  const dynamicStyles = useMemo(() => {
    const columnsValue = gridTemplateColumns ?? `1fr `.repeat(columns || 1);
    const rowsValue = gridTemplateRows ?? `1fr `.repeat(rows || 1);
    return {
      gridTemplateAreas,
      gridTemplateColumns: columnsValue,
      gridTemplateRows: rowsValue,
    };
  }, [columns, gridTemplateAreas, gridTemplateColumns, gridTemplateRows, rows]);
  return <div className={`${styles['grid-template']} ${className}`.trim()} style={dynamicStyles}>
    {children}
  </div>;
});
GridTemplate.displayName = 'GridTemplate';
export {
  GridTemplate,
};
