import { API_URL } from "@/utils/constants";
import { Song } from "@/types/song";

export const getSongById = async (id: string): Promise<Song> => {
  return fetch(`${API_URL}/song/${id}`).then((response) => response.json());
};
