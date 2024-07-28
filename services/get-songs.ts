import { Song } from "@/types/song";

export const getSongs = async (): Promise<Song[]> => {
  return fetch("/api/songs")
    .then((response) => response.json())
    .then((r) => r.songs);
};
