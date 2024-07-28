import { Song } from "@/types/song";
import * as React from "react";

import Controls from "../controls/controls";
import DisplayTrack from "../display-track/display-track";
import ProgressBar from "../progress-bar/progress-bar";
import styles from "./audio-player.module.css";

const AudioPlayer = ({ currentTrack }: { currentTrack: Song }) => {
  const [duration, setDuration] = React.useState(0);
  const [timeProgress, setTimeProgress] = React.useState(0);

  const audioRef = React.useRef<HTMLAudioElement>();
  const progressBarRef = React.useRef<HTMLInputElement>();

  return (
    <div className={styles.audioPlayer}>
      <DisplayTrack
        audioRef={audioRef}
        setDuration={setDuration}
        currentTrack={currentTrack}
        progressBarRef={progressBarRef}
      >
        <Controls
          duration={duration}
          audioRef={audioRef}
          setTimeProgress={setTimeProgress}
          progressBarRef={progressBarRef}
        />

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
