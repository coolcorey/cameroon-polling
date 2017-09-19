import Vue from 'vue'

let host = 'http://localhost:8090/v2'

import {
  getNewUserObject,
  getNewChoiceObject,
  getNewQuestionObject,
  getNewPollObject,
  validateUserObject,
  validatePollObject,
  validateQuestionObject,
  validateChoiceObject,
  validateAnswerObject
} from '@/models.js'

export function getAnswersByUserIdAndPollId(userId, pollId) {
  return new Promise((resolve, reject) => {
    if(userId && pollId) {
      Vue.http.get(`${host}/answer/${userId}/${pollId}`).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });
    } else {
      // return a blank one
      resolve([])
    }
  })
}

export function getUserById(userId) {
  return new Promise((resolve, reject) => {
    let userObj = getNewUserObject();
    if(userId) {
      Vue.http.get(`${host}/user/${userId}`).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });
    } else {
      // return a blank one
      resolve(userObj)
    }
  })
}

export function getPolls(page) {
  return new Promise((resolve, reject) => {
    page = page || 0;
    Vue.http.get(`${host}/polls/${page}`).then((response) => {
      resolve(response.body);
    }).catch((err) => {
      reject(err);
    });
  })
}

export function getPollById(pollId) {
  return new Promise((resolve, reject) => {
    let pollObj = getNewPollObject();

    if(pollId) {
      Vue.http.get(`${host}/poll/${pollId}`).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });
    } else {
      // return a blank one
      resolve(pollObj)
    }
  })
}

export function getQuestionsByPollId(pollId) {
  return new Promise((resolve, reject) => {
    let questionObj = []

    if(pollId) {
      Vue.http.get(`${host}/questionsByPollId/${pollId}`).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });
    } else {
      // return a blank one
      resolve(questionObj)
    }
  })
}

export function getChoicesByPollId(pollId) {
  return new Promise((resolve, reject) => {
    let choicesObj = []

    if(pollId) {
      Vue.http.get(`${host}/choicesByPollId/${pollId}`).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });
    } else {
      // return a blank one
      resolve(choicesObj)
    }
  })
}

export function createUser(user) {
  return new Promise((resolve, reject) => {
    if(validateUserObject(user)){
      let method = 'post';
      user.updated = new Date();
      user.created = new Date();

      Vue.http[method](`${host}/user`, user).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });

    } else {
      console.log('reject on ', user)
      reject();
    }
  })
}

export function updateUser(user) {
  return new Promise((resolve, reject) => {
    if(validateUserObject(user)){
      let method = 'put';
      user.updated = new Date();

      Vue.http[method](`${host}/user/${user.id}`, user).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });

    } else {
      console.log('reject on ', user)
      reject();
    }
  })
}

export function savePoll(poll) {
  return new Promise((resolve, reject) => {
    if(validatePollObject(poll)){
      let method = poll.id ? 'put' : 'post';
      poll.updated = new Date();
      poll.created = poll.id ? poll.created : new Date();

      Vue.http[method](`${host}/poll`, poll).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });

    } else {
      console.log('reject on ', poll)
      reject();
    }
  })
}

export function saveQuestion(question) {
  return new Promise((resolve, reject) => {
    if(validateQuestionObject(question)){
      let method = question.id ? 'put' : 'post';
      question.updated = new Date();
      question.created = question.id ? question.created : new Date();

      Vue.http[method](`${host}/question`, question).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });

    } else {
      console.log('reject on ', question)
      reject();
    }
  })
}

export function saveChoice(choice) {
  return new Promise((resolve, reject) => {
    if(validateChoiceObject(choice)){
      let method = choice.id ? 'put' : 'post';
      choice.updated = new Date();
      choice.created = choice.id ? choice.created : new Date();

      Vue.http[method](`${host}/choice`, choice).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });

    } else {
      console.log('reject on ', choice)
      reject();
    }
  })
}

export function saveAnswer(answer) {
  return new Promise((resolve, reject) => {
    if(validateAnswerObject(answer)){
      let method = answer.id ? 'put' : 'post';
      answer.updated = new Date();
      answer.created = answer.id ? answer.created : new Date();

      Vue.http[method](`${host}/answer`, answer).then((response) => {
        resolve(response.body);
      }).catch((err) => {
        reject(err);
      });

    } else {
      console.log('reject on ', answer)
      reject();
    }
  })
}

export function deleteChoice(choiceId) {
  return new Promise((resolve, reject) => {
    Vue.http.delete(`${host}/choice/${choiceId}`).then((response) => {
      resolve(response.body);
    }).catch((err) => {
      reject(err);
    });
  })
}

export function deleteQuestion(questionId) {
  return new Promise((resolve, reject) => {
    Vue.http.delete(`${host}/question/${questionId}`).then((response) => {
      resolve(response.body);
    }).catch((err) => {
      reject(err);
    });
  })
}

export function deletePoll(pollId) {
  return new Promise((resolve, reject) => {
    Vue.http.delete(`${host}/poll/${pollId}`).then((response) => {
      resolve(response.body);
    }).catch((err) => {
      reject(err);
    });
  })
}
