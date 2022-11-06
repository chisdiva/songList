import { Input, message, Table, ConfigProvider } from "antd"
import styles from '../styles/Home.module.scss'
import Image from 'next/image'


import {useCallback} from 'react'
import useTableSource from "../hooks/useTableSource"
import copy from "copy-to-clipboard"

const SongListTable = (props) => {
    // 搜索字符串
    // const [searchStr, setSearchStr] = useState('');
    const {musicList} = props;
    
    const {
        onInputChange,
        filterMusicList,
    } = useTableSource({musicList})

    const handleRowClick = useCallback((record) => {
        if(record.song_name) {
            copy(`点歌 ${record.song_name}`);
            message.success(`《${record.song_name}》已复制到剪贴板`)
        };
    }, [])

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

    const emptyTable = () => {
        return (
            <p style={{color: "black", fontSize: '30px', fontWeight: '400'}}>歌单里暂无你要的歌哦~</p>
        )
    };

    return (
        <div 
            className={styles.songListTable}
        >
            <Input size="large" style={{marginBottom: '20px'}} placeholder="搜索" onChange={onInputChange}/>
            <ConfigProvider renderEmpty={emptyTable}>
            <Table 
                columns={columns}
                dataSource={filterMusicList}
                pagination={false}
                tableLayout="fixed"
                scroll={{x: 450}}
                onRow={(record) => {return {onClick: () => handleRowClick(record)}}}
            />
            </ConfigProvider>
        </div>
    )
}

export default SongListTable;