import propTypes from 'prop-types';
import { Col, Row, Typography, Progress } from "antd";
import styles from '../../styles/main.module.less'

const { Text } = Typography;


const percent = (total, current) => {
    let data = 0
    let diff = total - current;
    if (current !== 0) {
        data = 100 - (diff * 10)
    }
    return data;
}

const CustomProgress = ({ totalQuestion, currentQuestionNumber }) => {
    return (
        <>
            <Row justify='end'>
                <Col>
                    <Text type="secondary" className={styles.textSmall}>
                        {currentQuestionNumber + ' / ' + totalQuestion + ' Pertanyaan'}
                    </Text>
                </Col>
            </Row>
            <Progress percent={percent(totalQuestion, currentQuestionNumber)} showInfo={false} />
        </>
    )
}

CustomProgress.propTypes = {
    totalQuestion: propTypes.number,
    currentQuestionNumber: propTypes.number,
}

export default CustomProgress