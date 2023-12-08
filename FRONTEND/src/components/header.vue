<template>
  <main class="header container-fluid">
    <div class="text-center container">
      <div class="row align-items-center">
        <div class="col-md-4 row router-header">
          <div class="row align-items-center">
            <div class="col-sm-3">
              <router-link to="/" class="">HOME</router-link>
            </div>
            <div class="col-sm-3">
              <router-link to="/products" class="">product</router-link>
            </div>
            <div class="col-sm-3">
              <router-link to="/about">ABOUT</router-link>
            </div>
            <div class="col-sm-3">
              <router-link to="/connect" class="">Connect</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 img-header">
          <router-link to="/" class="">
            <img class="" src="/img/logo/cafe_home.png" alt="logo" />
          </router-link>
        </div>
        <div class="col-md-4 row router-right">
          <div class="row align-items-center">
            <div class="col-2 menu">
              <button
                class="btn btn-cart-header"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <i class="fa fa-bars" aria-hidden="true"></i>
              </button>

              <div
                class="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div class="offcanvas-header">
                  <img
                    src="/img/logo/cafe_home.png"
                    width="100"
                    class="offcanvas-title"
                    id="offcanvasExampleLabel"
                  />

                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="offcanvas-body">
                  <div class="menu-router">
                    <ul class="list-group">
                      <li class="list-group-item">
                        <router-link to="/" class="">HOME</router-link>
                      </li>
                      <li class="list-group-item">
                        <router-link to="/products" class="">product</router-link>
                      </li>
                      <li class="list-group-item">
                        <router-link to="/about">ABOUT</router-link>
                      </li>
                      <li class="list-group-item">
                        <router-link to="/connect" class="">Connect</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-2">
              <button type="button" class="btn position-relative btn-cart-header p-0">
                <router-link to="/cart" class="" @click="goAdd">
                  <i class="fa fa-shopping-basket"></i>
                </router-link>
                <span class="position-absolute top translate-middle badge rounded-pill">
                  {{ getCartQuantity }}
                </span>
              </button>
            </div>
            <div class="col-7 btn-cart-header">
              <router-link v-if="!loginOn" to="/login" class="mx-5">Login</router-link>
              <router-link v-if="!loginOn" to="/register" class="">Register</router-link>

              <div v-if="loginOn" class="dropdown row d-flex align-items-center">
                <div class="col-3">
                  <button
                    class="btn btn-drop dropdown-toggle mx-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="ti-user"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <p
                      style="
                        text-transform: uppercase;
                        
                        padding: 0 10px;
                        color: rgb(0, 0, 0);
                        font-size: 15px;
                      "
                      v-if="loginOn"
                    >
                    <span style="outline-style: dashed; padding: 5px">
                      {{ name }}

                    </span>
                    </p>

                    <router-link to="/orderUser" class="dropdown-item">
                      Hóa Đơn
                      <i class="ti-receipt"></i>
                    </router-link>

                    <router-link class="dropdown-item" v-if="loginOn" @click="logoutUser" to="/"
                      >Logout</router-link
                    >
                  </ul>
                </div>

                <div class="col-9"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useCartStore } from '../stores/counter'
// import { ref, watch } from 'vue'
export default {
  name: 'headerVue',
  data() {
    return {
      loginOn: false,
      name: ''
      // cartQuantity: 0
    }
  },
  computed: {
    getCartQuantity() {
      const cartStore = useCartStore()
      return cartStore.cartQuantity
    }
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (sessionStorage.getItem('phone')) {
      this.loginOn = true
      this.name = sessionStorage.getItem('name')
    }

    // this.fetchCart();
  },
  methods: {
    logoutUser() {
      // Xóa thông tin đăng nhập khỏi session
      sessionStorage.removeItem('phone')
      sessionStorage.removeItem('name')
      // Cập nhật lại trạng thái đăng nhập
      this.loginOn = false
      this.name = ''

      const cartStore = useCartStore()
      cartStore.cartQuantity = 0
    },
    goAdd() {
      const cartStore = useCartStore()
      cartStore.cartQuantity = 0
    }
  }
}
</script>

<style>
.header {
  background-color: rgb(187, 153, 94);
  border-top: 15px solid black;
  padding: 15px 0;
}
.router-header {
  padding: 20px 5px 20px 5px;
  border-radius: 50px 0 0 50px;
}
.router-header a {
  color: rgb(255, 248, 248);
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px;
}
.router-header a:hover {
  background-color: black;
  border-radius: 10px 10px 0 0;
}
.img-header {
  display: contents;
  padding: 0;
}
.img-header img {
  border-radius: 200px;
  width: 50%;
}
.router-right {
  display: contents;
}
.btn-cart-header a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  text-transform: uppercase;
  padding: 0px;
  font-size: 18px;
}
.btn-cart-header a i {
  color: rgb(0, 0, 0);
  text-decoration: none;
  text-transform: uppercase;
  padding: 0px;
  font-size: 25px;
}
.menu {
  display: none;
}

.menu-router a {
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0px;
}
.menu-router a:hover {
  color: rgb(113, 221, 203);
}
.dropdown-menu a {
  color: black;
  padding: 2px 10px;
}
.btn-drop {
  background-color: aliceblue;
}

@media screen and (max-width: 1402px) {
  .img-header img {
    display: none;
  }
  .router-right {
    display: block;
  }
}

@media screen and (max-width: 598px) {
  .router-header {
    display: none;
  }

  .router-right {
    padding: 25px 0;
    align-items: center;
    margin-left: 60px;
  }
  .menu {
    display: block;
  }
}
</style>
