// Import Vue
import Vue from 'vue';
import VueFirestore from 'vue-firestore'

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
Vue.use(VueFirestore)

import store from '../pages/store/store'
import { fb } from './firebase'
let newapp = null
fb.auth().onAuthStateChanged( (user) => {
  if(user && user.emailVerified) {
    store.commit('setSignedIn', true)
    store.commit('setPhotoURL', user.photoURL)
    store.commit('setDisplayName', user.displayName)
  }else {
    store.commit('setSignedIn', false)
  }

  if(!newapp) {
    newapp = 
    // Init App
    new Vue({
      el: '#app',
      render: (h) => h(App),
      store,
      // Register App Component
      components: {
        app: App
      },
    });
  }
})

