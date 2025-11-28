import styles from './index.module.css';
import Input from '../../input';
import Btn from '../../btn';

type HeaderProps = {
    onSearch: (city: string) => void;
};

export default function Header({ onSearch }: HeaderProps) {
    return (
        <div className={styles.box}>
            <Input onSearch={onSearch} />
            <Btn />
        </div>
    );
}
