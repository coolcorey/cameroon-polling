<template lang="html">
  <div class="">

    <div class="row">
      <div class="col-md-24 bottom-border">
        <div class="pull-right">
          <small v-show="poll.id">Poll ID: {{poll.id}}</small>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-24 bottom-border">
        <h1>Poll
          <at-button v-on:click="savePoll(poll)" type="primary" icon="icon-save" circle class="pull-right"></at-button>
          <at-button v-on:click="deletePoll()" icon="icon-x" size="small" class="pull-right margin-right" circle></at-button>
        </h1>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-24 col-md-8">
        <h2>Poll Title</h2>
      </div>
      <div class="col-xs-24 col-md-16">
        <at-input v-model="poll.title" :status="isRequired(poll.title)" size="large"></at-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-24 bottom-border">
        <h2>Questions <at-button v-on:click="addQuestion(poll)" icon="icon-plus" size="small" class="pull-right" :disabled="!poll.id" circle></at-button></h2>
      </div>

      <div v-for="(question, index) in questions" class="col-md-24 bottom-border">

        <div class="row">
          <div class="col-md-24">
            <at-button v-on:click="saveQuestion(question)" icon="icon-save" size="small" class="pull-right" circle></at-button>
            <at-button v-on:click="deleteQuestion(index)" icon="icon-x" size="small" class="pull-right margin-right" circle></at-button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-24 col-md-6 col-md-offset-2">
            <h3>Text</h3>
          </div>
          <div class="col-xs-24 col-md-14">
            <at-input v-model="question.text" :status="isRequired(question.text)" size="large"></at-input>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-24 col-md-6 col-md-offset-2">
            <h3>Description</h3>
          </div>
          <div class="col-xs-24 col-md-14">
            <at-textarea v-model="question.description" size="large"></at-textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-24 col-md-6 col-md-offset-2">
            <h3>Sources <at-button v-on:click="addQuestionSource(question)" icon="icon-plus" size="small" class="pull-right" circle></at-button></h3>
          </div>
          <div class="col-xs-24 col-md-14">
            <at-input v-for="source in question.sources" v-model="source.url" size="large"></at-input>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-24 col-md-6 col-md-offset-2">
            <h3>Choices <at-button v-on:click="addQuestionChoice(poll, question)" icon="icon-plus" size="small" class="pull-right" :disabled="!question.id" circle></at-button></h3>
          </div>
          <div class="col-xs-24 col-md-14">
            <div v-for="(choice, index) in getChoicesForQuestion(question.id)" class="bottom-border">

              <div class="row">
                <div class="col-md-24">
                  <at-button v-on:click="saveChoice(choice)" icon="icon-save" size="small" class="pull-right" circle></at-button>
                  <at-button v-on:click="deleteChoice(index)" icon="icon-x" size="small" class="pull-right margin-right" circle></at-button>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-24 col-md-6 col-md-offset-2">
                  <h3>Text</h3>
                </div>
                <div class="col-xs-24 col-md-14">
                  <at-input v-model="choice.text" :status="isRequired(choice.text)" size="large"></at-input>
                </div>
              </div>


              <div class="row">
                <div class="col-xs-24 col-md-6 col-md-offset-2">
                  <h3>Description</h3>
                </div>
                <div class="col-xs-24 col-md-14">
                  <at-textarea v-model="choice.description" size="large"></at-textarea>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-24 col-md-6 col-md-offset-2">
                  <h3>Sources <at-button v-on:click="addChoiceSource(choice)" icon="icon-plus" size="small" class="pull-right" circle></at-button></h3>
                </div>
                <div class="col-xs-24 col-md-14">
                  <at-input v-for="source in choice.sources" v-model="source.url" size="large"></at-input>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {
  getPolls,
  getPollById,
  getQuestionsByPollId,
  getChoicesByPollId,
  savePoll,
  saveQuestion,
  saveChoice,
  deleteChoice,
  deleteQuestion,
  deletePoll
} from '@/api.js'
import {
  getNewChoiceObject,
  getNewQuestionObject,
  validatePollObject
} from '@/models.js'
export default {
  data() {
    return {
      poll: {},
      questions: [],
      choices: []
    }
  },
  mounted: function() {
    Promise.all([
      getPollById(this.$route.params.pollId),
      getQuestionsByPollId(this.$route.params.pollId),
      getChoicesByPollId(this.$route.params.pollId),

    ]).then(([poll, questions, choices]) => {
      this.poll = poll;
      this.questions = questions;
      this.choices = choices;
    })
  },

  methods: {
    getChoicesForQuestion: function(questionId) {
      return this.choices.filter((choice) => {
        return choice.questionId === questionId;
      })
    },
    savePoll: function(poll) {
      savePoll(poll).then((pollData) => {
        poll.id = pollData.id;
        this.$route.params.pollId = pollData.id;
        this.$Notify.success({
          title: 'Success',
          message: 'Success Saving Poll'
        })
      }).catch(() => {
        this.$Notify.error({
          title: 'Error',
          message: 'Error Saving Poll'
        })
      })
    },
    saveQuestion: function(question) {
      saveQuestion(question).then((questionData) => {
        question.id = questionData.id;
        this.$Notify.success({
          title: 'Success',
          message: 'Success Saving Question'
        })
      }).catch(() => {
        this.$Notify.error({
          title: 'Error',
          message: 'Error Saving Question'
        })
      })
    },
    saveChoice: function(choice) {
      saveChoice(choice).then((choiceData) => {
        choice.id = choiceData.id;
        this.$Notify.success({
          title: 'Success',
          message: 'Success Saving Choice'
        })
      }).catch(() => {
        this.$Notify.error({
          title: 'Error',
          message: 'Error Saving Choice'
        })
      })
    },
    addQuestion: function(poll) {
      this.questions.push(Object.assign(getNewQuestionObject(), {pollId: poll.id}));
    },
    addQuestionSource: function(question){
      question.sources.push({
        url: ''
      })
    },
    addChoiceSource: function(choice) {
      choice.sources.push({
        url: ''
      })
    },
    addQuestionChoice: function(poll, question) {
      this.choices.push(Object.assign(getNewChoiceObject(), {questionId: question.id, pollId: poll.id}))
    },
    isRequired: function(text) {
      return text && text.length ? 'success' : 'error';
    },
    deletePoll: function(poll) {
      this.$Modal.confirm({
        title: 'Delete Poll',
        content: 'Are you sure you want to do this?'
      }).then(() => {

        let deletePromises = [deletePoll(this.poll.id)];
        for(let i=0;i<this.questions.length;i++){
          if(this.questions[i].id){
            deletePromises.push(deleteQuestion(this.questions[i].id))
          }
        }

        for(let i=0;i<this.choices.length;i++){
          if(this.choices[i].id){
            deletePromises.push(deleteChoice(this.choices[i].id))
          }
        }

        Promise.all(deletePromises).then(() => {
          this.poll = {};
          this.questions = [];
          this.choices = [];
          this.$Message('Poll deleted.')
        })

      }).catch(() => {
        this.$Message('Click \'Cancel\' Button')
      })
    },
    deleteQuestion: function(questionIdx){
      let question = this.questions[questionIdx];
      this.$Modal.confirm({
        title: 'Delete Question',
        content: 'Are you sure you want to do this?'
      }).then(() => {
        if(question.id) {
          let choicesToDelete = this.choices.filter((choice) => {
            return choice.questionId === question.id;
          })
          let deletePromises = [deleteQuestion(question.id)];
          for(let i=0;i<choicesToDelete.length;i++){
            deletePromises.push(deleteChoice(choicesToDelete[i].id))
          }
          Promise.all(deletePromises).then(() => {
            this.$Message('Question deleted.')
          })
        }
        this.questions.splice(questionIdx, 1);
      })
    },
    deleteChoice: function(choiceIdx){
      let choice = this.choices[choiceIdx];

      this.$Modal.confirm({
        title: 'Delete Choice',
        content: 'Are you sure you want to do this?'
      }).then(() => {
        if(choice.id) {
          deleteChoice(choice.id).then(() => {
            this.$Message('Choice deleted.')
          })
        }
        this.choices.splice(choiceIdx, 1);
      })
    }
  }
}
</script>

<style lang="css">
.bottom-border {
  border-bottom-color: #eee;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-bottom: 10px
}
.row {
  margin-top: 24px;
}
.pull-right {
  float:right;
}
.margin-right {
  margin-right: 5px;
}
</style>
