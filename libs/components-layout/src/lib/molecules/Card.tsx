import {memo} from 'react';

import {T_CardLayer} from 'TS_General';

import styles from './Card.module.css';

/* eslint-disable-next-line */
type T_Props = {
  layer: T_CardLayer
  heading?: string
}

const Card: React.FC<T_Props> = memo(({layer, heading, children}) => {
  const classNames = styles['card'] + ' ' + styles[`card-layer-${layer}`];

  return (
    <div className={classNames}>
      {layer === '1' && <h1>{heading}</h1>}
      {layer === '2' && <h2>{heading}</h2>}
      {layer === '3' && <h3>{heading}</h3>}
      {layer === '4' && <h4>{heading}</h4>}
      {layer === '5' && <h5>{heading}</h5>}
      {children}
    </div>
  );
});

Card.displayName = 'Card';
export {Card};
