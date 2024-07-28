import Logo from "../icons/logo";
import styles from "./header.module.css";
import Link from "next/link";

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Logo />
      </Link>

      {children}
    </header>
  );
};

export default Header;
