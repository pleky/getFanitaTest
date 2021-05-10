import * as React from 'react'
import Head from "next/head";
import { Row, Col, Typography, Button, Spin } from "antd";
import styles from  '../../styles/main.module.less'
import { AnswerComponent, CustomProgress, Header } from '../../components';
import {
  RightOutlined
} from '@ant-design/icons';
import { useStore, useStoreData } from '../../states/store';
import { useRouter } from 'next/router';
import { questionType } from '../../utils/constant';
import { questionnairyAPI } from '../../utils/request';

const { Text, Title } = Typography;

const selector = state => state.question;

const isFistQuestion = 0;

function QuestionPage() {
  const [canContinue, setCanContinue] = React.useState(true)
  const [valid, setValid] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()
  const { qid } = router.query

  const dataToSubmit = useStoreData(state => state.data)
  const resetQuestion = useStore(state => state.resetQuestion)
  const resetData = useStoreData(state => state.resetData)
  const questionData = useStore(selector);
  const lastOption =  useStore(state => state.lastOption);
  const setLastOption =  useStore(state => state.setLastOption);

  const isLastQuestion = questionData && questionData.length ? qid == questionData.length - 1 : false

  React.useEffect(() => {
    if (!questionData) {
      console.log('not found')
      // router.replace('/asdfasdf')
      window.location.href = '/404'
      return false
    }
    return true
  }, [questionData])

  const nextPage = (type) => {
    let currentQuestion = qid;
    currentQuestion++;
    if ( currentQuestion >= questionData.length) {
      return
    }

    let selectedOption = null

    if (questionData && questionData[qid].data) {
      selectedOption = questionData[qid].data.find((question) => question.selected == true)
      setLastOption(selectedOption)
    }

    if (selectedOption && type == questionType.multipleChoice) {
      if (!selectedOption.is_eligible_to_continue) {
        setCanContinue(false)
        setValid(true)
        return
      }
    }

    if (!selectedOption && type == questionType.multipleChoice) {
      setValid(false)
      return 
    }

    if (questionData && questionData[qid].type == questionType.text) {
      if (!questionData[qid].answer) {
        setValid(false)
        return 
      }
    }

    setValid(true)
    router.push(`/question/${currentQuestion}`);
  }

  const handleBack = () => {
    setCanContinue(true)
  }

  const handleBackAndReset = () => {
    router.back()
  }

  const handleSubmit = async () => {
    if (questionData && questionData[qid].type == questionType.text) {
      if (!questionData[qid].answer) {
        setValid(false)
        return 
      }
    }

    setIsSubmitting(true)
    const resp = await questionnairyAPI.createQuestionnaires(dataToSubmit)
    if (resp.status_code == 201) {
      setIsSubmitting(false)
      resetData()
      resetQuestion()
      router.replace('/')
    }

  }

  if (!canContinue) {
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
                  We are sorry but due to the following reasons:
                </Title>
            </Col>
          </Row>
        </section>

        <section className={styles.answer}>
          <Text>{lastOption.message}</Text>
        </section>

        <section className={styles.action}>
          <Row justify='center' gutter={16}>
              <Col>
                <Button onClick={() => handleBack()}>
                  Kembali
                </Button>
              </Col>
          </Row>
        </section>
      </main>
      </>
    )
  }

  return (
    questionData && questionData.length &&
     <>
      <Head>
        <title>Get Fanita Test</title>
      </Head>
      <Header />

      <main>
        <CustomProgress totalQuestion={questionData.length - 1} currentQuestionNumber={parseInt(qid)} />
        <section className={styles.question}>
          <Row justify='center' align='middle'>
            <Col>
                <Title level={5}>
                 {questionData[qid].question}
                </Title>
            </Col>
          </Row>
        </section>

        <section className={styles.answer}>
          <AnswerComponent questionIndex={qid} data={questionData[qid].data} type={questionData[qid].type}/>
        </section>

        <Row justify='center'>
          <Col>
            {!valid ? (<Text>Silahkan Pilih Jawaban / Isi Data Anda!</Text>) : null}
          </Col>
        </Row>

        <section className={styles.action}>
          <Row justify='center' gutter={16}>
            {
              parseInt(qid) !== isFistQuestion ? (
                <Col>
                <Button onClick={() => handleBackAndReset()}>
                  Kembali
                </Button>
              </Col>
              ) : null
            }
           
           {
             isLastQuestion ? (
                <Col>
                  <Button disabled={isSubmitting} type="primary" onClick={() => handleSubmit()}>
                    {
                      isSubmitting ? <Spin /> : <>Submit <RightOutlined /></>
                    }
                  </Button>
                </Col>
              ) : ( 
                <Col>
                  <Button type="primary" onClick={() => nextPage(questionData[qid].type)}>
                    Selanjutnya
                    <RightOutlined />
                  </Button>
                </Col>
              )
           }
          </Row>
        </section>
      </main>
      </>
  );
}

export default QuestionPage