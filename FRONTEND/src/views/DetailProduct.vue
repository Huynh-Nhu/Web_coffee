<template>
  <headerVue></headerVue>
  <main class="main-product-user">
    <div class="container my-5">
      <div class="row d-flex">
        <div class="col-md-6 col-sm-6">
          <img class="img-product" :src="'/img/products/' + product.imageData" alt="" />
        </div>
        <div class="col-md-6 col-sm-6 info-product">
          <h1 class="name-product-detail">{{ product.name }}</h1>

          <p style="text-align: left">*Vui lòng chọn size để</p>

          <div class="row">
            <div class="col-sm-5 col-md-5 col-lg-5 col-xxl-5">
              <button class="btn btn-size" @click="selectSize('S')">S</button>
            </div>
            <div class="col-sm-1 col-md-1"></div>
            <div class="col-sm-5 col-md-5 col-lg-5 col-xxl-5">
              <button class="btn btn-size" @click="selectSize('M')">M</button>
            </div>
          </div>

          <div class="quantity-full">
            <div v-if="selectedSize === 'S' || selectedSize === 'M'">
              <div class="quantity-container" v-if="selectedSize === 'S'">
                <button class="quantity-button" @click="decreaseQuantity('S')">-</button>
                <div class="quantity">{{ quantityS }}</div>
                <button class="quantity-button" @click="increaseQuantity('S')">+</button>
              </div>
              <div class="quantity-container" v-if="selectedSize === 'M'">
                <button class="quantity-button" @click="decreaseQuantity('M')">-</button>
                <div class="quantity">{{ quantityM }}</div>
                <button class="quantity-button" @click="increaseQuantity('M')">+</button>
              </div>
            </div>

            <p v-if="selectedSize === 'S'">Tổng giá tiền (S): {{ totalPriceS }}</p>
            <p v-if="selectedSize === 'M'">Tổng giá tiền (M): {{ totalPriceM }}</p>
          </div>
          <textarea
            class="form-control mt-3"
            v-model="customerNote"
            placeholder="Ghi chú cho khách hàng"
          ></textarea>

          <button class="btn btn-addP" @click="addCart(product._id)">Thêm Sản Phẩm</button>

          <div v-if="showMessage" class="alert-1" role="alert">
            {{ message }}
          </div>
          <hr />
          <p class="mt-5">Thông Tin: {{ product.details }}</p>
        </div>
      </div>

      <hr class="mt-5">
      <div class="related-products">
        <h3 class="mb-5">Sản phẩm liên quan:</h3>

        <div class="row row-cols-1 row-cols-md-3 g-4 text-center">
          <div
            class="col related-product"
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct._id"
          >
            <div class="card h-100">
              <router-link
                :to="'/products/' + relatedProduct._id"
                @click="GetOneProduct(relatedProduct._id)"
              >
                <img
                  v-for="image in relatedProduct.images"
                  :key="image._id"
                  :src="'/img/products/' + image.name"
                  alt=""
                  style="width: 200px"
                />
              </router-link>
              <div class="card-body">
                <h5 class="card-title">{{ relatedProduct.name }}</h5>
                <p class="card-text">
                  {{ relatedProduct.details }}
                </p>
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
import { useCartStore } from '../stores/counter'
import { useRouter } from 'vue-router'
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'

