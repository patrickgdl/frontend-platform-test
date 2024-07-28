import styles from "./switch.module.css";

type SwitchProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Switch = ({ onChange }: SwitchProps) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onChange} />
      <span className={styles.slider} />
    </label>
  );
};

export default Switch;
