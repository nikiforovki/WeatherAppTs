import styles from './index.module.css'
import Input from "../../input";
import Btn from "../../btn";

export default function Header() {
    return (
        <div className={styles.box}>
         <Input />
         <Btn />
        </div>
    );
}

