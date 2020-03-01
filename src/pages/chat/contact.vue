<template>
  <f7-page name="contact">
    <f7-navbar title="All Contacts" back-link="Back" style="color: teal;"></f7-navbar>
    <f7-block class="friends no-border">
      <f7-list style="margin: 0px;">
        <f7-list-item swipeout v-for="(contact, index) in contacts" :key="index" :title="contact.name">
          <img slot="media" :src="contact.photo_url" />
          <f7-swipeout-actions right>
            <f7-swipeout-button color="teal" @click="addFriend(contact)">Add</f7-swipeout-button>
          </f7-swipeout-actions>
        </f7-list-item>
      </f7-list>
    </f7-block>
  </f7-page>
</template>


<script>
import { fb, db } from '../../js/firebase'
import firebase from 'firebase'
export default {
  data  () {
    return {
      contacts: [],
    }
  },
  firestore() {
    return {
      contacts: db.collection('users'),
    }
  },
  methods: {
    addFriend(frnd) {
      db.collection('requests').doc(frnd.uid).get().then( (doc) => {
        if (doc.exists) {
          db.collection('requests').doc(frnd.uid).update({ sender : firebase.firestore.FieldValue.arrayUnion(fb.auth().currentUser.uid) }).then( () => { 
            this.$store.commit('setAlertMessage', `Friend request sent to ${frnd.name}`)
          })
        } else {
          db.collection('requests').doc(frnd.uid).set({ sender : firebase.firestore.FieldValue.arrayUnion(fb.auth().currentUser.uid) }).then( () => { 
            this.$store.commit('setAlertMessage', `Friend request sent to ${frnd.name}`)
          })
        }
      })
    }
  },

}
</script>

<style scoped>
.friends {
margin: 0px; 
padding: 0px;
}
.friends img {
height: 40px;
width: 40px;
border-radius: 50%;
}
</style>