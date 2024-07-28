export interface Song {
  id: number;
  song: Metadata;
}

export interface Metadata {
  album: Album;
  artist: string;
  title: string;
  files: Files;
}

export interface Album {
  title: string;
  year: number;
}

export interface Files {
  coverArt: string;
  poster: string;
  audio: string;
}
