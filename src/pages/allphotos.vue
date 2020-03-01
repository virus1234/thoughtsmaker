<template>
  <f7-page name="allphotos">
    <f7-navbar title="All Photos" style="color: teal;"></f7-navbar>
    <f7-block-title style="margin-top: 15px; color: teal;">About Posts Photos</f7-block-title>
    <f7-block>
      <f7-row>
        <f7-col class="imageClass" v-for="(photo, index) in photos" :key="index">
          <f7-link style="height: 100%; width: 100%;">
            <img :src="photo.post_image" style="height: 100%; width: 100%;">
          </f7-link>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>


<script>
import { fb, db } from '../js/firebase'
export default {
  data  () {
    return {
      photos: []
    }
  },
  firestore () {
    return {
      photos: db.collection('posts')
    }
  },
}
</script>

<style scoped>
.imageClass {
width: 33%;
height: 100px;
margin-bottom: 2px;
overflow: hidden;
}
</style>