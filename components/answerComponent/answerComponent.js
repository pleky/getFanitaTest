import * as React from 'react'
import { Col, Row, Input } from 'antd';
import CustomCheckbox from '../checkbox/customCheckbox';
import { questionType } from '../../utils/constant'
import propTypes from 'prop-types'
import { generatePostData } from '../../utils/helper';
import { useStore, useStoreData } from '../../states/store';

const selector = state => state.question;
const AnswerComponent = ({ type, data, questionIndex }) => {
    const { setData } = useStoreData(state => ({ postData: state.data, setData: state.setData }));
    const select = useStore(state => state.select);
    const setQuestionAnswer = useStore(state => state.setQuestionAnswer)
    const questionData = useStore(selector);

    const onChangeAnswer = (option) => {
        selectAnswer(option)
        const indexOfData = questionData[questionIndex].data.indexOf(option)
        select(questionIndex, indexOfData, option)
    }

    const selectAnswer = (option) => {
        setDataAnswer(option.name, questionType.multipleChoice);
    }

    const setDataAnswer = (value, type) => {
        const question = questionData[questionIndex].question;
        let data = generatePostData(question, value)
        if (type == questionType.multipleChoice) {
            data = generatePostData(question, value);
        }

        setQuestionAnswer(value, questionIndex)

        setData(data);
    }


    if ( type == questionType.multipleChoice ) {
        return (
            <Row gutter={[0, 8]}>
              {data.map((opt, index) => (
              <Col span={24}  key={index}>
                <CustomCheckbox label={opt.name} checked={opt.selected} onClick={() => onChangeAnswer(opt)} />
              </Col>
              ))}
            </Row>
        )
    }

    return (
        questionData ? 
        (
            <Input 
                onChange={(e) => setDataAnswer(e.currentTarget.value, type)}  
                defaultValue={questionData[questionIndex].answer} 
            /> 
        ) : 
        null
    )
}

AnswerComponent.propTypes = {
    type: propTypes.oneOf([questionType.multipleChoice, questionType.text]).isRequired,
}

export default AnswerComponent;