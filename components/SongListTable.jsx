import { Input, message, Table, ConfigProvider } from "antd";
import styles from "../styles/Home.module.scss";
import Image from "next/image";

import { useCallback } from "react";
import useTableSource from "../hooks/useTableSource";
import copy from "copy-to-clipboard";

const SongListTable = (props) => {
  // 搜索字符串
  // const [searchStr, setSearchStr] = useState('');
  const { musicList } = props;

  const { onInputChange, filterMusicList } = useTableSource({ musicList });

  const handleRowClick = useCallback((record) => {
    if (record.songName) {
      copy(`点歌 ${record.songName}`);
      message.success(`《${record.songName}》已复制到剪贴板，去点歌吧~`);
    }
  }, []);

  const columns = [
    {
      title: "歌名",
      dataIndex: "songName",
      key: "songName",
      width: "400px",
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
      width: "300px",
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
      <Input
        size="large"
        style={{ marginBottom: "20px" }}
        placeholder="搜索（点击对应歌曲可复制）"
        onChange={onInputChange}
      />
      <ConfigProvider renderEmpty={emptyTable}>
        <Table
          columns={columns}
          dataSource={filterMusicList}
          pagination={false}
          // tableLayout="fixed"
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
