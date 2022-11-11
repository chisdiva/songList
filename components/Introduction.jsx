import { Card } from "antd";
import CountUp from "react-countup";
import Image from "next/image";

import styles from "../styles/Home.module.scss";
import { introduction as introText } from "../public/text/intro";

const Introduction = () => {
  return (
    <div className={styles.headWrapper}>
      {/* <Card> */}
      <h1 className={styles.title}>鸥诶OAK的歌单</h1>

      <div className={styles.header}>
        <Image
          src="/images/oakAvatar.webp"
          width={300}
          height={300}
          className={styles.avatar}
        />
        <div style={{ display: "inline-block" }}>
          {introText &&
            introText.map((val, index) => {
              return <p key={index}>{val}</p>;
            })}
        </div>
        <div>
          <b>曲库已有</b>
          <CountUp start={0} end={1123} duration={1} />
          <b>首歌</b>
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default Introduction;
