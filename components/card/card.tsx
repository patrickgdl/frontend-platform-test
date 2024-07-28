import HeartIcon from "@/components/icons/heart";

import styles from "./card.module.css";

type CardProps = {
  title: string;
  subtitle: string;
  image: string;
  hasFavorite?: boolean;
  favorited?: boolean;
  onFavorite?: () => void;
};

const Card = ({
  title,
  subtitle,
  image,
  hasFavorite,
  favorited,
  onFavorite,
}: CardProps) => {
  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onFavorite();
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.container}>
        <div>
          <h5 className={styles.title}>
            <b>{title}</b>
          </h5>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {hasFavorite && (
          <button
            onClick={handleFavorite}
            className={styles.iconButton}
            style={{ color: favorited ? "var(--red)" : "var(--white)" }}
          >
            <HeartIcon fill={favorited ? "var(--red)" : "transparent"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
