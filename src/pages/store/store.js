import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './authmodule'
import FileModule from './filemodule'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    file: FileModule,
  },
  state: {
    alert_message: null,
  },
  getters: {
    alert_message: state => state.alert_message
  },
  mutations: {
    setAlertMessage(state, payload) {
      state.alert_message = payload
    }
  }
})