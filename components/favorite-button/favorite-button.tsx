import HeartIcon from "../icons/heart";
import styles from "./favorite-button.module.css";

type FavoriteButtonProps = {
  onFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
  favorited: boolean;
};

const FavoriteButton = ({ onFavorite, favorited }: FavoriteButtonProps) => {
  return (
    <button
      onClick={onFavorite}
      className={styles.iconButton}
      style={{ color: favorited ? "var(--red)" : "var(--white)" }}
    >
      <HeartIcon fill={favorited ? "var(--red)" : "transparent"} />
    </button>
  );
};

export default FavoriteButton;
