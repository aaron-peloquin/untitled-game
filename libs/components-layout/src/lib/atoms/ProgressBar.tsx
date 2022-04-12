// import CSS from 'csstype';
import {useMemo} from 'react';

// type T_AccentColors = Pick<CSS.Properties, 'accentColor'>

type T_Props = {
    color?: 'blue' | 'red' | 'orange'
    max: number
    value: number
}

const ProgressBar: React.FC<T_Props> = ({color, max, value}) => {
  const style = useMemo(() => ({accentColor: color}), [color]);
  return <progress style={style} max={max} value={value} />;
};

ProgressBar.displayName = 'ProgressBar';
export {ProgressBar};
