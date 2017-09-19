<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-24">
        <h1>Current Polls</h1>
      </div>
    </div>
    <div class="row">
      <div v-for="poll in polls" class="col-md-24 result">
        <div class="">
            <h2>
              <router-link :to="{ name: 'viewPoll', params: { pollId: poll.id }}">
                {{poll.title}}
              </router-link>
              <at-button v-on:click="$router.push({ name: 'editPoll', params: { pollId: poll.id }})" icon="icon-edit" size="small" class="pull-right margin-right" circle></at-button>
            </h2>
        </div>
        <div class="">
          {{fromNow(poll.created)}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  getPolls,
} from '@/api.js'
import moment from 'moment';

export default {
  props: ['auth'],
  data() {
    return {
      polls: []
    }
  },
  mounted: function() {
    this.auth.handleAuthentication()
    getPolls(0).then((polls) => {
      this.polls = polls;
    })
  },
  methods: {
    fromNow: function(date) {
      return moment(date).fromNow();
    }
  }
}
</script>

<style lang="css">
.result {
  padding: 20px;
  border-color: #eee;
  border-style: solid;
  border-width: 1px;
  padding-bottom: 10px
}
.pull-right {
  float:right;
}
</style>
