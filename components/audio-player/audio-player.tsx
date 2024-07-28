import useLocalStorage from "@/hooks/use-local-storage";
import { Song } from "@/types/song";
import * as React from "react";

import DisplayTrack from "../display-track/display-track";
import ProgressBar from "../progress-bar/progress-bar";
import styles from "./audio-player.module.css";

const AudioPlayer = ({ currentTrack }: { currentTrack: Song }) => {
  const [duration, setDuration] = React.useState(0);
  const [timeProgress, setTimeProgress] = React.useState(0);

  const audioRef = React.useRef<HTMLAudioElement>();
  const progressBarRef = React.useRef<HTMLInputElement>();

  const [favoriteSongs, setFavoriteSongs] = useLocalStorage(
    "favoriteSongs",
    []
  );

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = String(seconds);
  };

  const handleFavoriteSong = (id: number) => {
    setFavoriteSongs((prevFavorites: number[]) => {
      if (prevFavorites.includes(id)) {
        // Remove from favorites
        return prevFavorites.filter((favId) => favId !== id);
      } else {
        // Add to favorites
        return [...prevFavorites, id];
      }
    });
  };

  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        src={`/assets/audio/${currentTrack.song.files.audio}`}
      />

      <DisplayTrack
        duration={duration}
        audioRef={audioRef}
        currentTrack={currentTrack}
        progressBarRef={progressBarRef}
        setTimeProgress={setTimeProgress}
        favorited={favoriteSongs.includes(currentTrack.id)}
        onFavorite={() => handleFavoriteSong(currentTrack.id)}
      >
        <ProgressBar
          duration={duration}
          audioRef={audioRef}
          timeProgress={timeProgress}
          progressBarRef={progressBarRef}
        />
      </DisplayTrack>
    </div>
  );
};
export default AudioPlayer;