import axios from 'axios'
export default {
  data() {
    return {
      product: {},
      quantityS: 1,
      quantityM: 1,
      selectedSize: null,
      priceS: '',
      priceM: '',
      customerNote: '',
      message: '',
      showMessage: false, // Thêm dòng này để khởi tạo giá trị ban đầu cho showMessage
      relatedProducts: []
    }
  },
  created() {
    const productId = this.$route.params.id
    this.GetOneProduct(productId)
  },
  methods: {
    async GetOneProduct(productId) {
      try {
        const response = await axios.get(`http://localhost:3000/product/${productId}`)
        this.product = response.data
        this.priceS = this.product.sizeS
        this.priceM = this.product.sizeM
        console.log(this.product.category)

        // LẤY RA SAN PHÂM LIEN QUAN

        const relate = await axios.get('http://localhost:3000/product/home')
        const relatedProduct = relate.data
        const filterRelateProduct = relatedProduct.filter(
          (product) =>
            product.category === this.product.category &&
            product._id !== productId &&
            product.status == true
        )
        console.log(filterRelateProduct)
        this.relatedProducts = Object.values(filterRelateProduct)

        const res = await axios.get('http://localhost:3000/product/img')
        const img = res.data
        this.relatedProducts.forEach((product) => {
          const image = img.filter((img) => img.nameProduct === product._id)
          product.images = image
          console.log(image)
        })
        window.scrollTo(0, 0)
      } catch (error) {
        console.error(error)
      }
    },
    selectSize(size) {
      this.selectedSize = size
    },
    increaseQuantity(size) {
      if (size === 'S') {
        this.quantityS++
      } else if (size === 'M') {
        this.quantityM++
      }
    },
    decreaseQuantity(size) {
      if (size === 'S' && this.quantityS > 1) {
        this.quantityS--
      } else if (size === 'M' && this.quantityM > 1) {
        this.quantityM--
      }
    },
    async addCart(productId) {
      const cartStore = useCartStore()
      console.log(sessionStorage.getItem('id'))
      if (this.loginOn) {
        if (this.selectedSize) {
          const productAddCart = {
            idUser: sessionStorage.getItem('id'),
            idProduct: productId,
            name: this.product.name,
            image: this.product.imageData,
            size: this.selectedSize,
            note: this.customerNote,
            priceSize: this.selectedSize === 'S' ? this.priceS : this.priceM,

            quantity: this.selectedSize === 'S' ? this.quantityS : this.quantityM,
            price: this.selectedSize === 'S' ? this.totalPriceS : this.totalPriceM
          }
          await axios.post('http://localhost:3000/cart/add', productAddCart).then((response) => {
            console.log(response.data)
            this.message = 'Thêm Sản Phẩm Thành Công'
            this.showMessage = true
            setTimeout(() => {
              this.showMessage = false
            }, 1000)
            cartStore.incrementCartQuantity()
          })
        } else {
          this.message = 'Vui Chọn Size Trước Khi Thêm '
          this.showMessage = true
          setTimeout(() => {
            this.showMessage = false
          }, 1000)
        }
      } else {
        // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
        this.$router.push('/login') // Điều hướng đến trang đăng nhập
      }
    }
  },
  components: {
    headerVue,
    footerVue
  },
  computed: {
    totalPriceS() {
      const total = this.quantityS * this.priceS
      return total.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    totalPriceM() {
      const total = this.quantityM * this.priceM
      return total.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    loginOn() {
      const phone = sessionStorage.getItem('phone')
      return phone
    }
  }
}
</script>

<style>
.main-product-user {
  border-top: 15px solid black;
}
.name-product-detail {
  font-size: 50px;
  font-family: 'Times New Roman', Times, serif0;
  font-weight: 800;
  background-color: #000000;
  color: white;
  border-radius: 25px;
  border: 5px solid #96894a;
  margin-bottom: 25px;
}
.img-product {
  width: 100%;
  height: 100%;
  border-radius: 25px;
}

.quantity-container {
  display: flex;
  align-items: center;
  margin-top: 25px;
  justify-content: center;
}
.info-product {
  outline-style: dashed;
  outline-color: #96894a;

  border-radius: 25px;
  padding: 50px;
  text-align: center;
}
.quantity-full p {
  margin-top: 25px;
  font-size: 30px;
}

.quantity-button {
  border: none;
  background-color: rgb(36, 95, 74);
  color: aliceblue;
  padding: 5px 15px;
  cursor: pointer;
}
.quantity-button:hover {
  background-color: #7fe0db;
  color: black;
}

.quantity {
  margin: 0 px;
  padding: 0 15px;
  font-weight: bold;
}
.btn-size {
  background-color: #c4c89f;
  padding: 5px 50px;
}

.btn-size:hover {
  background-color: #0e4e49;
  color: aliceblue;
}
.btn-addP {
  background-color: #0e4e49;
  color: white;
  margin-top: 25px;
}
.btn-addP:hover {
  color: black;
  background-color: #01eadf;
}
.alert-1 {
  color: rgb(255, 255, 255);
  font-size: 15px;
  background-color: #1f9f9f;
  padding: 15px 0;
  margin-top: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.668);
}
</style>
