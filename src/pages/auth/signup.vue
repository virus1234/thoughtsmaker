<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <!--<f7-login-screen-title>Register</f7-login-screen-title>-->
    <div class="wrapper">
      <img class="image-cover" :src="image_url" @click="launchFilePicker">
    </div>
    <f7-list form>
      <f7-list-input label="Name" type="text" placeholder="Your name" :value="name" @input="name = $event.target.value"></f7-list-input>
      <f7-list-input label="Email" type="email" placeholder="Your email" :value="email" @input="email = $event.target.value"></f7-list-input>
      <f7-list-input label="Password" type="password" placeholder="Your password" :value="password" @input="password = $event.target.value"></f7-list-input>
      <input type="file" ref="file" style="display:none;" @change="onFilePicked">
    </f7-list>
    <f7-list>
      <f7-button style="width: 80%; margin: auto;" fill round @click="signUp">Sign Up</f7-button>
      <f7-block-footer>Already have account? <f7-link href="/signin/">Signin</f7-link></f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
  import { mixin } from '../../js/mixin'
  export default {
    mixins: [ mixin ],
    data() {
      return {
        name: null,
        email: null,
        password: null,
      };
    },
    computed: {
      image_url() {
        return this.$store.getters.image_url
      },
      files () {
        return this.$store.getters.files
      },
      signed_up () {
        return this.$store.getters.signed_up
      }
    },
    watch: {
      signed_up(value) {
        if(value == true) {
          this.$f7router.navigate('/signin/')
        }
      }
    },
    methods: {
      launchFilePicker () {
        this.$refs.file.click();
      },
      onFilePicked () {
        this.$store.dispatch('readFile')
      },
      signUp() {
        const self = this
        var payload = {}
        payload.name = this.name
        payload.email = this.email
        payload.password = this.password
        payload.photoURL = this.image_url
        if(self.files) {
          this.$store.dispatch('uploadFile').then( (url) => {
            payload.photoURL = url
            self.$store.dispatch('signUp', payload)
          })
        } else {
          this.$store.dispatch('signUp', payload)
        }
      },
    },
    created() {
      this.$store.commit('setSignedUp', false)
    },
  };
</script>

<style scoped>
.wrapper {
  text-align: center;
}
.image-cover {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px;
  object-fit: cover;
  object-position: center;
}
</style>