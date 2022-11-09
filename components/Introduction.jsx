import { Card } from 'antd'
import CountUp from 'react-countup'
import styles from '../styles/Home.module.scss'

const Introduction = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>鸥诶OAK的歌单</h1>
            <Card>
                <CountUp start={0} end={1123} duration={1}/>
            </Card>
            
        </div>
    )
}

export default Introduction