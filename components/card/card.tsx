import HeartIcon from "@/components/icons/heart";

import styles from "./card.module.css";
import FavoriteButton from "../favorite-button/favorite-button";

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
          <FavoriteButton favorited={favorited} onFavorite={handleFavorite} />
        )}
      </div>
    </div>
  );
};

export default Card;
