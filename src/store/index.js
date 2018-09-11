import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    maskShow: false,
    maskData: {
      name: '',
      titDesc: ''
    }
  },
  mutations: {
    changeMaskState (state) {
      state.maskShow = !state.maskShow
    },
    changeMaskData (state, data) {
      state.maskData = data
    },
    mergeStep (state, data) {
      // console.log(data)
      state.maskData = data
      state.maskShow = !state.maskShow
    }
  }
})
