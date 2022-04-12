import style from './Label.module.css';

type T_Props = {
  text: string
  htmlFor: string
}

const Label: React.FC<T_Props> = ({text, htmlFor, children}) => {
  return <>
    <label className={style['label']} htmlFor={htmlFor}>{text}:</label>
    {children}
  </>;
};

Label.displayName = 'Label';
export {Label};
