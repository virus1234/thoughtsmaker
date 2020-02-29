<template>
  <f7-page no-toolbar>
    <f7-navbar no-shadow>
      <f7-nav-title style="color: teal;">Profile Setting</f7-nav-title>
      <f7-nav-right>
        <f7-button round small @click="signOut">
          <f7-icon f7="square_arrow_right_fill"></f7-icon>
        </f7-button>
      </f7-nav-right>
    </f7-navbar>
    <div class="wrapper">
      <img class="image-cover" :src="image_url" @click="launchFilePicker">
    </div>
    <f7-list form>
      <f7-list-input label="Name" type="text" :value="display_name" @input="display_name = $event.target.value"></f7-list-input>      
      <input type="file" ref="file" style="display:none;" @change="onFilePicked">
    </f7-list>
    <f7-list>
      <f7-button style="width: 80%; margin: auto;" fill round @click="updateProfile" >Update Profile</f7-button>
    </f7-list>
  </f7-page>
</template>

<script>
  import { mixin } from '../../js/mixin'
  import { fb, db }from '../../js/firebase'
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
      display_name: {
        get:function() {
          return this.$store.getters.display_name
        },
        set:function(newValue) {
          this.$store.commit('setDisplayName', newValue)
        }
      },
      image_url() {
        return this.$store.getters.image_url
      },
      files () {
        return this.$store.getters.files
      },
      photo_url () {
        return this.$store.getters.photo_url
      },
    },
    methods: {
      launchFilePicker () {
        this.$refs.file.click();
      },
      onFilePicked () {
        this.$store.dispatch('readFile')
      },
      updateProfile() {
        const self = this
        var user = fb.auth().currentUser
        if(self.files) {
          if(this.photo_url != null) {
            var storage = fb.storage();
            var httpReference = storage.refFromURL(this.photo_url);
            httpReference.delete().then( () => {

            }).then( (err) => {
              console.log(err.message)
            })
          }
          this.$store.dispatch('uploadFile').then( (url) => {
            user.updateProfile({
              displayName: self.display_name,
              photoURL: url
            }).then( () => {
              self.$store.commit('setPhotoURL', user.photoURL);
              self.$store.commit('setDisplayName', user.displayName);
              db.collection('users').doc(user.uid).update({
                photo_url: user.photoURL,
                name: user.displayName
              })
            }).catch( (err) => {
              console.log(err.message)
            })
          })
        } else {
          user.updateProfile({
            displayName: self.display_name
          }).then( () => {
            self.$store.commit('setDisplayName', self.display_name)
          })
        }
      },

      signOut () {
        const app = this.$f7
        this.$store.dispatch('signOut')
        app.panel.close()
      }
    },
    created() {
      if(this.photo_url != null) {
        this.$store.commit('setImageURL', this.photo_url)
      }
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