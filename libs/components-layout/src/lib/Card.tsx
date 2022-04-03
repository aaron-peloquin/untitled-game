import {memo} from 'react';

import styles from './Card.module.css';

/* eslint-disable-next-line */
type T_Props = {
  layer: '1' | '2' | '3' | '4'
  heading?: string
}

export const Card: React.FC<T_Props> = memo(({layer, heading, children}) => {
  const classNames = styles['card'] + ' ' + styles[`card-layer-${layer}`];

  return (
    <div className={classNames}>
      {layer === '1' && <h1>{heading}</h1>}
      {layer === '2' && <h2>{heading}</h2>}
      {layer === '3' && <h3>{heading}</h3>}
      {layer === '4' && <h4>{heading}</h4>}
      {children}
    </div>
  );
});

