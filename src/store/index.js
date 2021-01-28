import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    username: '',
    categories: [],
    category: '',
    errors: [],
    carts: []
  },
  mutations: {
    insertProducts (state, payload) {
      state.products = payload
    },
    insertCarts (state, payload) {
      state.carts = payload
    },
    getUserName (state, payload) {
      state.username = payload.email.split('@')[0]
    },
    insertCategories (state, payload) {
      const result = []
      payload.forEach(product => {
        result.push(product.category)
      })
      state.categories = [...new Set(result)]
    },
    catchError (state, payload) {
      state.errors = []
      state.errors.push(payload)
    },
    changeCategory (state, payload) {
      state.category = payload
    }
  },
  actions: {
    addToCart (context, payload) {
      return axios
        .post('/carts', payload, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
    },
    fetchAllCarts (context, payload) {
      axios
        .get('/carts', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          context.commit('insertCarts', data)
        })
        .catch(console.log)
    },
    removeCart (context, payload) {
      return axios
        .delete('/carts/' + payload, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
    },
    updateCart (context, payload) {
      const { CartId, ProductId, quantity } = payload
      axios
        .patch('/carts/' + CartId, { ProductId, quantity }, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          console.log(data.messages)
        })
        .catch((err) => {
          console.log(err.response.data.errors)
        })
    },
    fetchProducts (context) {
      axios
        .get('/products')
        .then(({ data }) => {
          context.commit('insertProducts', data)
          context.commit('insertCategories', data)
        })
        .catch(console.log)
    },
    login (context, payload) {
      axios
        .post('/login', payload)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('getUserName', payload)
          router.push('/')
        })
        .catch((err) => {
          context.commit('catchError', err.response.data.errors)
        })
    },
    register (context, payload) {
      return axios
        .post('/register', payload)
    },
    sendConfirmationEmail (context, payload) {
      return axios
        .post('send', payload)
    }
  },
  getters: {
    filterByCategory: state => {
      if (state.category === '' || state.category === 'all') {
        return state.products
      } else {
        return state.products.filter((value) => {
          return value.category === state.category
        })
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
