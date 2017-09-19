<template lang="html">
  <div class="container">

    <h1 class="poll-title">{{poll.title}}</h1>
    <br>

    <div v-for="(question, index) in questions" class="col-md-24">
      <h3>{{question.text}}</h3>
      <hr>
      <div class="col-md-24 col-md-offset-2">

        <at-radio-group v-model="question.answer" size="large">
          <div v-for="(choice, index) in getChoicesForQuestion(question.id)" class="row choice-answer">
            <div class="col-md-12">
              <at-radio :label="choice.id" :disabled="!canTakePoll">{{choice.text}}</at-radio>
            </div>
            <div class="col-md-12">
              <div class="pull-right">
                <at-button v-if="choice.description" v-on:click="showDetails(question.text, choice.description)" size="small" icon="icon-book" class="margin-right-left" circle></at-button>
                <at-popover placement="bottom-right" title="Sources">
                  <at-button v-if="choice.sources.length" size="small" icon="icon-link" class="margin-right-left" circle></at-button>
                  <template slot="content">
                    <p v-for="source in choice.sources">
                      <a :href="source.url" target="_blank">{{source.url}}</a>
                    </p>
                  </template>
                </at-popover>
              </div>
            </div>
          </div>
        </at-radio-group>

      </div>
      <hr>
    </div>
    <at-button v-on:click="submitAnswers()" size="large" icon="icon-submit" :disabled="!canTakePoll">Submit</at-button>

    <at-modal v-model="showLoginModal" :closeOnPressEsc="false" :showClose="false" :maskClosable="false">
      <div style="text-align:center;">
        <h3>You Must Login To Take This Poll</h3>
      </div>
      <div slot="footer">
        <at-button type="info" @click="login()">Login</at-button>
        <at-button  @click="showLoginModal=false">No Thanks</at-button>
      </div>
    </at-modal>

    <UserRegistration
      :showModal="showUserRegistrationModal"
      :canClose="userRegistrationCanClose"
      :userId="userRegistrationUserId"
      @registrationComplete="registrationComplete"
    ></UserRegistration>

  </div>
</template>

<script>
import auth from '../authService.js';
import UserRegistration from '../components/userRegistration.vue'
import {
  getUserById,
  getPollById,
  getQuestionsByPollId,
  getChoicesByPollId,
  saveAnswer,
  getAnswersByUserIdAndPollId
} from '@/api.js'

import {
  validateUserObject
} from '@/models.js'

export default {
  props: ['auth'],
  components: {
    UserRegistration
  },
  data() {
    return {
      poll: {},
      questions: [],
      choices: [],
      showLoginModal: false,
      showUserRegistrationModal: false,
      userRegistrationCanClose: true,
      userRegistrationUserId: '',
      userRegistrationDone : true,
      userCanTakePoll: false
    }
  },
  created: function() {
    if(!this.auth.authenticated) {
      this.showLoginModal = true;
    } else {
      this.userRegistrationUserId = this.auth.getUserId();
      // get the user info from our db, make sure all required fields are filled
      getUserById(this.userRegistrationUserId).then((userData) => {
        if(userData === null || !validateUserObject(userData)) {
          this.showUserRegistrationModal = true;
          this.userRegistrationCanClose = false;
          this.userRegistrationDone = false;
        }
      })

    }
  },
  computed: {
    canTakePoll: function(){
      return this.auth.authenticated && this.userRegistrationDone && this.userCanTakePoll;
    }
  },
  mounted: function() {
    Promise.all([
      getPollById(this.$route.params.pollId),
      getQuestionsByPollId(this.$route.params.pollId),
      getChoicesByPollId(this.$route.params.pollId),
      getAnswersByUserIdAndPollId(this.userRegistrationUserId, this.$route.params.pollId)
    ]).then(([poll, questions, choices, answers]) => {
      console.log(answers)
      if(answers.length > 0) {
        this.userCanTakePoll = false;
      } else {
        this.userCanTakePoll = true;
      }
      this.poll = poll;
      this.questions = questions.map((question) => {
        let answer = answers.find((ans) => {
          return ans.questionId === question.id;
        })
        return Object.assign(question, {answer: answer ? answer.choiceId : ''});
      });
      this.choices = choices;
    })
  },
  methods: {
    registrationComplete: function() {
      console.log('registrationComplete')
      this.showUserRegistrationModal = false;
      this.userRegistrationCanClose = true;
      this.userRegistrationDone = true;
    },
    login: function(){
      this.auth.storeRedirect(this.$route.fullPath);
      this.auth.login();
    },
    showDetails: function(question, details) {
      this.$Modal.alert({
        title: question,
        content: details,
      })
    },
    getChoicesForQuestion: function(questionId) {
      return this.choices.filter((choice) => {
        return choice.questionId === questionId;
      })
    },
    submitAnswers: function() {
      try {
        let answers = this.questions.map((question) => {
          return {
            questionId: question.id,
            choiceId: question.answer,
            userId: this.auth.getUserId(),
            pollId: this.poll.id,
          }
          throw 'All Answers Are Required'
        });
        let answerPromises = [];
        for(let i=0;i<answers.length;i++) {
          answerPromises.push(saveAnswer(answers[i]))
        }
        Promise.all(answerPromises).then((response) => {
          this.userCanTakePoll = false;
          this.$Notify.success({
            title: 'Success',
            message: 'Thank You For Your Participation!'
          })
        })
      } catch(e){
        this.$Notify.error({
          title: 'Error',
          message: e
        })
      }

    }
  }
}
</script>

<style lang="css">
.at-radio-group {
  width:100%;
}
.choice-answer {
  padding:5px;
}
.pull-right {
  float:right;
}
.margin-right-left {
  margin-right: 5px;
  margin-left: 5px;
}
.poll-title {
  text-align: center;
}
</style>
