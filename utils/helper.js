import { 
    getBool,
    LABEL_AGE, 
    LABEL_ALLERGIC, 
    LABEL_BLOOD_PREASSURE,
    LABEL_GENDER,
    LABEL_NAME, 
    LABEL_PREGNANT, 
    LABEL_SMOKER 
} from "./constant"

export const generatePostData = (question, answer) => {
  let data = {}

  if (question.includes(LABEL_NAME)) data = {...data, 'name' : answer}
  if (question.includes(LABEL_AGE)) data = {...data, 'age_range' : answer} 
  if (question.includes(LABEL_ALLERGIC)) data = {...data, 'patient_allergic' : answer} 
  if (question.includes(LABEL_BLOOD_PREASSURE)) data = {...data, 'is_patient_has_blood_preassure' : getBool[answer]}
  if (question.includes(LABEL_PREGNANT)) data = {...data, 'is_patient_pregnant' : getBool[answer]}
  if (question.includes(LABEL_SMOKER)) data = {...data, 'is_patient_smoke' : getBool[answer]}
  if (question.includes(LABEL_GENDER)) data = {...data, 'gender' : answer}
  return data;
}