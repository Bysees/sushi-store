import { labelTitles } from '../../consts/labels'

export const labelsToRus = (labels) => {
  let result = [labelTitles.rus.all]
  labels.forEach((label) => {
    result = [...result, labelTitles.rus[label]]
  })
  return result
}

export const labelToEng = (label) => {
  let result = labelTitles.eng.all;
  for (let labelEng in labelTitles.eng) {
    if (labelTitles.rus[labelEng] === label) {
      result = labelEng
    }
  }
  return result
}