import styles from "./progress-bar.module.css";

type ProgressBarProps = {
  duration: number;
  timeProgress: number;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  progressBarRef: React.MutableRefObject<HTMLInputElement>;
};

const ProgressBar = ({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}: ProgressBarProps) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = +progressBarRef.current.value;
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className={styles.progress}>
      <span className={styles.time}>{formatTime(timeProgress)}</span>
      <input
        type="range"
        defaultValue="0"
        ref={progressBarRef}
        onChange={handleProgressChange}
      />
      <span className={styles.time}>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
