<template>
  <f7-page name="allphotos">
    <f7-navbar title="All Photos" style="color: teal;"></f7-navbar>
    <f7-block-title style="margin-top: 15px; color: teal;">About Posts Photos</f7-block-title>
    <f7-block>
      <f7-row>
        <f7-col class="imageClass" v-for="(photo, index) in photos" :key="index">
          <f7-link style="height: 100%; width: 100%;">
            <img :src="photo" style="height: 100%; width: 100%;">
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
      photos : [
        'https://www.eefexplores.com/wp-content/uploads/2019/09/Eef_Operahouse_honderd-1080x692.jpg',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hbz-best-insta-workout-hannah-1548771434.jpg', 
        'https://www.dailydot.com/wp-content/uploads/2019/08/instagram-ar-filters.jpg',
        'https://www.travelanddestinations.com/wp-content/uploads/2017/10/Dancing-House-Prague.jpg',
        'https://i.pinimg.com/736x/9e/80/7b/9e807b40b63db14c25dc49bf2a7c261f.jpg',
        'https://d3ppia5ny11y1h.cloudfront.net/wp-content/uploads/2018/07/Top-10-best-Instagram-spots-in-Thailand.jpg',
        'https://cdn2.hubspot.net/hubfs/2198762/Guys%20Instagram%20Bios.jpg',
        'https://cdn-ep19.pressidium.com/wp-content/uploads/2019/08/Best_Free_Lightroom_Presets_Blogger.jpg'   
      ],
      //photos: []
    }
  },
  firestore () {
    return {
      //photos: db.collection('posts')
    }
  },
}
</script>

<style scoped>
.imageClass {
width: 33%;
height: 100px;
margin-bottom: 2px;
}
</style>