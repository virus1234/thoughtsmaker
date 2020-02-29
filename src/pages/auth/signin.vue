<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>Login</f7-login-screen-title>
    <f7-list form>
      <f7-list-input label="Email" type="email" placeholder="Your email" :value="email" @input="email = $event.target.value"></f7-list-input>
      <f7-list-input label="Password" type="password" placeholder="Your password" :value="password" @input="password = $event.target.value"></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-button style="width: 80%; margin: auto;" fill round @click="signIn">Sign In</f7-button>
      <f7-block-footer>
        Don't have account? <f7-link href="/signup/">Signup</f7-link><br>
        <f7-link @click="forgetPassword">Forget Password</f7-link><br>
        <f7-link v-if="show_resend_email" :color="color(time_left)" @click="resendEmail">Resend email varification</f7-link><span v-if="time_left > 0">{{ time_left }}</span>
      </f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
  import { mixin } from '../../js/mixin'
  import { fb } from '../../js/firebase'
  export default {
    mixins: [ mixin ],
    data() {
      return {
        email: null,
        password: null,
        time_left: -1,
      };
    },
    computed: {
      show_resend_email() {
        return this.$store.getters.show_resend_email
      }
    },
    methods: {
      forgetPassword() {
        const self = this
        if(this.email != null) {
          fb.auth().sendPasswordResetEmail(this.email).then( () => {
            self.$store.commit('setAlertMessage', 'Password reset link has been sent to your email')
          }).catch( (err) => {
            self.$store.commit('setAlertMessage', err.message)
          })
        } else {
          self.$store.commit('setAlertMessage', 'Please enter your email')
        }
      },
      color(time_left) {
        if(time_left <= 0) {
          return 'teal'
        } else {
          return 'grey'
        }
      }, 
      resendEmail() {
        const self  =this
        if(this.time_left <= 0) {
          self.$store.dispatch('sendVerification')
          self.countDown()
        }
      },
      countDown() {
        const self = this
        self.time_left = 20
        var timer = setInterval(() => {
          self.time_left -= 1
          console.log('time left ',self.time_left)
          if(self.time_left <= 0 ){
            clearInterval(timer)
          }
        }, 1000);
      },
      signIn() {
        var payload= {}
        payload.email = this.email
        payload.password = this.password
        this.$store.dispatch('signIn', payload)
      },
    },
  };
</script>