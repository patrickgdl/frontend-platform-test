import Header from "@/components/header/header";
import styles from "@/styles/song.module.css";
import useSongById from "@/hooks/use-song-by-id";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import SearchInput from "@/components/search-input/search-input";
import Card from "@/components/card/card";
import AudioPlayer from "@/components/audio-player/audio-player";
import Link from "next/link";
import useSongs from "@/hooks/use-songs";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const songs = useSongs();
  const { song, relatedSongs } = useSongById({ id });

  if (!song) {
    return (
      <div className={styles.container}>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MUSE.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <SearchInput songs={songs} />
      </Header>

      <main className={styles.container}>
        <img
          className={styles.backgroundImage}
          src={`/assets/images/${song.song.files.coverArt}`}
        />
        <AudioPlayer currentTrack={song} />

        <div>
          <h4 className={styles.otherTitle}>Other albums</h4>
          <div className={styles.cards}>
            {relatedSongs.map((s) => {
              return (
                <Link key={s.id} href={`/song/${s.id}`}>
                  <Card
                    title={s.song.title}
                    subtitle={s.song.artist}
                    image={`/assets/images/${s.song.files.coverArt}`}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
