import { Card } from "antd";
import CountUp from "react-countup";
import Image from "next/image";

import styles from "../styles/Home.module.scss";
import { introduction as introText } from "../public/text/intro";

const Introduction = (props) => {
  const { musicNum } = props;
  const handleFlipClick = (e) => {
    console.log(e.currentTarget);
  };
  return (
    <div className={styles.headWrapper}>
      <h1 className={styles.title}>鸥诶OAK的歌单</h1>
      <div style={{ textAlign: "center" }}>
        <b>曲库已有</b>
        <CountUp
          start={0}
          end={musicNum}
          duration={1}
          style={{
            fontWeight: "bolder",
            fontSize: "18px",
            color: "rgb(80, 98, 90)",
          }}
        />
        <b>首歌，持续更新中</b>
      </div>
      <div style={{ height: 300, marginTop: 20 }}>
        <div className={styles.flipHeader} onClick={handleFlipClick}>
          <div className={styles.frontCard}>
            <Image
              src="/images/oakAvatar.webp"
              width={250}
              height={250}
              className={styles.avatar}
            />
          </div>
          <div className={styles.backCard}>
            {introText &&
              introText.map((val, index) => {
                return <p key={index}>{val}</p>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
