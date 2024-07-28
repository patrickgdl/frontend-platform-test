import Card from "@/components/card/card";
import SearchInput from "@/components/search-input/search-input";
import Switch from "@/components/switch/switch";
import Toggle from "@/components/toggle/toggle";
import { getSongs } from "@/services/get-songs";
import styles from "@/styles/home.module.css";
import { Song } from "@/types/song";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

export default function Home() {
  const router = useRouter();
  const [songs, setSongs] = React.useState<Song[]>([]);

  const { query } = router;
  const { sort } = query;

  const orderedSongs = React.useMemo(() => {
    return sort
      ? songs.sort((a, b) => {
          if (sort === "asc") {
            return a.song.title.localeCompare(b.song.title);
          } else if (sort === "desc") {
            return b.song.title.localeCompare(a.song.title);
          } else {
            throw new Error("Invalid sort order");
          }
        })
      : songs;
  }, [sort, songs]);

  React.useEffect(() => {
    getSongs()
      .then((data) => setSongs(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSwitchSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSort = event.target.checked ? "asc" : "desc";
    router.push({ pathname: "/", query: { sort: newSort } });
  };

  return (
    <>
      <Head>
        <title>MUSE.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.navigation}>
          <div>
            <div className={styles.library}>
              <h1 className={styles.title}>Your Library</h1>
              <Toggle>
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
              <Switch onChange={handleSwitchSort} />
            </div>

            <SearchInput songs={orderedSongs} />
          </div>
        </div>

        <div className={styles.cards}>
          {orderedSongs.map((s) => {
            return (
              <Link href={`/song/${s.id}`}>
                <Card
                  key={s.id}
                  hasFavorite
                  favorited={true}
                  onFavorite={() => null}
                  title={s.song.title}
                  subtitle={s.song.artist}
                  image={`assets/images/${s.song.files.coverArt}`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
