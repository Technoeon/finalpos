import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
const rootURL = 'http://localhost/pos/api/'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    userData: null,
    products: [],
    shoppingCart: []
  },
  mutations: {
    SET_USER (state, payload) {
      state.userData = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_TO_CART (state, payload) {
      state.shoppingCart.push(payload)
    },
    SET_TO_EXIST_CART (state, payload) {
      const isExistinCart = state.shoppingCart.find(prod => prod.id === payload.id)
      isExistinCart.qty++
      isExistinCart.subprice = isExistinCart.qty * isExistinCart.price
      isExistinCart.subvat = isExistinCart.qty * isExistinCart.vat
      isExistinCart.selected = true
    },
    SET_UNSELECT (state) {
      state.shoppingCart.map(cart => {
        cart.selected = false
        return cart
      })
    },
    SET_SELECT (state, payload) {
      state.shoppingCart.find(cart => cart.id === payload).selected = true
    },
    UPDATE_CART (state, payload) {
      const prodExist = state.shoppingCart.find(cart => cart.selected === true)
      prodExist.qty = payload
      prodExist.subprice = prodExist.price * payload
      prodExist.subvat = prodExist.vat * payload
    }
  },
  actions: {
    async signUserIn ({ commit }, payload) {
      let loginUrl = rootURL + 'user/login'
      let headerConfig = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '123456'
        }
      }
      await axios.post(loginUrl, payload, headerConfig)
        .then(res => {
          let userData = res.data.data
          commit('SET_USER', userData)
          let proUrl = rootURL + 'product'
          let headerConfigProduct = {
            headers: {
              'x-api-key': '123456',
              Authorization: userData.token
            }
          }
          axios.get(proUrl, headerConfigProduct)
            .then(res => {
              commit('SET_PRODUCTS', res.data.data)
            })
            .catch(err => {
              alert(err)
            })
        })
        .catch(err => {
          alert(err)
        })
    },
    async addToCart ({ commit, state }, payload) {
      if (state.shoppingCart.length > 0) {
        await commit('SET_UNSELECT')
        const isExist = await state.shoppingCart.find(sp => sp.id === payload.id)
        if (!isExist) {
          await commit('SET_TO_CART', payload)
        } else {
          await commit('SET_TO_EXIST_CART', payload)
        }
      } else {
        commit('SET_TO_CART', payload)
      }
    },
    clearCart ({ state }) {
      state.shoppingCart = []
    },
    async selectCart ({ commit }, payload) {
      await commit('SET_UNSELECT')
      commit('SET_SELECT', payload)
    },
    updateCartQuantity ({ commit }, payload) {
      commit('UPDATE_CART', payload)
    },
    setItemZero ({ state }) {
      const itemzero = state.shoppingCart.find(sp => sp.selected === true)
      state.shoppingCart.splice(state.shoppingCart.indexOf(itemzero), 1)
    },
    logout ({ state }) {
      state.userData = []
      window.localStorage.clear()
    }
  },
  getters: {
    user (state) {
      return state.userData
    },
    products (state) {
      return state.products
    },
    shoppingCart (state) {
      return state.shoppingCart
    },
    subTotal (state) {
      return state.shoppingCart.reduce((a, b) => a + ((b['subprice']) || 0), 0)
    },
    vat (state) {
      return state.shoppingCart.reduce((a, b) => a + ((b['subvat']) || 0), 0)
    },
    total (state) {
      let subtotal = state.shoppingCart.reduce((a, b) => a + ((b['subprice']) || 0), 0)
      let vat = state.shoppingCart.reduce((a, b) => a + ((b['subvat']) || 0), 0)
      let total = subtotal + vat
      return total
    },
    getSelectedID (state) {
      let idExist = state.shoppingCart.find(i => i.selected === true)
      if (idExist) {
        return idExist.id
      }
    }
  },
  plugins: [createPersistedState({storage: window.localStorage})]
})
