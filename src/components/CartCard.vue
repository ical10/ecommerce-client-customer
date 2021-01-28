<template>
  <div class='container'>
    <div class='card mb-3' style='max-width: 540px;'>
      <div class='row no-gutters'>
        <div class='col-md-4'>
          <img :src='`${cart.Product.image_url}`' class='card-img' alt='Image not found'>
        </div>
        <div class='col-md-8'>
          <div class="card-body">
            <div class='container'>
              <h5 class="card-title">{{ cart.Product.name }}</h5>
              <p class="card-text">Price: <b> {{ formatPrice(cart.Product.price) }} </b> </p>
            </div>
          </div>
          <div class='card-footer bg-transparent border-secondary'>
              <div class='box'>
                <ul>
                    <form>
                    <li><button @click.prevent="substractQty" class='mr-1'>-</button></li>
                    <li><input type="text" size="2" v-model='cart.quantity' class='mr-1'></li>
                    <li><button @click.prevent="addQty">+</button></li>
                    </form>
                </ul>
                <button class='btn btn-outline-danger btn-sm' @click='removeCart(cart.id)'>Remove from cart</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'CartCard',
  props: ['cart'],
  methods: {
    substractQty (qty) {
      if (this.cart.quantity <= 0) {
        this.cart.quantity = 0
      } else {
        this.cart.quantity -= 1
      }
      const payload = {
        CartId: this.cart.id,
        quantity: this.cart.quantity,
        ProductId: this.cart.ProductId
      }
      this.updateCart(payload)
    },
    addQty (qty) {
      if (this.cart.quantity < this.cart.Product.stock) {
        this.cart.quantity++
      } else {
        this.cart.quantity = this.cart.Product.stock
      }
      const payload = {
        CartId: this.cart.id,
        quantity: this.cart.quantity,
        ProductId: this.cart.ProductId
      }
      this.updateCart(payload)
    },
    removeCart (id) {
      this.$swal.fire({
        title: 'Remove from cart?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          return this.$store.dispatch('removeCart', id)
        } else if (result.isDenied) {
          this.$swal.fire({
            title: 'Cancelled!',
            toast: true,
            timer: 1500
          })
        }
      })
        .then(({ data }) => {
          this.$swal.fire(data.messages.toString(), '', 'success')
          this.$store.dispatch('fetchAllCarts')
        })
        .catch((err) => {
          this.$store.commit('catchError', err.response.data.errors)
        })
    },
    updateCart (payload) {
      this.$store.dispatch('updateCart', payload)
    }
  },
  created () {
    this.debouncedUpdateQty = _.debounce(this.updateCart, 500)
  }
}
</script>

<style scoped>
ul,li {
  list-style: none;
}

li {
  float: left;
}

input {
  text-align: center;
}

.card-img {
  width: 100%;
  height: 30vh;
  object-fit: cover;
}
</style>
