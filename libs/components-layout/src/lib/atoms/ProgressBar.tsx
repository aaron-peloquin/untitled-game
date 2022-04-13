import {ProgressHTMLAttributes, useMemo} from 'react';

import classNames from './ProgressBar.module.css';

type T_Props = {
    color?: 'blue' | 'red' | 'orange'
    max: number
    value: number
}

const ProgressBar: React.FC<T_Props & ProgressHTMLAttributes<HTMLProgressElement>> = ({color, ...props}) => {
  const style = useMemo(() => ({accentColor: color}), [color]);
  return <progress className={classNames['progress-bar']} style={style} {...props} />;
};

ProgressBar.displayName = 'ProgressBar';
export {ProgressBar};
