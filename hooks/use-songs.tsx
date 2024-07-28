import * as React from "react";
import { Song } from "@/types/song";
import { getSongs } from "@/services/get-songs";

const useSongs = () => {
  const [songs, setSongs] = React.useState<Song[]>([]);

  React.useEffect(() => {
    getSongs()
      .then((data) => setSongs(data))
      .catch((error) => console.log(error));
  }, []);

  return songs;
};

export default useSongs;
