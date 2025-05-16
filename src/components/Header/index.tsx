import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Link to="/">Vision Prompt</Link>
      </div>
    </div>
  );
};

export default Header; 