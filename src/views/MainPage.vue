<template>
  <div class='container-fluid'>
    <Navbar />
      <h1>Welcome to Lajada!</h1>
      <i><strong>L</strong>oe m<strong>a</strong>u apa a<strong>ja</strong> a<strong>da</strong></i>
      <div class='row'>
        <div class='col-md-6'>
          <div class='container'>
            <p class='mr-4'> <b>Filter by category:</b> </p>
            <select id="inputState" class="mb-4" v-model='category'>
              <option selected>Choose a category...</option>
              <option value='all'>All categories</option>
              <option v-for='(category, idx) in categories' :key='idx' :value='category'>{{ category }}</option>
            </select>
          </div>
        </div>
        <div class='col-md-6'>
          <div class="container">
              <br/>
              <div class="row justify-content-center">
                                  <div class="col-12 col-md-10 col-lg-8">
                                      <div class="card card-sm">
                                          <div class="card-body row no-gutters align-items-center">
                                              <div class="col-auto">
                                                  <i class="fas fa-search h4 text-body"></i>
                                              </div>
                                              <!--end of col-->
                                              <div class="col">
                                                  <input class="form-control form-control-lg form-control-borderless" type="text" placeholder="Search product by name" v-model='search'>
                                              </div>
                                              <!--end of col-->
                                          </div>
                                      </div>
                                  </div>
                                  <!--end of col-->
                              </div>
          </div>
        </div>
      </div>
      <div class='d-flex flex-row mt-4 flex-wrap justify-content-center'>
        <ContentCard v-for='product in filteredProducts' :key='product.id' :product='product'/>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import ContentCard from '../components/ContentCard'
export default {
  name: 'MainPage',
  data () {
    return {
      category: '',
      search: ''
    }
  },
  watch: {
    category (newVal) {
      this.$store.commit('changeCategory', newVal)
    }
  },
  components: {
    Navbar,
    ContentCard
  },
  computed: {
    products () {
      return this.$store.getters.filterByCategory
    },
    categories () {
      return this.$store.state.categories
    },
    filteredProducts () {
      return this.products.filter((product) => {
        return product.name.match(this.search)
      })
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style scoped>
</style>
