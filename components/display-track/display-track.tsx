import { Song } from "@/types/song";
import * as React from "react";
import styles from "./display-track.module.css";
import FavoriteButton from "../favorite-button/favorite-button";

type DisplayTrackProps = {
  currentTrack: Song;
  duration: number;
  children: React.ReactNode;
  onFavorite: () => void;
  favorited: boolean;
  setTimeProgress: (duration: number) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  progressBarRef: React.MutableRefObject<HTMLInputElement>;
};

const DisplayTrack = ({
  currentTrack,
  duration,
  audioRef,
  setTimeProgress,
  onFavorite,
  favorited,
  progressBarRef,
  children,
}: DisplayTrackProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = React.useRef<number>();

  const repeat = React.useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = String(currentTime);
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(+progressBarRef.current.value / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <div className={styles.audioInfo}>
      <div className={styles.audioImage}>
        <img
          alt="Song cover art"
          src={`/assets/images/${currentTrack.song.files.coverArt}`}
        />
      </div>

      <div className={styles.details}>
        <div className={styles.info}>
          <button className={styles.playButton} onClick={togglePlayPause}>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="14" y="4" width="4" height="16" rx="1" />
                <rect x="6" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                width="19"
                height="22"
                viewBox="0 0 19 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 9.84529C18.8889 10.3585 18.8889 11.6415 18 12.1547L2 21.3923C1.11111 21.9055 -4.48654e-08 21.264 0 20.2376L8.07577e-07 1.76239C8.52443e-07 0.735985 1.11111 0.0944846 2 0.607685L18 9.84529Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          <div className={styles.albumInfo}>
            <div className={styles.titleAndFavorite}>
              <p className={styles.title}>{currentTrack.song.title}</p>

              <FavoriteButton favorited={favorited} onFavorite={onFavorite} />
            </div>

            <div className={styles.subtitle}>
              <span>{currentTrack.song.artist}</span>
              <span>|</span>
              <span>{currentTrack.song.album.title}</span>
              <span>|</span>
              <span>{currentTrack.song.album.year}</span>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
export default DisplayTrack;
