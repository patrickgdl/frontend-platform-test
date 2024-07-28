import Card from "@/components/card/card";
import SearchInput from "@/components/search-input/search-input";
import Switch from "@/components/switch/switch";
import Toggle from "@/components/toggle/toggle";
import Header from "@/components/header/header";
import useLocalStorage from "@/hooks/use-local-storage";
import useSongs from "@/hooks/use-songs";
import styles from "@/styles/home.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

export default function Home() {
  const router = useRouter();

  const { query } = router;
  const { sort, favoritesOnly } = query;

  const songs = useSongs();
  const [favoriteSongs, setFavoriteSongs] = useLocalStorage(
    "favoriteSongs",
    []
  );

  const orderedSongs = React.useMemo(() => {
    return sort === "true"
      ? [...songs].sort((a, b) => a.song.title.localeCompare(b.song.title))
      : songs;
  }, [sort, songs]);

  const filteredSongs = React.useMemo(() => {
    return favoritesOnly === "true"
      ? orderedSongs.filter((s) => favoriteSongs.includes(s.id))
      : orderedSongs;
  }, [favoritesOnly, orderedSongs]);

  const handleSwitchSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname: "/",
      query: { favoritesOnly, sort: e.target.checked },
    });
  };

  const handleFavoriteFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname: "/",
      query: { sort, favoritesOnly: e.target.checked },
    });
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
    <>
      <Head>
        <title>MUSE.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.navigation}>
          <div>
            <div className={styles.library}>
              <h1 className={styles.title}>Your Library</h1>
              <Toggle
                checked={favoritesOnly === "true"}
                onChange={handleFavoriteFilter}
              >
                <span>Favorites</span>
              </Toggle>
            </div>

            <h2 className={styles.subtitle}>
              You have {songs.length} songs in your library
            </h2>
          </div>

          <div className={styles.filters}>
            <div className={styles.sort}>
              <h3>Sort from A-Z</h3>
              <Switch checked={sort === "true"} onChange={handleSwitchSort} />
            </div>

            <SearchInput songs={songs} />
          </div>
        </div>

        <div className={styles.cards}>
          {filteredSongs.map((s) => {
            return (
              <Link key={s.id} href={`/song/${s.id}`}>
                <Card
                  hasFavorite
                  title={s.song.title}
                  subtitle={s.song.artist}
                  favorited={favoriteSongs.includes(s.id)}
                  onFavorite={() => handleFavoriteSong(s.id)}
                  image={`assets/images/${s.song.files.coverArt}`}
                />
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
