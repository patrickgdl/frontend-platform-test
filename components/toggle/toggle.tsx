import HeartIcon from "@/components/icons/heart";

import styles from "./toggle.module.css";

const Toggle = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <input type="checkbox" className={styles.hidden} name="cb" id="cb" />
      <label htmlFor="cb" className={styles.toggle}>
        <HeartIcon />
        {children}
      </label>
    </>
  );
};

export default Toggle;
