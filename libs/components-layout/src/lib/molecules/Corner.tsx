import styles from './Corner.module.css';

type T_Props = {
  location: 'top-left' | 'top-right'
}

const Corner: React.FC<T_Props> = ({children, location}) => {
  const className = `${styles[location]} ${styles['container']}`;

  return <div className={className}>{children}</div>;
};

export {Corner};
