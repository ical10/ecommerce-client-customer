<template>
  <div class='container-fluid'>
      <Navbar />
      <h1> <b>My cart</b> </h1>
    <div class='row'>
      <div class='col-md-8 mt-2'>
        <CartCard v-for='cart in carts' :key='cart.id' :cart='cart'/>
      </div>
      <div class='col-md-4 mt-2'>
        <div class='card'>
          <div class='card-body'>
            <h3 class='card-title'> Total </h3>
            <p class='card-text'> {{ formatPrice(totalPrice) }} </p>
          </div>
          <div class='card-footer'>
            <button class='btn btn-lg btn-success' @click='checkOut'>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard.vue'
import Navbar from '../components/Navbar.vue'
export default {
  name: 'CartPage',
  components: {
    Navbar, CartCard
  },
  methods: {
    checkOut () {
      this.$swal.fire({
        title: 'Checkout the cart?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('checkout done')
        } else if (result.isDenied) {
          this.$swal.fire('Checkout cancelled', '', 'info')
        }
      })
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      return this.carts.reduce((total, cart) => {
        return total + (cart.quantity * cart.Product.price)
      }, 0)
    }
  },
  created () {
    this.$store.dispatch('fetchAllCarts')
  }
}
</script>
