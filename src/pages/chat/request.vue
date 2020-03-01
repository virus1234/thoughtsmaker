<template>
  <f7-page name="requests">
    <f7-navbar title="All Requests" back-link="Back" style="color: teal;"></f7-navbar>
    <f7-block class="friends no-border">
      <f7-list style="margin: 0px;" media-list>
        <!--<f7-list-item v-for="(contact, index) in contacts" :key="index" :title="contact.name" after="status" subtitle="last_message">
          <img slot="media" :src="contact.photo_url" />
        </f7-list-item>-->
        <pre>{{requests}}</pre>
      </f7-list>
    </f7-block>
  </f7-page>
</template>


<script>
import { fb, db } from '../../js/firebase'
export default {
  data  () {
    return {
      requests: []
    }
  },
  firestore() {
    return {
      requests: db.collection('requests').where("sender", "==", fb.auth().currentUser.uid)
    }
  },
  created(){
    console.log(fb.auth().currentUser.uid)
  }
}
</script>

<style scoped>
.friends {
margin: 0px; 
padding: 0px;
}
.friends img {
height: 45px;
width: 45px;
border-radius: 50%;
}
</style>