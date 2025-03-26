export default interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  genre: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalArtists: number;
  totalUsers: number;
}
