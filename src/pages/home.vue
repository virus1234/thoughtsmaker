<template>
  <f7-page name="home" style="background-color: rgb(220,220,220);">

    <f7-navbar no-shadow>
      <f7-nav-left>
        <f7-button round popup-open=".demo-popup-swipe">
          <f7-icon size="20" f7="plus"></f7-icon>
        </f7-button>
      </f7-nav-left>
      <f7-nav-title style="color: teal;">ThoughtsMaker</f7-nav-title>
      <f7-nav-right>
        <f7-link panel-open="right" class="navRight" >
          <img :src="photo_url"/>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-card class="demo-facebook-card" outline no-shadow v-for="(post, index) in posts" :key="index">
      <f7-card-header class="no-border" style="padding-bottom: 0px;">
        <div class="demo-facebook-avatar"><img :src="post.user_image" width="45" height="45" style="border-radius: 50%;"/></div>
        <div class="demo-facebook-name">{{ post.name }}</div>
        <div class="demo-facebook-date">Monday at 2:15 PM</div>
      </f7-card-header>
      <f7-card-content :padding="false" class="cardContent">
        <p v-show="post.description">{{ post.description }}</p><img v-show="post.post_image" :src="post.post_image" width="100%"/>
        <p class="likes">Likes: {{ post.liked }} &nbsp;&nbsp; Comments: 43</p>
      </f7-card-content>
      <f7-block class="cardFooter">
        <f7-row>
          <f7-col>
            <f7-button class="cardFooterBtn" round small @click="like_status = !like_status">
              <f7-icon size="18" :f7="like_status ? 'hand_thumbsup_fill' : 'hand_thumbsup'"></f7-icon>
              <span>like</span>
            </f7-button>
          </f7-col>
          <f7-col>
            <f7-button class="cardFooterBtn" round small @click="comment_status = !comment_status">
              <f7-icon size="18" :f7="comment_status ? 'bubble_right_fill' : 'bubble_right'"></f7-icon>
              <span>comment</span>
            </f7-button>
          </f7-col>
          <f7-col>
            <f7-button class="cardFooterBtn" round small @click="share_status = !share_status">
              <f7-icon size="18" :f7="share_status ? 'arrowshape_turn_up_right_fill' : 'arrowshape_turn_up_right'"></f7-icon>
              <span>share</span>
            </f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-card>

    <!--<f7-card class="demo-facebook-card" outline no-shadow v-for="a in 3" :key="a">
      <f7-card-header class="no-border" style="padding-bottom: 0px;">
        <div class="demo-facebook-avatar"><img src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg" width="45" height="45" style="border-radius: 50%;"/></div>
        <div class="demo-facebook-name">John Doe</div>
        <div class="demo-facebook-date">Monday at 2:15 PM</div>
      </f7-card-header>
      <f7-card-content :padding="false" class="cardContent">
        <p>What a nice photo i took yesterday!</p><img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%"/>
        <p class="likes">Likes: 112 &nbsp;&nbsp; Comments: 43</p>
      </f7-card-content>
      <f7-block class="cardFooter">
        <f7-row>
          <f7-col>
            <f7-button class="cardFooterBtn" round small @click="like_status = !like_status">
              <f7-icon size="18" :f7="like_status ? 'hand_thumbsup_fill' : 'hand_thumbsup'"></f7-icon>
              <span>like</span>
            </f7-button>
          </f7-col>
          <f7-col>
            <f7-button class="cardFooterBtn" round small @click="comment_status = !comment_status">
              <f7-icon size="18" :f7="comment_status ? 'bubble_right_fill' : 'bubble_right'"></f7-icon>
              <span>comment</span>
            </f7-button>
          </f7-col>
          <f7-col>
            <f7-button class="cardFooterBtn" round small @click="share_status = !share_status">
              <f7-icon size="18" :f7="share_status ? 'arrowshape_turn_up_right_fill' : 'arrowshape_turn_up_right'"></f7-icon>
              <span>share</span>
            </f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-card>-->
  </f7-page>
</template>

<script>
import { fb, db } from '../js/firebase'
export default {
  data () {
    return {
      like_status: false,
      comment_status: false,
      share_status: false,

      posts: []
    }
  },
  firestore () {
    return {
      posts: db.collection('posts')
    }
  },
  computed: {
    signed_in () {
      return this.$store.getters.signed_in
    },
    photo_url () {
      return this.$store.getters.photo_url
    },
    display_name () {
      return this.$store.getters.display_name
    },

  },
  
}
</script>

<style scoped>
.navRight img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.demo-facebook-card {
  margin: 0px;
  margin-bottom: 5px;
}
.demo-facebook-card:last-child {
  margin: 0%;
}
.cardFooter {
  margin: 0px auto 10px auto;
}
.cardFooterBtn {
border: .5px solid;
}
p, .likes {
  margin: 10px 15px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>