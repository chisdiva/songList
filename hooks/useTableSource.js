import {useState} from 'react'


const useTableSource = (props) => {
    const {musicList} = props;

    const [filterMusicList, setFilterMusicList] = useState(musicList);

    const onInputChange = (e) => {
        const searchStr = e.target.value;
        if(!searchStr) {
            setFilterMusicList(musicList);
        }
        setFilterMusicList(musicList.filter((item) => {
            return Object.values(item).toString().toLowerCase().includes(searchStr.toLowerCase())
        }))
    }

    return {
        onInputChange,
        filterMusicList,
    }
}

export default useTableSource