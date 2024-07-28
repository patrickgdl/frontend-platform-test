import Logo from "../icons/logo";
import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Logo />
      </Link>
    </header>
  );
};

export default Header;
