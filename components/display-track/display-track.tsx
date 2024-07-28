import { Song } from "@/types/song";

import styles from "./display-track.module.css";

type DisplayTrackProps = {
  currentTrack: Song;
  children: React.ReactNode;
  setDuration: (duration: number) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  progressBarRef: React.MutableRefObject<HTMLInputElement>;
};

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  children,
}: DisplayTrackProps) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = String(seconds);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        src={`/assets/audio/${currentTrack.song.files.audio}`}
      />
      <div className={styles.audioInfo}>
        <div className={styles.audioImage}>
          {currentTrack.song.files.coverArt ? (
            <img
              alt="Audio cover art"
              src={`/assets/images/${currentTrack.song.files.coverArt}`}
            />
          ) : (
            <div className={styles.iconWrapper}>
              <span className={styles.audioIcon}>ALGUM ICONE</span>
            </div>
          )}
        </div>
        <div>
          <p className={styles.title}>{currentTrack.song.title}</p>
          <p>
            {currentTrack.song.artist} | {currentTrack.song.album.title} |{" "}
            {currentTrack.song.album.year}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
