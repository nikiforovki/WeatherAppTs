import styles from './index.module.css';
import Input from '../../input';
import {ThemeToggle} from "../../btn";
import type {HeaderProps} from "./type";

export default function Header({ onSearch }: HeaderProps) {
    return (
        <div className={styles.box}>
            <Input onSearch={onSearch} />
            <ThemeToggle />
        </div>
    );
}
