import {fb, db} from '../../js/firebase'
const AuthModule = {
  state: {
    signed_up : false,
    signed_in : false,
    show_resend_email: false,
    photo_url: null,
    display_name: null,
  },
  getters: {
    signed_up: state => state.signed_up,
    signed_in: state => state.signed_in,
    show_resend_email: state => state.show_resend_email,
    photo_url: state => state.photo_url,
    display_name: state => state.display_name,
  },
  mutations: {
    setSignedUp(state, payload) {
      state.signed_up = payload
    },
    setSignedIn(state, payload) {
      state.signed_in = payload
    },
    setShowResendEmail(state, payload) {
      state.show_resend_email = payload
    },
    setPhotoURL(state, payload) {
      state.photo_url = payload
    },
    setDisplayName(state, payload) {
      state.display_name = payload
    }
  },
  actions: {
    uploadPost({commit, dispatch}, payload) {
      db.collection('posts').doc().set({
        uid: payload.uid,
        name: payload.name,
        user_image: payload.user_image,
        email: payload.email,
        post_image: payload.photoURL,
        description: payload.desc,
        liked_by: {},
        liked: 0,
        upload_date: new Date()
      }).then( () => {
        commit('setAlertMessage', 'Post Uploaded succesfully')
      }).catch( (err) => {
        console.log(err.message)
        commit('setAlertMessage', err.message)
      })
    },
    signIn({commit}, payload) {
      fb.auth().signInWithEmailAndPassword(payload.email, payload.password).then( (user) => {
        fb.auth().onAuthStateChanged( (user) => {
          if(user.emailVerified) {
            commit('setSignedIn', true)
            commit('setAlertMessage', `Welcome ${user.displayName}`)
            commit('setShowResendEmail', true)
          }else {
            commit('setSignedIn', false)
            commit('setAlertMessage', 'Please varify your email...')
            commit('setShowResendEmail', true)
          }
        })
        commit('setSignedIn', true)
      }).catch( (err) => {
        console.log(err.message)
        commit('setAlertMessage', err.message)
      })
    },
    signUp({commit, dispatch}, payload) {
      fb.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then( (data) => {
        db.collection('users').doc(data.user.uid).set({
          uid: data.user.uid,
          name: payload.name,
          email: payload.email,
          emailVerified: false,
          photo_url: payload.photoURL
        })
        let newuser = data.user;
        newuser.updateProfile({
          displayName: payload.name,
          photoURL: payload.photoURL
        }).then( () => {
          dispatch('sendVerification')
          commit('setSignedUp', true)
          console.log('Profile updated')
        }).catch( (err) => {
          console.log(err.message)
          commit('setAlertMessage', err.message)
        })
      }).catch( (err) => {
        console.log(err.message)
        commit('setAlertMessage', err.message)
      })
    },
    signOut({commit}) {
      fb.auth().signOut().then( () => {
        commit('setSignedIn', false)
      })
    },
    sendVerification({commit}) {
      var user = fb.auth().currentUser;
      user.sendEmailVerification().then( () => {
        commit('setAlertMessage', `A verification email has been sent to ${user.email}`)
      }).catch( (err) => {
        console.log(err.message)
      })
    }
  }
}
export default AuthModule