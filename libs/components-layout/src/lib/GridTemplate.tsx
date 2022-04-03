import {memo} from 'react';

import styles from './GridTemplate.module.css';

type T_Props = {
    gridTemplateAreas: string
}

const GridTemplate: React.FC<T_Props> = memo(({children, gridTemplateAreas}) => {
  return <div className={styles['grid-template']} style={{gridTemplateAreas}}>
    {children}
  </div>;
});
GridTemplate.displayName = 'GridTemplate';
export {
  GridTemplate,
};
