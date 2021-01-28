<template>
    <div class='container'>
        <div class='row content'>
            <div class='container'>
                <div id="nav">
                  <router-link to="/home/register"> Register </router-link> |
                  <router-link to="/home/login"> Login </router-link>
                </div>
            </div>
            <div class='col-md-6 mb-3'>
                <img src='../assets/images/signin-image.jpg' class='img-fluid' alt='image'>
            </div>
            <div class="col-md-6">
                <h3 class='signin-text mb-3'> Login </h3>
                <form @submit.prevent='login'>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Email</label>
                        <input type="email" class='form-control' id="formGroupExampleInput" placeholder="Type in your email..." v-model='email'>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Password</label>
                        <input type="password" class='form-control' id="formGroupExampleInput2" placeholder="Type in your password..." v-model='password'>
                    </div>
                    <button class='btn btn-class'>Login</button>
                </form>
        </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  watch: {
    errors: function (val, oldVal) {
      if (val.length > 0) {
        this.$swal.fire({
          icon: 'error',
          title: 'Please try again',
          text: this.errors[0],
          footer: '<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400" target="_blank">400 Bad request</a>'
        })
      }
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    }
  },
  computed: mapState(['errors'])
}
</script>

<style scoped>

</style>
