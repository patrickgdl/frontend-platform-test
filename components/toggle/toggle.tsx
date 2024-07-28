import HeartIcon from "@/components/icons/heart";

import styles from "./toggle.module.css";

type ToggleProps = {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Toggle = ({ children, onChange, checked }: ToggleProps) => {
  return (
    <>
      <input
        id="cb"
        name="cb"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.hidden}
      />
      <label htmlFor="cb" className={styles.toggle}>
        <HeartIcon />
        {children}
      </label>
    </>
  );
};

export default Toggle;
