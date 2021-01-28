<template>
    <div class='col-3 pl-0 pr-0 ml-2 mr-2 mb-4'>
      <div class='card'>
        <img :src="`${product.image_url}`" class="card-img-top img-fluid" alt="image not found">
        <div class='card-header'>
          <p class='text-weight-bold'>{{ product.name }}</p>
        </div>
        <div class="card-body">
          <p class="card-text">Stock: {{ product.stock }}</p>
          <p class="card-text">Price: {{ formatPrice(product.price) }}</p>
        </div>
        <div class="card-footer">
          <button class="add-cart-large" @click='checkAuth(product.id)'>Add To Cart</button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ContentCard',
  props: ['product'],
  watch: {
    errors: function (val, oldVal) {
      if (val.length > 0) {
        this.$swal.fire({
          icon: 'error',
          title: 'Please try again',
          text: this.errors,
          footer: '<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400" target="_blank">400 Bad request</a>'
        })
      }
    }
  },
  methods: {
    checkAuth (id) {
      if (localStorage.getItem('access_token')) {
        this.addToCart(id)
      } else {
        this.$swal.fire({
          title: 'Login in first, please!',
          text: 'Redirecting you to login page',
          icon: 'info',
          timer: 2000
        })
        this.$router.push('/home/login')
      }
    },
    formatPrice (price) {
      return 'IDR ' + price.toLocaleString('id')
    },
    addToCart (id) {
      const payload = {
        quantity: 1,
        ProductId: id
      }

      this.$swal.fire({
        title: 'Add product to cart?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          return this.$store.dispatch('addToCart', payload)
        } else if (result.isDenied) {
          this.$swal.fire('Add to cart cancelled', '', 'info')
        }
      })
        .then(({ data }) => {
          this.$swal.fire({
            title: data.messages.toString(),
            toast: true,
            icon: 'success',
            timer: 1500
          })
        })
        .catch((err) => {
          this.$store.commit('catchError', err.response.data.errors)
        })
    }
  },
  computed: mapState(['errors'])
}
</script>

<style scoped>
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
.add-cart-large {
  border: 3px solid #000;
  font-size: 17px;
  background: #fff;
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px;
  margin-top: 38px;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -ms-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.add-cart-large:hover {
  color: #00ac96;
  border-color:#00ac96;
  -webkit-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
  -ms-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
  cursor:pointer;
}
</style>
