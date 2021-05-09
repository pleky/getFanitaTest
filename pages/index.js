import * as React from 'react'
import Head from "next/head";
import { Row, Col, Button, Typography } from "antd";
import styles from  '../styles/main.module.less'
import { Header } from '../components';
import {
  RightOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Text, Title } = Typography;

function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Get Fanita Test</title>
      </Head>
      <Header />

      <main>
        <section className={styles.question}>
          <Row justify='center' align='middle'>
            <Col>
                <Title level={5}>
                 Selamat Datang, Silahkan tekan button di bawah untuk melanjutkan!
                </Title>
            </Col>
          </Row>
        </section>

        <section className={styles.action}>
          <Row justify='center' gutter={16}>
              <Col>
                <Button onClick={() => router.push('/question/0')}>
                    Lanjutkan
                    <RightOutlined />
                </Button>
              </Col>
          </Row>
        </section>
      </main>
    </>
  )
}

export default Home