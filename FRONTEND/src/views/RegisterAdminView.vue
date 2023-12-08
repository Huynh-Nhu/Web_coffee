<template>
  <headerAdminVue></headerAdminVue>

  <h1 class="text-name-admin">Đăng ký tài khoản admin</h1>
  <div class="container mt-5 color-main">
    <div class="row form-register-add">
      <div class="col-md-8 offset-md-2">
        <div class="row d-flex">
          <div class="col-sm-9">
            <form @submit.prevent="registerAdmin" class="form-add-cl">
              <h1>Đăng Ký Nhân Viên</h1>
              <div>
                <label for="name">Họ và tên:</label>
                <input  class="form-control"  type="text" id="name" v-model="formData.name" required />
              </div>
              <div>
                <label for="phone">Số điện thoại:</label>
                <input  class="form-control" type="text" id="phone" v-model="formData.phone" required />
              </div>
              <div>
                <label for="position">Vị trí:</label>
                <input  class="form-control" type="text" id="position" v-model="formData.position" required />
              </div>
              <div>
                <label for="address">Địa chỉ:</label>
                <input  class="form-control" type="text" id="address" v-model="formData.address" required />
              </div>
              <div>
                <label for="password">Mật khẩu:</label>
                <input  class="form-control" type="password" id="password" v-model="formData.password" required />
              </div>
              <div class="btn-add-on text-center mt-3">
    
                <button class="btn btn-reg-add" type="submit">Đăng ký</button>
              </div>
            </form>

          </div>
          <div class="col-sm-3">
            <img class="mt-5" src="public/img/png/img_waierss.png" alt="">
          </div>
        </div>
  
      </div>

    </div>
  </div>
</template>

<script>
import headerAdminVue from '../components/HeaderAdmin.vue'
import axios from 'axios'

export default {
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        position: '',
        address: '',
        password: ''
      }
    }
  },
  components: {
    headerAdminVue
  },
  methods: {
    registerAdmin() {
      axios
        .post('http://localhost:3000/admin/create', this.formData)
        .then((response) => {
          // Xử lý kết quả đăng ký thành công
          console.log(response.data) // In ra thông báo thành công hoặc thông tin người dùng đã đăng ký
        })
        .catch((error) => {
          // Xử lý lỗi đăng ký
          console.log(error)
        })
    }
  }
}
</script>

<style>

.form-register-add{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.689);
  padding: 100px 0;
  border-radius: 25px;
  background-color: rgba(95, 158, 160, 0.692);
  border: 5px solid black;

}
.form-register-add label {
  font-size: 20px;
  margin:10px 0px;
}
.btn-reg-add{
  background-color: rgb(0, 0, 0);
  color: white;
  font-size: 17px;

}
.btn-reg-add:hover{
  background-color:pink
}

</style>