import { Input, Table, ConfigProvider, Button } from "antd";
import styles from "../styles/Home.module.scss";
import Image from "next/image";

import useTableSource from "../hooks/useTableSource";

const languageList = ["中文", "英文"];

const SongListTable = (props) => {
  // 搜索字符串
  // const [searchStr, setSearchStr] = useState('');
  const { musicList } = props;

  const {
    onInputChange,
    handleLanguageFilter,
    handleRowClick,
    handleRandom,
    // languageRef,
    language,
    filterMusicList,
  } = useTableSource({
    musicList,
  });

  const columns = [
    {
      title: "歌名",
      dataIndex: "songName",
      key: "songName",
      render(text, record) {
        const { videoUrl } = record;
        return (
          <>
            {videoUrl && (
              <a
                href={`https://www.bilibili.com/video/${videoUrl}`}
                target="blank"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Image
                  src="/images/bili.ico"
                  alt="去听听"
                  width={20}
                  height={20}
                />
              </a>
            )}
            <span style={{ marginLeft: "5px" }}>{text}</span>
          </>
        );
      },
    },
    {
      title: "歌手",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "语言",
      dataIndex: "language",
      key: "language",
    },
  ];

  const emptyTable = () => {
    return (
      <p style={{ color: "black", fontSize: "30px", fontWeight: "400" }}>
        歌单里暂无你要的歌哦~
      </p>
    );
  };

  return (
    <div className={styles.songListTable}>
      <div className={styles.filter}>
        <Input
          size="large"
          style={{ marginBottom: "20px" }}
          placeholder="搜索（点击对应歌曲可复制）"
          onChange={onInputChange}
        />
        {languageList.map((lang) => (
          <Button
            className={language === lang ? styles.activeFilter : ""}
            shape="round"
            size="large"
            onClick={() => handleLanguageFilter(lang)}
          >
            {lang}
          </Button>
        ))}
        <Button shape="round" size="large" onClick={handleRandom}>
          随机点一首
        </Button>
      </div>

      <ConfigProvider renderEmpty={emptyTable}>
        <Table
          columns={columns}
          dataSource={filterMusicList}
          pagination={false}
          tableLayout="fixed"
          scroll={{ x: 450 }}
          onRow={(record) => {
            return { onClick: () => handleRowClick(record) };
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default SongListTable;
