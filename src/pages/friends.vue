<template>
  <f7-page name="friends">
    <f7-navbar title="All Friends" style="color: teal;"></f7-navbar>
    <f7-block class="friends no-border">
      <f7-list style="margin: 0px;" media-list>
        <f7-list-item v-for="(friend, index) in friends" :key="index" :title="friend.name" :after="friend.status" :subtitle="friend.last_message">
          <img slot="media" :src="friend.image" />
        </f7-list-item>
      </f7-list>
    </f7-block>
  </f7-page>
</template>


<script>
export default {
  data  () {
    return {
      friends: [
        { id: 3545351, name: "Mike Perry", status: 'on', image: 'https://partyflock.nl/images/artist/100846_1058x1058_453723/Mike-Perry.jpg', last_message: 'Hey Dj...' },
        { id: 3545466, name: "Adam Levine", status: 'off', image: 'https://cdn1.thr.com/sites/default/files/2018/09/gettyimages-950525440-h_2018.jpg', last_message: 'What are you doing?' },
        { id: 5745457, name: "Taylor Swift", status: 'off', image: 'https://www.channelnewsasia.com/image/12105930/1x1/600/600/f4843b5cde24e34e230e4baf5bce70b7/Br/taylor-swift.jpg', last_message: 'Hii...' },
        /*{ id: 3545351, name: "Mike Perry", status: 'on', image: 'https://partyflock.nl/images/artist/100846_1058x1058_453723/Mike-Perry.jpg', last_message: 'Hey Dj...' },
        { id: 3545351, name: "Mike Perry", status: 'on', image: 'https://partyflock.nl/images/artist/100846_1058x1058_453723/Mike-Perry.jpg', last_message: 'Hey Dj...' },
        { id: 3545351, name: "Mike Perry", status: 'on', image: 'https://partyflock.nl/images/artist/100846_1058x1058_453723/Mike-Perry.jpg', last_message: 'Hey Dj...' },
        { id: 3545351, name: "Mike Perry", status: 'on', image: 'https://partyflock.nl/images/artist/100846_1058x1058_453723/Mike-Perry.jpg', last_message: 'Hey Dj...' },
        { id: 3545351, name: "Mike Perry", status: 'on', image: 'https://partyflock.nl/images/artist/100846_1058x1058_453723/Mike-Perry.jpg', last_message: 'Hey Dj...' },
        { id: 3545351, name: "Mike Perry", status: 'on', image: 'https://partyflock.nl/images/artist/100846_1058x1058_453723/Mike-Perry.jpg', last_message: 'Hey Dj...' },*/
      ]
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
height: 45px;
width: 45px;
border-radius: 50%;
}
</style>