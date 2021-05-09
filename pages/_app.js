import * as React from "react";
import App from "next/app";
import { questionnairyAPI } from '../utils/request';
import { useStore } from '../states/store';
import { questionType } from "../utils/constant";

const { useEffect } = React;

const MyApp = ({ Component, pageProps, question }) => {
  const setQuestion = useStore(state => state.setQuestion);

  useEffect(() => {
    setQuestion(question)
  }, [])

  return (
    <Component {...pageProps} />
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const res = await questionnairyAPI.getQuestionnaires()
  const newData = res.data.map((item) => {
    if (item.type == questionType.multipleChoice) {
      let additionalData = []
      item.data.forEach(data => {
        if (!data.name) {
          const addData = {
            name: data,
            is_eligible_to_continue: true,
            selected: false
          }
          additionalData.push(addData)
          item.data = additionalData;
        }
        return data = {...data, selected: false}
      })
    } 

    if (item.type == questionType.text) {
      item.answer = ''
    }
    return item
  })

  return {...appProps, question: newData}

}

export default MyApp;