import {InputHTMLAttributes} from 'react';

import styles from './Input.module.css';
import {Label} from './Label';

type T_Props = {
    label: string
    id: string
}

const Input: React.FC<T_Props & InputHTMLAttributes<HTMLInputElement>> = ({label, id, ...props}) => {
  return <Label htmlFor={id} text={label}>
    <input className={styles['input']} id={id} {...props} />
  </Label>;
};

Input.displayName = 'Input';
export {Input};
