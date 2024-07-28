import Header from "@/components/header/header";
import styles from "@/styles/song.module.css";
import useSongById from "@/hooks/use-song-by-id";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import SearchInput from "@/components/search-input/search-input";
import Card from "@/components/card/card";
import AudioPlayer from "@/components/audio-player/audio-player";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const { song, relatedSongs } = useSongById({ id });

  if (!song) return <h1>Loading...</h1>;

  return (
    <>
      <Head>
        <title>MUSE.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <SearchInput songs={[]} />
      </Header>

      <main className={styles.container}>
        <div className={styles.navigation}>
          <AudioPlayer currentTrack={song} />
        </div>

        <div>
          <h4>Other albums</h4>
          <div className={styles.cards}>
            {relatedSongs.map((s) => {
              return (
                <Card
                  key={s.id}
                  title={s.song.title}
                  subtitle={s.song.artist}
                  image={`/assets/images/${s.song.files.coverArt}`}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
