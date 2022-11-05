import { Input, Table } from "antd"
import styles from '../styles/Home.module.scss'
import Image from 'next/image'

import musicList from '../public/oakSongList.json'

import {useEffect, useState} from 'react'

const SongListTable = (props) => {
    // 搜索字符串
    // const [searchStr, setSearchStr] = useState('');
    const [filterMusicList, setFilterMusicList] = useState(musicList);
    // useEffect(() => {
            
    // }, [searchStr])

    const onInputChange = (e) => {
        const searchStr = e.target.value;
        if(!searchStr) {
            setFilterMusicList(musicList);
        }
        setFilterMusicList(musicList.filter((item) => {
            return Object.values(item).toString().toLowerCase().includes(searchStr.toLowerCase())
        }))
    }
    const columns = [
        {
            title: '歌名',
            dataIndex: 'song_name',
            key: 'song_name',
        },
        {
            title: '歌手',
            dataIndex: 'artist',
            key: 'artist',
        },
        {
            title: '语言',
            dataIndex: 'languageCell',
            key: 'language',
            width: '80px',
        },
        {
            title: '备注',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '歌切/投稿',
            dataIndex: 'videoUrl',
            key: 'videoUrl',
            align: 'center',
            width: '10vw',
            render(text) {
                return (
                    text && (
                        <a href={`https://www.bilibili.com/video/${text}`} target="blank" style={{textAlign: 'center'}}>
                        <Image src="/images/bili.ico" alt="去听听" width={20} height={20}/>
                    </a>
                    )              
                )
            }
        }

    ]

    return (
        <div 
            className={styles.songListTable}
        >
            <Input size="large" style={{marginBottom: '20px'}} placeholder="搜索" onChange={onInputChange}/>
            <Table 
                columns={columns}
                dataSource={filterMusicList}
                pagination={false}
                tableLayout="fixed"
                scroll={{x: 400}}
            />
        </div>
    )
}

export default SongListTable;