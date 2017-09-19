<template lang="html">
  <div class="">
    <at-modal v-model="shouldShow" :closeOnPressEsc="shouldBeClosable" :showClose="shouldBeClosable" :maskClosable="shouldBeClosable">
      <div slot="header" style="text-align:center;">
        <span>User Profile</span>
      </div>
      <div>

        <div class="row">
          <div class="col-md-24">
            <p>Identity</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-8">
            <at-input v-model="userModel.firstName" placeholder="First Name" :status="isRequired(userModel.firstName)" class="margin-bottom"></at-input>
          </div>
          <div class="col-md-8">
            <at-input v-model="userModel.fullMiddleName" placeholder="Middle Name" :status="isRequired(userModel.fullMiddleName)" class="margin-bottom"></at-input>
          </div>
          <div class="col-md-8">
            <at-input v-model="userModel.lastName" placeholder="Last Name" :status="isRequired(userModel.lastName)" class="margin-bottom"></at-input>
          </div>
        </div>

        <hr>

        <div class="row">
          <div class="col-md-24">
            <p>Birth and Residence</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-24">
            <at-input v-model="userModel.homeCounty" placeholder="Country of Residence" :status="isRequired(userModel.homeCounty)" class="margin-bottom"></at-input>
          </div>
          <div class="col-md-24">
            <at-input v-model="userModel.countryOfBirth" placeholder="Country of Birth" :status="isRequired(userModel.countryOfBirth)" class="margin-bottom"></at-input>
          </div>
        </div>

      </div>
      <div slot="footer">
        <at-button style="width:100%;" type="error" @click="updateUser()">Save</at-button>
      </div>
    </at-modal>
  </div>
</template>

<script>
import {
  getUserById,
  createUser,
  updateUser
} from '@/api.js'

export default {
  props: ['showModal', 'canClose', 'userId'],
  data: function() {
    return {
      newUser: false,
      userModel: {
        id: '',
        firstName: '',
        fullMiddleName: '',
        lastName: '',
        homeCounty: '',
        countryOfBirth: '',
      }
    }
  },
  computed: {
    shouldShow: function() {
      return this.showModal;
    },
    shouldBeClosable: function() {
      return this.canClose;
    },
  },
  watch: {
    showModal: function (showModalState) {
      if(showModalState === true) {
        getUserById(this.userId).then((userData) => {
          console.log(userData)
          this.userModel.id = this.userId;

          if(userData === null) {
            this.newUser = true;
          } else {
            this.newUser = false;
            this.userModel = Object.assign(this.userModel, userData);
            console.log('fill in userdata')
          }
        })
      }
    }
  },
  methods: {
    hideModal: function() {

    },
    isRequired: function(text) {
      return text && text.length ? 'success' : 'error';
    },
    updateUser: function() {

      if(this.newUser) {
        createUser(this.userModel).then((response) => {
          this.newUser = false;
          this.$emit('registrationComplete');
        }).catch(() => {
          this.$Notify.error({
            title: 'Error',
            message: 'Fill out all required fields'
          })
        })
      } else {
        updateUser(this.userModel).then((response) => {
          console.log(response)
          this.$emit('profileSaved');
        }).catch(() => {
          this.$Notify.error({
            title: 'Error',
            message: 'Fill out all required fields'
          })
        })
      }
    }
  }
}
</script>

<style lang="css">
  .margin-bottom {
    margin-bottom: 10px;
  }
</style>
