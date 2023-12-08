<template>
  <headerVue></headerVue>

  <main class="main">
    <div class="row d-flex">
      <div class="col-md-3 mt-5">
        <div class="category">
          <ul>
            <li @click="showAll()" class="mb-4">tất cả</li>
            <li
              v-for="category in categories"
              :key="category._id"
              class="mb-4"
              @click="showProducts(category._id)"
            >
              <router-link class="mb-4" :to="'/products'">{{ category.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <h1 class="h1-name">Hiện danh sách sản phẩm</h1>
        <hr />
        <div class="">
          <input
            class="form-control search-name"
            type="text"
            v-model="searchProduct"
            placeholder="Nhập tên sản phẩm để tìm kiếm"
          />
        </div>

        <div class="row d-flex">
          <div v-for="product in filteredProducts" :key="product._id" class="product col-md-4">
            <div class="card product-card">
              <router-link :to="'/products/' + product._id">
                <img
                  v-for="image in product.images"
                  :key="image._id"
                  :src="'/public/img/products/' + image.name"
                  class="card-img-top"
                  alt=""
                />
              </router-link>

              <div class="card-body">
                <h5 class="card-title name-product">{{ product.name }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footerVue></footerVue>
</template>
<script>
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'
import axios from 'axios'
export default {
  data() {
    return {
      categories: [],
      products: [],
      searchProduct: ''
    }
  },

  created() {
    this.showAll()
    this.showCate()
  },
  computed: {
    filteredProducts() {
      const search = this.searchProduct.toLowerCase().trim()
      if (!search) {
        return this.products
      }
      return this.products.filter((product) => {
        return product.name.toLowerCase().includes(search)
      })
    }
  },

  methods: {
    async showAll() {
      try {
        await axios.get('http://localhost:3000/product/home').then((response) => {
          this.products = response.data.filter((product) => product.status === true)
        })
        if (this.products.length > 0) {
          const response = await axios.get('http://localhost:3000/product/img')
          const anh = response.data
          this.products.forEach((product) => {
            const hinh = anh.filter((imgs) => imgs.nameProduct === product._id)
            product.images = hinh
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async showCate() {
      axios.get('http://localhost:3000/category/listCate').then((response) => {
        this.categories = response.data
        // console.log(this.categories);
      })
    },

    async showProducts(categoryId) {
      //   console.log('category', categoryId)
      const productAll = {}
      try {
        await axios.get('http://localhost:3000/product/home').then((response) => {
          response.data.map((product) => {
            // console.log('product category ', product.category)
            if (product.category === categoryId && product.status === true) {
              productAll[product._id] = product
            }
            console.log('productAll', productAll)
            this.products = Object.values(productAll)
          })
        })

        const response = await axios.get('http://localhost:3000/product/img')
        const images = response.data
        console.log(' img.nameProduct', response.data)
        this.products.forEach((product) => {
          const img = images.filter((img) => img.nameProduct === product._id)
          product.images = img
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    headerVue,
    footerVue
  }
}
</script>

<style>
.main {
  background-color: #ffffff;
  border-top: 15px solid black;
}
.h1-name {
  text-align: center;
  color: rgb(0, 0, 0);
}
.search-name {
  width: 50%;
  margin: 10px 0;
  border: 5px solid black;

}
.category ul {
  text-align: center;
}

 

.category li:hover {
  cursor: pointer;
  margin: 2px;
}

.category li {
  font-family: 'Courier New', Courier, monospace;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  text-align: center;
  border-right: 2px solid black;
  border-left: 2px solid black;
  background-color: rgb(122, 115, 99);
  padding: 15px;
  border-radius: 25px;
  font-size: 20px;

}
.category li a {
  color: rgb(255, 255, 255);

  text-transform: uppercase;

  text-decoration: none;
}
.name-product {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}
.product img {
  /* margin-left: 100px; */
  width:100%;
  height: 100%;
}
.product {
  margin-bottom: 30px;
}

.product-card:hover {
  padding: 5px;
  box-shadow: 0px 0px 50px rgba(183, 181, 181, 0.5);
  background-color: rgb(0, 0, 0);
  color: #ffffff;
  opacity: 0.8.5;
}
</style>
