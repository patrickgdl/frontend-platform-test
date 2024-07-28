import { API_URL } from "@/utils/constants";
import { Song } from "@/types/song";

export const getSongs = async (): Promise<Song[]> => {
  return fetch(`${API_URL}/songs`)
    .then((response) => response.json())
    .then((r) => r.songs);
};
