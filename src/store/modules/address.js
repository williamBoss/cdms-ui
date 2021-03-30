import { getAddress } from '@/api/patients'
import { getToken, setToken, setExpiresIn, removeToken } from '@/utils/auth'

const user = {
  state: {
    addressList: []
  },

  mutations: {
    GET_ADDRESS: (state, data) => {
      state.addressList = data
    }
  },

  actions: {
    // 登录
    getAddress({ commit }) {
      return new Promise((resolve, reject) => {
        getAddress().then(res => {
          let data = res.data
          commit('GET_ADDRESS', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default address
