import {memo, useMemo} from 'react';

import styles from './GridTemplate.module.css';

type T_Props = {
    gridTemplateAreas: string
    gridTemplateRows?: string
    gridTemplateColumns?: string
    columns?: number
    rows?: number
}

const GridTemplate: React.FC<T_Props> = memo(({children, gridTemplateAreas, gridTemplateRows, gridTemplateColumns, columns, rows}) => {
  const dynamicStyles = useMemo(() => {
    const columnsValue = gridTemplateColumns ?? `1fr `.repeat(columns || 0);
    const rowsValue = gridTemplateRows ?? `1fr `.repeat(rows || 0);
    return {
      gridTemplateAreas,
      gridTemplateColumns: columnsValue,
      gridTemplateRows: rowsValue,
    };
  }, [columns, gridTemplateAreas, gridTemplateColumns, gridTemplateRows, rows]);
  return <div className={styles['grid-template']} style={dynamicStyles}>
    {children}
  </div>;
});
GridTemplate.displayName = 'GridTemplate';
export {
  GridTemplate,
};
