import { Row, Col } from "antd";
import Image from 'next/image'
import styles from './header.module.less'

const Header = () => {
    return (
        <header className={styles.header}>
            <Row align='middle' justify='center'>
                <Col>
                    <Image src="/logo.png" alt="logo Get Fanita" width="90" height="40" />
                </Col>
            </Row>
        </header>
    )
}

export default Header