import {memo} from 'react';

import styles from './Card.module.css';

/* eslint-disable-next-line */
type T_Props = {
  heading?: string
}

export const Card: React.FC<T_Props> = memo(({heading, children}) => {
  return (
    <div className={styles['card']}>
      {heading && <h3>{heading}</h3>}
      {children}
    </div>
  );
});

