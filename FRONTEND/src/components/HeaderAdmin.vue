<template>
  <main>
    <div class="page-admin">
      <p class="text-page">Cafe-Home Admin</p>
    </div>

    <div class="row d-flex">
      <div class="col-sm-4 d-flex inf-admin" style="text-align: start">
        <button
          class="btn btn-admin-home"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <i class="ti-home router-home"></i>
        </button>

        <div
          class="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Cafe-Home</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div class="list-cate-admin">
              <ul class="list-group">
                <li class="list-group-item">
                  <router-link to="/admin" class="">Home</router-link>
                </li>
                <li class="list-group-item">
                  <router-link to="/caterogy" class="">Thêm loại sản Phẩm</router-link>
                </li>
                <li class="list-group-item">
                  <router-link to="/listuser" class="">Quản Lý User</router-link>
                </li>
                <li class="list-group-item">
                  <router-link to="/listCate" class="">Quản Lý Sản Phẩm</router-link>
                </li>
                <li class="list-group-item">
                  <router-link to="/listOrder" class="">Quản Lý Đơn Hàng</router-link>
                </li>
                <li class="list-group-item">
                  <router-link to="/registerAdmin" class="">Thêm Admin</router-link>
                </li>
                <li class="list-group-item">
                  <router-link to="/adminConnect" class="">Đánh Giá Của Khách</router-link>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-4  d-flex inf-admin" style="justify-content: center; padding-top: 10px;" >
        <p class="mx-3" v-if="loginOn"><i class="ti-user"></i> {{ name }}</p>
        <p v-if="loginOn"><i class="fa fa-mobile"></i> {{ phone }}</p>
      </div>
      <div class="col-sm-4 logout-admin" style="text-align: end; padding-top: 10px;">
        <router-link  v-if="loginOn" @click="logoutUser" to="/"
          ><i class="fa fa-sign-out"  ></i
        ></router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'headerAdminVue',
  data() {
    return {
      loginOn: false,
      name: '',
      phone: ''
    }
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (sessionStorage.getItem('phone')) {
      this.loginOn = true
      this.name = sessionStorage.getItem('name')
      this.phone = sessionStorage.getItem('phone')
    }
  },
  methods: {
    logoutUser() {
      // Xóa thông tin đăng nhập khỏi session
      sessionStorage.removeItem('phone')
      sessionStorage.removeItem('name')
      // Cập nhật lại trạng thái đăng nhập
      this.loginOn = false
      this.name = ''
    }
  }
}
</script>
<style>
.page-admin {
  background-color: rgba(97, 185, 178, 0.853);
}
.btn-admin-home i{
  font-size: 25px;
  font-weight: 800;

}
.list-cate-admin{
  text-align: center;
}
.list-cate-admin a:hover{
  color: rgb(108, 189, 157);
}
.list-cate-admin a{
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 19px;
  font-weight: 600;
}
.text-page {
  font-size: 50px;
  font-weight: 800;
  font-family: 'Courier New', Courier, monospace;
  text-transform: uppercase;
  text-align: center;
}
.logout-admin a i {
  color: black;
  font-size: 30px;
}
.inf-admin a i {
  color: black;
  font-size: 30px;
}
</style>
