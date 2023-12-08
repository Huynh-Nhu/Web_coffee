<template>
  <headerVue></headerVue>

  <h1 class="cart">Cart</h1>

  <main class="cart-main container-fluid row">
    <div class="col-4">
      <div class="cart-full">
        <div class="cart-detail">
          <h3 class="cart-name" style="text-align: center">Thông tin</h3>
          <p class="cart-name">Tên khách hàng:</p>

          <p class="cart-user">{{ nameUser }}</p>
          <p class="cart-name">Số điện thoại khách hàng:</p>

          <p class="cart-user">{{ phoneNumber }}</p>
          <p class="cart-name">Địa chỉ khách hàng</p>
          <textarea
            v-model="localUser"
            id=""
            cols="12"
            rows="3"
            placeholder="Nhâp địa chỉ "
            @input="validateAddress"
            class="form-control mb-5"
          ></textarea>
          <div class="btn-order">
            <button class="btn btn-order-children" @click="placeOrder">Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8">
      <div class="table-full">
        <div class="cart-none">
          <div class="row">
            <div v-if="length > 0" class="card" style="width: fit-content; text-align: center">
              <div class="card-body">
                <h5 class="card-title">Thông tin sản phẩm</h5>
                <div v-for="cart in carts" :key="cart._id" class="card">
                  <div class="card-body row cart-inf">
                    <div class="col-sm-2">
                      <button class="btn" @click="removeCart(cart)">
                        <i class="ti-close"></i>
                      </button>
                    </div>
                    <div class="col-sm-3">
                      <h6 class="card-subtitle mb-2 text-muted">{{ cart.name }}</h6>
                      <img :src="'/public/img/products/' + cart.image" alt="" style="width: 100%" />
                    </div>
                    <div class="col-sm-7">
                      <div class="row d-flex mx-1">
                        <p class="card-text">Size: {{ cart.size }}</p>
                        <p class="card-text mx-1">Số lượng đặt: {{ cart.quantity }}</p>
                        <div class="mx-1">
                          <button class="btn btn-quantity" @click="decrementQuantity(cart)">
                            -
                          </button>
                          {{ cart.quantity }}
                          <button class="btn btn-quantity" @click="incrementQuantity(cart)">
                            +
                          </button>
                        </div>
                        <p class="card-text mx-1">Giá Gốc: {{ cart.priceSize }}</p>
                        <p class="card-text mx-1">Thành Tiền: {{ cartPriceOne(cart) }}</p>
                        <p class="card-text mx-1">Ghi chú: {{ cart.note }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Tổng đơn hàng:</h6>
                    <p class="card-text">{{ cartPriceAll() }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="">
              <img src="https://www.adasglobal.com/img/empty-cart.png" style="width: 50% ;" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="modal-success" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body pb-5">
            <div class="text-center">
              <img src="/img/png/success.png" alt="" style="width: 30%;" />
              <h3>Bạn đã đặt hàng thành công</h3>
            </div>
            <div class="btn-success">
              <router-link @click="hideModal()" to="/products" class=""
                >Tiếp tục mua sản phẩm</router-link
              >

              <router-link @click="hideModal()" to="/orderUser"> Đi đến xem đơn hàng </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footerVue></footerVue>
</template>

<script>
import moment from 'moment'
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'

import axios from 'axios'
export default {
  data() {
    return {
      carts: [],
      nameUser: '',
      phoneNumber: '',
      localUser: '',
      isAddLocal: false,
      length: 0
    }
  },
  components: {
    headerVue,
    footerVue
  },
  mounted() {
    this.nameUser = sessionStorage.getItem('name')
    this.phoneNumber = sessionStorage.getItem('phone')
  },
  created() {
    this.showCart()
  },
  methods: {
    async showCart() {
      const idUser = sessionStorage.getItem('id')
      const cartUser = []
      axios.get('http://localhost:3000/cart/show').then((response) => {
        response.data.forEach((carts) => {
          if (carts.idUser === idUser && carts.status === true) {
            cartUser.push(carts)
          }
          this.carts = cartUser

          this.length = this.carts.length
          console.log(this.length)
        })
      })
    },
    validateAddress() {
      if (this.localUser.trim() !== '') {
        this.isAddLocal = true
      } else {
        this.isAddLocal = false
      }
    },
    async placeOrder() {
      if (this.length == 0) {
        alert('Vui lòng chọn sản phẩm để có thể đặt hàng')

        return
      } else {
        if (!this.isAddLocal) {
          alert('Vui lòng nhập địa chỉ trước khi đặt hàng')
        } else {
          const idUser = sessionStorage.getItem('id')
          const dayOrder = moment().format('DD-MM-YYYY HH:mm:ss')

          const status = 'Pending'
          const orderDetails = this.carts.map((cart) => ({
            idProduct: cart.idProduct,
            quantityProduct: cart.quantity,
            priceAll: (cart.priceSize * cart.quantity).toLocaleString('vi-VN', {
              minimumFractionDigits: 3
            }),
            localUser: this.localUser,
            note: cart.note
          }))
          const orderData = { idUser, dayOrder, status, orderDetails }
          console.log('orderData', orderData)
          try {
            await axios.post('http://localhost:3000/order/', orderData).then((response) => {
              console.log(this.carts)

              $('#modal-success').modal('show')
            })
            this.clear()
            this.carts = []
            this.localUser = ''
            this.length = this.carts.length
          } catch (err) {
            console.log(err)
          }
        }
      }
    },
    incrementQuantity(cart) {
      cart.quantity++
    },
    decrementQuantity(cart) {
      if (cart.quantity != 0) {
        cart.quantity--
      }
    },
    cartPriceOne(cart) {
      const money = cart.priceSize * cart.quantity
      return money.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    cartPriceAll() {
      let total = 0
      this.carts.forEach((cart) => {
        total += cart.priceSize * cart.quantity
      })
      return total.toLocaleString('vi-VN', { minimumFractionDigits: 3 })
    },
    async removeCart(cart) {
      // const cartStore = useCartStore();

      console.log('Cart', cart._id)
      try {
        axios.delete(`http://localhost:3000/cart/show/${cart._id}`)
        const index = this.carts.findIndex((item) => item._id === cart._id) // tim vi tri của mảng cần xóa trong code dựa theo id
        if (index !== -1) {
          this.carts.splice(index, 1) // Xóa sản phẩm khỏi mảng carts
          // cartStore. decrementCartQuantity();
        }
        this.length = this.carts.length
      } catch (err) {
        console.log(err)
      }
    },
    async clear() {
      const userId = sessionStorage.getItem('id')
      const cartId = this.carts.map((cart) => cart._id)
      console.log(cartId)
      axios.delete(`http://localhost:3000/cart/${userId}`).then((response) => {})
    },
    hideModal() {
      $('#modal-success').modal('hide')
    }
  }
}
</script>

<style>
.cart {
  text-align: center;
  background-color: black;
  color: rgb(255, 255, 255);
}
.cart-full {
  border: 2px solid white;
  padding: 30px;
  border-radius: 25px;
  margin: 25px;
  background: url('/img/png/cafe.jpg') top center / cover no-repeat;
}
.cart-detail {
  background-color: #fff9f9;
  opacity: 0.9;
  padding: 25px;
  border-radius: 25px;
}
.cart-name {
  color: rgb(0, 0, 0);
}

.cart-user {
  font-size: 15px;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 25px;
  text-align: center;
  padding: 10px 0;
  color: rgb(0, 0, 0);
}

.table-cart {
  padding: 0;
  margin-top: 25px;
}

.btn-quantity {
  border-radius: 100%;
  margin: 0 10px;
}
.btn-quantity:hover {
  background-color: rgb(99, 152, 111);
}
.table-full {
  /* width: fit-content; */
  text-align: center;
}

.cart-none {
  margin: 0;
}
.btn-order {
  text-align: center;
}
.btn-order-children {
  background-color: #000000;
  color: rgb(255, 255, 255);
  border: #fff9f9 solid 2px;
}
.btn-order-children:hover {
  color: #ffffff;
  background-color: #528371;
  border: #fff9f9 solid 2px;
}
.btn-success {
  text-align: center;
  margin-top: 25px;
}
.btn-success a {
  font-size: 18px;
  color: black;
  text-decoration: none;
  margin-right: 25px;
  outline-style: dashed;
  padding: 5px;
  border-radius: 25px;
}
.btn-success a:hover {
  background-color: #7ba696;
  color: rgb(29, 54, 7);
}
</style>
