import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { Layout, Table } from "antd";

import SongListTable from "../components/SongListTable";
import Introduction from "../components/Introduction";
import { useEffect, useRef } from "react";

import musicList from "../public/oakSongList.json";

const { Header, Footer, Content } = Layout;
export default function Home() {
  const isNoHover = useRef(null);
  // 解决移动端输入法弹起导致背景被顶起问题
  useEffect(() => {
    const innerHeight = document.documentElement.clientHeight;
    document.getElementById("main").style.height = innerHeight + "px";
  }, []);

  useEffect(() => {
    isNoHover.current = window.matchMedia("(any-hover: none)");
  }, []);
  return (
    <div className={styles.container} id="main">
      <Head>
        <title>鸥诶oak的歌单</title>
        <meta
          name="viewport"
          id="viewportMeta"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Introduction musicNum={musicList.length} isNoHover={isNoHover} />
        <SongListTable musicList={musicList} />
      </main>

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
  );
}
