export function getNewChoiceObject() {
  return {
    id: '',
    pollId: '',
    questionId: '',
    text: '',
    description: '',
    sources: [],
    created: '',
    updated: ''
  }
}

export function getNewQuestionObject(){
  return {
    id: '',
    pollId: '',
    text: '',
    description: '',
    sources: [],
    created: '',
    updated: ''
  }
}

export function getNewPollObject(){
  return {
    id: '',
    title: '',
    created: '',
    updated: ''
  }
}

export function getNewUserObject(){
  return {
    id: '',
    firstName: '',
    fullMiddleName: '',
    lastName: '',
    /*
    nameAtBirth: '',
    otherNamesUsed: '',
    CIN: '',
    cityOfBirth: '',
    countyOfBirth: '',
    countryOfBirth: '',
    dateOfBirth: '',
    */
    homeCounty: '',
    countryOfBirth: '',
    /*
    citizenship: '',
    ethnicity: '',
    sex: '',
    motherFirstName: '',
    motherFullMiddleName: '',
    motherLastName: '',
    mothersCIN: '',
    fatherFirstName: '',
    fatherFullMiddleName: '',
    fatherLastName: '',
    fathersCIN: '',
    dayTimePhoneNumber: '',
    streetAddress: '',
    flatNumber: '',
    postOfficeBox: '',
    ruralRouteNumber: '',
    cityTownVillage: '',
    county: '',
    state: '',
    addressCode: '',
    age: '',
    citizenofStateBritishSouthernCameroons: '',
    participatingOwnFreeWill: '',
    */
    created: '',
    updated: ''
  }
}

export function validateUserObject(user){
  return user.firstName &&
  user.fullMiddleName &&
  user.lastName &&
  user.homeCounty &&
  user.countryOfBirth;
}

export function validatePollObject(poll){
  return poll.title;
}

export function validateQuestionObject(question){
  return question.pollId && question.text;
}

export function validateChoiceObject(choice){
  return choice.questionId && choice.pollId && choice.text;
}

export function validateAnswerObject(answer){
  return answer.questionId && answer.pollId && answer.choiceId;
}
