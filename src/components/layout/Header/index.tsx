import styles from './index.module.css';
import Input from '../../input';
// import ThemeToggle from '../../btn/index.tsx';
import {ThemeToggle} from "../../btn";
type HeaderProps = {
    onSearch: (city: string) => void;
};

export default function Header({ onSearch }: HeaderProps) {
    return (
        <div className={styles.box}>
            <Input onSearch={onSearch} />
            <ThemeToggle />
            {/*<Btn />*/}
        </div>
    );
}
