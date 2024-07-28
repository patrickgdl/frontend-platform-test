import { Song } from "@/types/song";

export const getSongById = async (id: string): Promise<Song> => {
  return fetch(`/api/song/${id}`).then((response) => response.json());
};
