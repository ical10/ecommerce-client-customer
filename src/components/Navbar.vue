<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class='container'>
      <router-link class="navbar-brand" to='/'><b>Lajada</b></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" @click='goToCartPage' v-show="currentRouteName !== 'CartPage' && isLogoutActive">
            <a class="nav-link" href="#"><i class="fas fa-shopping-cart fa-lg"></i></a>
          </li>
          <li class="nav-item logout-btn ml-4" @click='logout' v-show='isLogoutActive'>
            <a class="nav-link" href="#" style='color:red;'><i class="fas fa-sign-out-alt" style="color:red;"></i> <b>Logout</b> </a>
          </li>
          <li class="nav-item login-btn ml-4" @click='goToLoginPage' v-show='!isLogoutActive'>
            <a class="nav-link" href="#" style='color:#00ac96;'><i class="fas fa-sign-in-alt"></i> <b>Login</b> </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isLogoutActive: false
    }
  },
  methods: {
    goToLoginPage () {
      this.$router.push('/home/login')
    },
    checkAuth () {
      if (localStorage.getItem('access_token')) {
        this.isLogoutActive = true
      } else {
        this.isLogoutActive = false
      }
    },
    logout () {
      localStorage.clear()
      this.$swal.fire({
        toast: true,
        title: 'Redirecting you back to login page',
        icon: 'success',
        timer: 2000
      })
      this.$router.push('/home/login')
    },
    goToCartPage () {
      this.$router.push('/carts')
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  created () {
    this.checkAuth()
  }
}
</script>

<style scoped>
.logout-btn  {
  border: 1px solid #fff;
}

.logout-btn:hover {
  background: black;
  border-color: red;
}

.login-btn  {
  border: 1px solid #00ac96;
}

.login-btn:hover {
  background: #00ac96;
  border-color: #fff;
}

a:hover {
  color: #fff !important;
}

a:hover > i.fa-sign-in-alt {
  color: #fff;
}

i.fa-sign-in-alt {
  color: #00ac96;
}

</style>
