import {InputHTMLAttributes, memo} from 'react';

import classNames from './Toggle.module.css';

type T_Props = {
    id: string
    label: string
    checked: boolean
}

const Toggle: React.FC<T_Props & InputHTMLAttributes<HTMLInputElement>> = memo(({id, label, checked, ...props}) => {
  console.log({checked});
  return <label>
    <input type="checkbox" className={classNames['checkbox']} id={id} name={id} checked={checked} {...props} />
    <div className={classNames['toggle-plate']}>
      <div className={classNames[`toggle-switch-${checked ? 'on' : 'off'}`]} />
    </div>
  </label>;
});

Toggle.displayName = 'Toggle';
export {Toggle};
