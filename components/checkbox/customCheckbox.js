import propTypes from 'prop-types';
import { Checkbox } from "antd";
import styles from './style.module.less'

function CustomCheckbox({onClick, checked, label}) {
    return (
        <div style={{borderColor: checked ? 'orange' : 'white'}}
          onClick={onClick}
          className={styles.checkboxWrapper}
        >
            <Checkbox checked={checked} className={styles.chek}>
                {label}
            </Checkbox>
        </div>
    )
}

CustomCheckbox.propTypes = {
    onClick: propTypes.func,
    checked: propTypes.bool,
    label: propTypes.string,
}

export default CustomCheckbox;