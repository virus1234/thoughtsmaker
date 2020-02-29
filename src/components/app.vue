<template>
<f7-app :params="f7params" class="color-theme-teal text-color-teal">
  <!-- Right panel with reveal effect-->
  <f7-panel right reveal>
    <f7-view>
      <f7-page>
        <f7-navbar no-shadow style="color: teal;" title="DJ Snake"></f7-navbar>
        <f7-block>
          kux aayega isme vi...
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>

  <f7-views tabs class="safe-areas" v-if="signed_in">
    <f7-toolbar tabbar labels bottom no-shadow>
      <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home" text="Home"></f7-link>
      <f7-link tab-link="#view-allphotos" icon-ios="f7:list_dash" icon-aurora="f7:list_dash" icon-md="material:dashboard" text="All Photos"></f7-link>
      <f7-link tab-link="#view-friends" icon-ios="f7:person_3_fill" icon-aurora="f7:person_3_fill" icon-md="material:people" text="Friends"></f7-link>
      <f7-link tab-link="#view-posts" icon-ios="f7:square_list_fill" icon-aurora="f7:square_list_fill" icon-md="material:list" text="Posts"></f7-link>
      <f7-link tab-link="#view-profile" icon-ios="f7:person_alt" icon-aurora="f7:person_alt" icon-md="material:person" text="Profile"></f7-link>
    </f7-toolbar>

    <f7-view id="view-home" main tab tab-active url="/"></f7-view>
    <f7-view id="view-allphotos" name="allphotos" tab url="/allphotos/"></f7-view>
    <f7-view id="view-friends" name="friends" tab url="/friends/"></f7-view>
    <f7-view id="view-profile" name="profile" tab url="/editprofile/"></f7-view>
  </f7-views>

  <f7-view v-if="!signed_in" url="/signin/" :main="true"></f7-view>

</f7-app>
</template>
<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.framework7.thoughtsmaker', // App bundle ID
          name: 'ThoughtsMaker', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            return {

              // Demo products for Catalog section
              products: [
                {
                  id: '1',
                  title: 'Apple iPhone 8',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
                },
                {
                  id: '2',
                  title: 'Apple iPhone 8 Plus',
                  description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
                },
                {
                  id: '3',
                  title: 'Apple iPhone X',
                  description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
                },
              ]
            };
          },

          // App routes
          routes: routes,

          // Register service worker
          serviceWorker: Device.cordova ? {} : {
            path: '/service-worker.js',
          },
          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },
      }
    },
    methods: {
      signOut () {
        const app = this.$f7
        this.$store.dispatch('signOut')
        app.panel.close()
      }
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    },
    computed: {
      signed_in () {
        return this.$store.getters.signed_in
      },
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    }
  }
</script>

<style>
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