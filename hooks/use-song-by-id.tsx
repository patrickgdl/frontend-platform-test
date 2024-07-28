import * as React from "react";
import { Song } from "@/types/song";
import { getSongById } from "@/services/get-song-by-id";

const useSongById = ({ id }: { id: string | string[] }) => {
  const [song, setSong] = React.useState<Song>(null);
  const [relatedSongs, setRelatedSongs] = React.useState<Song[]>([]);

  const [error, setError] = React.useState<string>(null);

  React.useEffect(() => {
    const fetchSong = async () => {
      try {
        if (id && typeof id === "string") {
          const songData = await getSongById(id);
          setSong(songData);

          if (songData.related && songData.related.length > 0) {
            const relatedSongsData = await Promise.allSettled(
              songData.related.map((id) => getSongById(String(id)))
            );

            const fulfilledResults = relatedSongsData
              .filter((result) => result.status === "fulfilled")
              .map((result) => result.value);

            setRelatedSongs(fulfilledResults);
          } else {
            setRelatedSongs([]);
          }
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };

    fetchSong();
  }, [id]);

  return { song, relatedSongs, error };
};

export default useSongById;
