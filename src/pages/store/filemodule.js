import { fb } from '../../js/firebase'
const FileModule = {
  state: {
    image_url: 'https://i.ya-webdesign.com/images/avatar-arrow-png-8.png',
    files: null
  },
  getters: {
    image_url: state => state.image_url,
    files: state => state.files
  },
  mutations: {
    setImageURL(state, payload) {
      state.image_url = payload
    },
    setFiles(state, payload) {
      state.files = payload
    },
  },
  actions: {
    readFile({commit}) {
      const files = event.target.files;
      commit('setFiles', files)
      const fileReader = new FileReader();
      let file = files[0]
      if(file['size'] < 200000) {
        fileReader.readAsDataURL(file)
        fileReader.addEventListener('load', () => {
          var imageUrl = fileReader.result;
          commit('setImageURL', imageUrl)
        })
      } else {
        commit('setAlertMessage', 'The image size is greater than 2MB')
        return
      }
    },
    uploadFile({commit, state}) {
      return new Promise( (resolve, reject) => {
        var file = state.files[0]
        var storageRef = fb.storage().ref('profile/'+file.name)
        var task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, (err) => {
            console.log(err.message)
        }, () => {
          task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            resolve(downloadURL)
          });
        });
      })
    }
  }
}
export default FileModule