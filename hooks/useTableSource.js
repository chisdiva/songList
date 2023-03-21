import { useState, useCallback, useRef } from "react";
import { message } from "antd";
import copy from "copy-to-clipboard";
import { debounce, throttle } from "../utils";

const useTableSource = (props) => {
  const { musicList } = props;

  const [language, setLanguage] = useState("");

  const [searchStr, setSearchStr] = useState("");

  const handleRowClick = useCallback((record) => {
    if (record.songName) {
      copy(`点歌 ${record.songName}`);
      message.success(`《${record.songName}》已复制到剪贴板，去点歌吧~`);
    }
  }, []);

  const handleRandom = throttle(() => {
    const length = musicList?.length ?? 0;
    const random = Math.floor(Math.random() * length);
    handleRowClick(musicList[random]);
  }, 500);

  const filterMusicList = musicList.filter((item) => {
    return (
      (searchStr
        ? Object.values(item)
            .toString()
            .toLowerCase()
            .includes(searchStr.toLowerCase())
        : true) && (language ? item.language.includes(language) : true)
    );
  });

  const handleLanguageFilter = throttle((lang) => {
    setLanguage(language === lang ? "" : lang);
  }, 500);

  const onInputChange = (e) => {
    const search = e.target.value;
    // setSearchStr(search);
    searchChange(e.target.value);
  };

  const searchChange = debounce((val) => {
    setSearchStr(val);
  }, 500);

  return {
    onInputChange,
    handleLanguageFilter,
    handleRowClick,
    handleRandom,
    language,
    filterMusicList,
  };
};

export default useTableSource;
